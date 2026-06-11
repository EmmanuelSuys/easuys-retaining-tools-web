import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

import {
  ANALYSIS_ROUTE,
  API_BASE_URL,
  CONTACT_ENDPOINT,
  SAMPLE_CONTACT_STATE,
  SAMPLE_PROJECT,
  SAMPLE_RESULT,
  STEEL_SHEET_PILE_LIBRARY,
  applyQuickEditorStructureAction,
  applyQuickEditorPatch,
  resolveAnalyzedProject,
  buildContactPanelHtml,
  buildResultDownloadText,
  buildResultFilename,
  buildReportPreviewHtml,
  buildReportFilename,
  buildQuickEditorHtml,
  TURNSTILE_SCRIPT_URL,
  buildDirectMailto,
  buildStudyRequestPayload,
  buildGeometryPreviewSvg,
  buildInputSnapshot,
  buildPhaseOptions,
  buildPlotPath,
  buildReportHtml,
  buildResultHtml,
  loadTurnstileScript,
  resetTurnstileLoaderForTests,
  runAnalysis,
  submitStudyRequest,
} from "../app.js";

test("frontend is configured for retaining domain and API", async () => {
  const cname = await readFile(new URL("../CNAME", import.meta.url), "utf8");
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");
  const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
  const deployWorkflow = await readFile(
    new URL("../.github/workflows/deploy-pages.yml", import.meta.url),
    "utf8"
  );

  assert.equal(cname.trim(), "retaining.easuys.com");
  assert.match(html, /EA Suys Retaining Tools/);
  assert.match(html, /data-project-input/);
  assert.match(html, /data-quick-editor/);
  assert.match(html, /data-run-analysis/);
  assert.match(html, /data-input-preview/);
  assert.match(html, /data-geometry-preview/);
  assert.match(html, /data-preview-phase/);
  assert.match(html, /data-phase-select/);
  assert.match(html, /data-result-shell/);
  assert.match(html, /data-report-shell/);
  assert.match(html, /data-contact-shell/);
  assert.match(html, /data-download-json/);
  assert.match(html, /data-download-html/);
  assert.match(css, /Space Grotesk/);
  assert.match(css, /\.workspace\s*{/);
  assert.match(css, /\.quick-editor-grid\s*{/);
  assert.match(css, /\.geometry-svg,/);
  assert.match(css, /\.plot-svg\s*{/);
  assert.equal(API_BASE_URL, "https://easuys-retaining-tools-api.workers.dev");
  assert.equal(ANALYSIS_ROUTE, "/calculate/retaining/flexible-wall-analysis");
  assert.equal(CONTACT_ENDPOINT, "/lead/study-request");
  assert.equal(TURNSTILE_SCRIPT_URL, "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit");
  assert.equal(packageJson.scripts.build, "tsc");
  assert.equal(packageJson.scripts["screenshots:render"], "npm run build && node scripts/render_screenshots.mjs");
  assert.match(deployWorkflow, /name: Deploy GitHub Pages/);
  assert.match(deployWorkflow, /branches:\s*\n\s*-\s*main/);
  assert.match(deployWorkflow, /actions\/configure-pages@v5/);
  assert.match(deployWorkflow, /actions\/upload-pages-artifact@v3/);
  assert.match(deployWorkflow, /actions\/deploy-pages@v4/);
  assert.match(deployWorkflow, /cp index\.html app\.js styles\.css CNAME README\.md page-dist\//);
  assert.match(deployWorkflow, /cp -R docs\/screenshots page-dist\/docs\/screenshots/);
});

test("runAnalysis posts the project payload to the retaining API and returns parsed JSON", async () => {
  let capturedUrl = "";
  let capturedOptions;
  const mockResponse = { ok: true, json: async () => ({ phases: [{ name: "ok" }] }) };
  const mockFetch = async (url, options) => {
    capturedUrl = String(url);
    capturedOptions = options;
    return mockResponse;
  };

  const body = await runAnalysis(SAMPLE_PROJECT, mockFetch);

  assert.equal(capturedUrl, `${API_BASE_URL}${ANALYSIS_ROUTE}`);
  assert.equal(capturedOptions.method, "POST");
  assert.equal(capturedOptions.headers["content-type"], "application/json");
  assert.deepEqual(JSON.parse(capturedOptions.body), SAMPLE_PROJECT);
  assert.deepEqual(body, { phases: [{ name: "ok" }] });
});

test("runAnalysis surfaces backend error messages", async () => {
  const mockFetch = async () => ({
    ok: false,
    json: async () => ({ error: "Synthetic analysis failure" }),
  });

  await assert.rejects(
    () => runAnalysis(SAMPLE_PROJECT, mockFetch),
    /Synthetic analysis failure/
  );
});

test("sample project exposes a dedicated retaining payload", () => {
  assert.equal(SAMPLE_PROJECT.wall_type, "steel_sheet_pile");
  assert.equal(SAMPLE_PROJECT.design_mode, "classic");
  assert.equal(SAMPLE_PROJECT.phases.length, 3);
  assert.equal(SAMPLE_PROJECT.supports[0].id, "A1");
  assert.equal(SAMPLE_PROJECT.wall_geometry.inclination_degrees, 4);
  assert.equal(SAMPLE_PROJECT.phases[1].vertical_line_load_kN_per_m, 35);
  assert.equal(SAMPLE_PROJECT.supports[0].inclination_degrees, 15);
  assert.equal(SAMPLE_PROJECT.wall_geometry.segments[0].steel_section.library_section_id, "AZ_18");
  assert.equal(STEEL_SHEET_PILE_LIBRARY.AZ_18.label, "AZ 18");

  const snapshot = buildInputSnapshot(SAMPLE_PROJECT, 1);
  assert.equal(snapshot.length, 7);
  assert.match(snapshot[0].text, /embedment/);
  assert.match(snapshot[0].text, /from vertical/);
  assert.match(snapshot[0].text, /AZ 18/);
  assert.match(snapshot[0].text, /EI 52000 kNm2\/m/);
  assert.match(snapshot[1].text, /target element length 0.50 m/);
  assert.match(snapshot[2].text, /Excavate left side to -4.0 m/);
  assert.match(snapshot[2].text, /surface L\/R 0.0 \/ 0.0 m/);
  assert.match(snapshot[2].text, /excavation L\/R -4.0 \/ 0.0 m/);
  assert.match(snapshot[3].text, /L1: φ 30.0°/);
  assert.match(snapshot[3].text, /R1: φ 33.0°/);
  assert.match(snapshot[5].text, /Fixed toe at -9.0 m/);
  assert.match(snapshot[6].text, /second-order option/);
  assert.match(buildGeometryPreviewSvg(SAMPLE_PROJECT, 1), /Retaining wall geometry preview/);
  assert.match(buildGeometryPreviewSvg(SAMPLE_PROJECT, 1), /Vertical wall load 35.0 kN\/m/);
  assert.match(buildGeometryPreviewSvg(SAMPLE_PROJECT, 1), /Surface L\/R 0.0 \/ 0.0 m/);
  assert.match(buildQuickEditorHtml(SAMPLE_PROJECT, 1), /Steel section/);
  assert.match(buildQuickEditorHtml(SAMPLE_PROJECT, 1), /Wall segment/);
  assert.match(buildQuickEditorHtml(SAMPLE_PROJECT, 1), /Split segment/);
  assert.match(buildQuickEditorHtml(SAMPLE_PROJECT, 1), /Left soil layer/);
  assert.match(buildQuickEditorHtml(SAMPLE_PROJECT, 1), /Split left layer/);
  assert.match(buildQuickEditorHtml(SAMPLE_PROJECT, 1), /Right soil layer/);
  assert.match(buildQuickEditorHtml(SAMPLE_PROJECT, 1), /Remove right layer/);
  assert.match(buildQuickEditorHtml(SAMPLE_PROJECT, 1), /Support item/);
  assert.match(buildQuickEditorHtml(SAMPLE_PROJECT, 1), /Add support/);
  assert.match(buildQuickEditorHtml(SAMPLE_PROJECT, 1), /Phase name/);
  assert.match(buildQuickEditorHtml(SAMPLE_PROJECT, 1), /Duplicate phase/);
  assert.match(buildQuickEditorHtml(SAMPLE_PROJECT, 1), /Remove phase/);
  assert.match(buildQuickEditorHtml(SAMPLE_PROJECT, 1), /Toe control/);
  assert.match(buildQuickEditorHtml(SAMPLE_PROJECT, 1), /Search start toe/);
  assert.match(buildQuickEditorHtml(SAMPLE_PROJECT, 1), /Target element length/);
  assert.match(buildQuickEditorHtml(SAMPLE_PROJECT, 1), /Segment label/);
  assert.match(buildQuickEditorHtml(SAMPLE_PROJECT, 1), /Segment top/);
  assert.match(buildQuickEditorHtml(SAMPLE_PROJECT, 1), /Segment EI/);
  assert.match(buildQuickEditorHtml(SAMPLE_PROJECT, 1), /Cracking moment/);
  assert.match(buildQuickEditorHtml(SAMPLE_PROJECT, 1), /Surface left/);
  assert.match(buildQuickEditorHtml(SAMPLE_PROJECT, 1), /Excavation left/);
  assert.match(buildQuickEditorHtml(SAMPLE_PROJECT, 1), /Groundwater right/);
  assert.match(buildQuickEditorHtml(SAMPLE_PROJECT, 1), /Left γ dry/);
  assert.match(buildQuickEditorHtml(SAMPLE_PROJECT, 1), /Right K0 \/ Ka \/ Kp/);
  assert.match(buildQuickEditorHtml(SAMPLE_PROJECT, 1), /Left bedding model/);
  assert.match(buildQuickEditorHtml(SAMPLE_PROJECT, 1), /Right tri-linear factors/);
  assert.match(buildQuickEditorHtml(SAMPLE_PROJECT, 1), /Support id/);
  assert.match(buildQuickEditorHtml(SAMPLE_PROJECT, 1), /Support type/);
  assert.match(buildQuickEditorHtml(SAMPLE_PROJECT, 1), /Underwater concrete block/);
  assert.match(buildQuickEditorHtml(SAMPLE_PROJECT, 1), /Support active from phase/);
  assert.match(buildQuickEditorHtml(SAMPLE_PROJECT, 1), /Point load/);
  assert.match(buildQuickEditorHtml(SAMPLE_PROJECT, 1), /Manual \/ custom/);
  assert.match(buildQuickEditorHtml(SAMPLE_PROJECT, 1), /Manual section name/);
  assert.match(buildQuickEditorHtml(SAMPLE_PROJECT, 1), /Manual Wpl/);
  assert.match(buildQuickEditorHtml(SAMPLE_PROJECT, 1), /Gamma M0/);
});

test("quick editor shows design-mode gamma M0 defaults when manual steel gamma is omitted", () => {
  const classicProject = structuredClone(SAMPLE_PROJECT);
  delete classicProject.wall_geometry.segments[0].steel_section.gamma_m0;
  const ec7Project = structuredClone(classicProject);
  ec7Project.design_mode = "ec7";

  assert.match(
    buildQuickEditorHtml(classicProject, 1),
    /data-qe-gamma-m0[^>]*value="1"/,
  );
  assert.match(
    buildQuickEditorHtml(ec7Project, 1),
    /data-qe-gamma-m0[^>]*value="1\.1"/,
  );
});

test("result helpers create options, plots and html fragments", () => {
  assert.equal(SAMPLE_RESULT.phases.length, 3);
  assert.equal(SAMPLE_RESULT.phases[0].converged, true);
  assert.equal(SAMPLE_RESULT.phases[2].iterations, 5);
  assert.equal(SAMPLE_RESULT.visualization.phases[2].phase_index, 2);
  assert.equal(SAMPLE_RESULT.visualization.phases[2].converged, true);
  assert.equal(SAMPLE_RESULT.visualization.phases[2].iterations, 5);
  assert.deepEqual(
    SAMPLE_RESULT.visualization.phases[2].rotation_mrad,
    SAMPLE_RESULT.phases[2].sampled_results.map((item) => item.rotation_mrad)
  );
  assert.deepEqual(
    SAMPLE_RESULT.visualization.phases[2].left_branch,
    SAMPLE_RESULT.phases[2].sampled_results.map((item) => item.left_branch ?? item.branch_state.split("/")[0])
  );
  assert.deepEqual(
    SAMPLE_RESULT.visualization.phases[2].right_branch,
    SAMPLE_RESULT.phases[2].sampled_results.map((item) => item.right_branch ?? item.branch_state.split("/")[1])
  );
  assert.equal(SAMPLE_RESULT.normalized_input.design_options.target_element_length_m, 0.5);
  assert.equal(SAMPLE_RESULT.governing.max_abs_moment_phase, "Deepen excavation to -5.0 m");
  assert.equal(SAMPLE_RESULT.governing.max_abs_rotation_mrad, 4);
  assert.equal(SAMPLE_RESULT.governing.max_abs_rotation_phase, "Deepen excavation to -5.0 m");
  assert.equal(SAMPLE_RESULT.governing.min_rotation_mrad, 0);
  assert.equal(SAMPLE_RESULT.governing.min_moment_kNm_per_m, -18);
  assert.equal(SAMPLE_RESULT.governing.min_shear_kN_per_m, -12);
  assert.equal(SAMPLE_RESULT.design_checks.wall.governing_check, "bending");
  assert.equal(SAMPLE_RESULT.design_checks.wall.bending_demand_kNm_per_m, 182.5);
  assert.equal(SAMPLE_RESULT.design_checks.supports[0].demand_kN_per_m, 91.4);
  assert.equal(SAMPLE_RESULT.design_checks.supports[0].capacity_kN_per_m, 144.889);
  assert.equal(SAMPLE_RESULT.design_checks.supports[0].axial_demand_kN_per_m, 94.624);
  assert.equal(SAMPLE_RESULT.design_checks.supports[0].axial_capacity_kN_per_m, 150);
  assert.equal(SAMPLE_RESULT.design_checks.supports[0].utilization_ratio, 0.631);
  assert.equal(SAMPLE_RESULT.phases[0].envelope.max_abs_plastic_offset_mm, 1.8);
  assert.equal(SAMPLE_RESULT.phases[0].sampled_results[0].depth_m, 0);
  assert.equal(SAMPLE_RESULT.phases[0].sampled_results[0].left_branch, "neutral");
  assert.equal(SAMPLE_RESULT.phases[0].sampled_results[0].right_branch, "neutral");
  assert.equal(SAMPLE_RESULT.phases[0].support_reactions[0].depth_m, 1.6);
  assert.equal(SAMPLE_RESULT.phases[0].support_reactions[0].branch_state, "inactive");
  assert.equal(SAMPLE_RESULT.phases[0].support_reactions[0].reaction_kN_per_m, 0);
  assert.equal(SAMPLE_RESULT.phases[1].support_reactions[0].branch_state, "elastic");
  assert.equal(SAMPLE_RESULT.phases[1].envelope.max_abs_plastic_offset_mm, 6.4);
  assert.equal(SAMPLE_RESULT.phases[1].sampled_results[3].depth_m, 6);
  assert.equal(SAMPLE_RESULT.phases[1].sampled_results[2].left_branch, "active");
  assert.equal(SAMPLE_RESULT.phases[1].sampled_results[2].right_branch, "passive");
  assert.equal(SAMPLE_RESULT.phases[1].support_reactions[0].depth_m, 1.6);
  assert.equal(SAMPLE_RESULT.phases[1].support_reactions[0].axial_force_kN_per_m, 67.396);
  assert.equal(SAMPLE_RESULT.phases[2].support_reactions[0].branch_state, "elastic");
  assert.equal(SAMPLE_RESULT.phases[2].envelope.max_abs_plastic_offset_mm, 9.1);
  assert.equal(SAMPLE_RESULT.phases[2].sampled_results[5].depth_m, 9.5);
  assert.equal(SAMPLE_RESULT.phases[2].sampled_results[5].left_branch, "passive");
  assert.equal(SAMPLE_RESULT.phases[2].sampled_results[5].right_branch, "passive");
  assert.equal(SAMPLE_RESULT.phases[2].support_reactions[0].depth_m, 1.6);
  assert.equal(SAMPLE_RESULT.phases[2].support_reactions[0].axial_force_kN_per_m, 94.624);
  assert.equal(SAMPLE_RESULT.design_checks.wall.governing_phase, "Deepen excavation to -5.0 m");
  assert.equal(SAMPLE_RESULT.design_checks.wall.governing_level_m, -4);
  assert.equal(SAMPLE_RESULT.design_checks.wall.wall_type, "steel_sheet_pile");
  assert.deepEqual(buildPhaseOptions(SAMPLE_RESULT), [
    { index: 0, label: "1. Initial at-rest state" },
    { index: 1, label: "2. Excavate left side to -4.0 m" },
    { index: 2, label: "3. Deepen excavation to -5.0 m" },
  ]);
  assert.match(buildPlotPath([0, -4, -8], [0, 14, 7]), /^M /);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /Wall-length search/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /Phase solver status/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /Converged in 5 iteration\(s\)/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /Selected-phase plastic offset/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /9\.10 mm/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /Solver discretization/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /6 nodes · 5 elements/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /Solver provenance/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /retaining-ts-sample-v1/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /Benchmark-backed validation remains pending/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /plan\.md screenshot acceptance workflow/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /Direct API visualization displacement array/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /Direct API visualization rotation array/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /Rotation/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /Global governing envelope/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /Rotation/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /4\.00 mrad/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /Max \|abs\|/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /-18\.00 kNm\/m/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /182\.50 kNm\/m/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /Deepen excavation to -5\.0 m/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /Wall design check/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /Support design checks/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /Bending demand \/ capacity/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /182\.50 \/ 246\.62 kNm\/m/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /91\.40 \/ 144\.89/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /axial 94\.62 \/ 150\.00 kN\/m/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /Governing level/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /-4\.00 m/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /Overall global pass/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), />PASS</);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /Governing support/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /Support-force table/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /<th>Support<\/th><th>Type<\/th><th>Side<\/th><th>Depth<\/th><th>Horizontal force<\/th><th>Moment<\/th><th>Axial force<\/th><th>Utilization \/ State<\/th>/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /Sampled numerical output/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /<th>Level<\/th><th>Depth<\/th><th>Disp\.<\/th><th>Rot\.<\/th><th>Moment<\/th><th>Shear<\/th><th>Net p<\/th><th>Water p<\/th><th>Branch<\/th><th>Left<\/th><th>Right<\/th>/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /active\/passive/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /<td>active<\/td>\s*<td>passive<\/td>/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /9\.50/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /1\.60 m/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /91\.40 kN\/m/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /94\.62 kN\/m/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 2), /A1/);
  assert.match(buildReportPreviewHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /HTML report export/);
  assert.match(buildReportPreviewHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /Phase solver status: converged in 5 iteration\(s\)/);
  assert.match(buildReportPreviewHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /Target element length: 0.50 m/);
  assert.match(buildReportPreviewHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /Selected-phase max plastic offset: 9\.10 mm/);
  assert.match(buildReportPreviewHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /Discretization: Target element length 0.50 m · 6 nodes · 5 elements/);
  assert.match(buildReportPreviewHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /Global displacement range: -1\.10 to 16\.40 mm/);
  assert.match(buildReportPreviewHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /Global rotation range: 0\.00 to 4\.00 mrad/);
  assert.match(buildReportPreviewHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /Global moment range: -18\.00 to 182\.50 kNm\/m/);
  assert.match(buildReportPreviewHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /Governing \|rotation\|: 4\.00 mrad \(Deepen excavation to -5\.0 m\)/);
  assert.match(buildReportPreviewHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /Governing \|moment\|: 182\.50 kNm\/m \(Deepen excavation to -5\.0 m\)/);
  assert.match(buildReportPreviewHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /Wall governing check: bending · demand\/capacity 182\.50 \/ 246\.62 kNm\/m/);
  assert.match(buildReportPreviewHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /Wall governing level: -4\.00 m/);
  assert.match(buildReportPreviewHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /Governing support check: A1 · demand\/capacity 91\.40 \/ 144\.89 kN\/m · axial 94\.62 \/ 150\.00 kN\/m/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 0), /inactive/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 0), /1\.60 m/);
  assert.match(buildResultHtml(SAMPLE_RESULT, 0), /0\.00 kN\/m/);
  assert.match(buildContactPanelHtml(SAMPLE_CONTACT_STATE, SAMPLE_RESULT, 2), /Prepare enquiry/);
  assert.match(buildContactPanelHtml(SAMPLE_CONTACT_STATE, SAMPLE_RESULT, 2), /Open mailto directly/);
  assert.match(buildReportHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /EA Suys Retaining Wall Report/);
  assert.match(buildReportHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /Steel section/);
  assert.match(buildReportHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /Global Governing Envelope/);
  assert.match(buildReportHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /4\.00 mrad/);
  assert.match(buildReportHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /Direct API visualization moment array/);
  assert.match(buildReportHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /<th>Quantity<\/th><th>Min<\/th><th>Max<\/th><th>Max \|abs\|<\/th>/);
  assert.match(buildReportHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /Wall-Length Search/);
  assert.match(buildReportHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /Discretization/);
  assert.match(buildReportHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /Target element length<\/dt><dd>0.50 m/);
  assert.match(buildReportHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /<th>Node<\/th><th>Level<\/th><th>Next element<\/th>/);
  assert.match(buildReportHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /Selected toe: -9.5 m/);
  assert.match(buildReportHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /Geometry Preview/);
  assert.match(buildReportHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /Wall Deformed Shape/);
  assert.match(buildReportHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /Rotation Plot/);
  assert.match(buildReportHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /Bending Moment Plot/);
  assert.match(buildReportHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /Wall design check/);
  assert.match(buildReportHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /Bending demand \/ capacity/);
  assert.match(buildReportHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /Support design checks/);
  assert.match(buildReportHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /<th>Support<\/th><th>Type<\/th><th>Demand<\/th><th>Capacity<\/th><th>Utilization<\/th><th>Governing phase<\/th><th>Status<\/th>/);
  assert.match(buildReportHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /Axial 94\.62 kN\/m/);
  assert.match(buildReportHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /Axial 150\.00 kN\/m/);
  assert.match(buildReportHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /A1 \(anchor · right · 1\.60 m\): 91\.40 kN\/m · axial 94\.62 kN\/m · utilization 0\.63/);
  assert.match(buildReportHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /Governing level/);
  assert.match(buildReportHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /-4\.00 m/);
  assert.match(buildReportHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /Wall pass/);
  assert.match(buildReportHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), />PASS</);
  assert.match(buildReportHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /Governing phase/);
  assert.match(buildReportHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /Sampled numerical output/);
  assert.match(buildReportHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /<th>Level<\/th><th>Depth<\/th><th>Disp\.<\/th><th>Rot\.<\/th><th>Moment<\/th><th>Shear<\/th><th>Net p<\/th><th>Water p<\/th><th>Branch<\/th><th>Left<\/th><th>Right<\/th>/);
  assert.match(buildReportHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /Branch/);
  assert.match(buildReportHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 2), /<th>Support<\/th><th>Type<\/th><th>Side<\/th><th>Depth<\/th><th>Horizontal force<\/th><th>Moment<\/th><th>Axial force<\/th><th>Utilization \/ State<\/th>/);
  assert.match(buildReportHtml(SAMPLE_PROJECT, SAMPLE_RESULT, 0), /A1 \(anchor · right · 1\.60 m\): 0\.00 kN\/m · inactive/);

  const mailto = decodeURIComponent(buildDirectMailto(
    SAMPLE_CONTACT_STATE,
    SAMPLE_RESULT,
    2
  ));
  assert.match(mailto, /Basement wall study/);
  assert.match(mailto, /Phase solver status: converged in 5 iteration\(s\)/);
  assert.match(mailto, /Global displacement range: -1.10 to 16.40 mm/);
  assert.match(mailto, /Global rotation range: 0.00 to 4.00 mrad/);
  assert.match(mailto, /Global moment range: -18.00 to 182.50 kNm\/m/);
  assert.match(mailto, /Governing \|rotation\|: 4.00 mrad \(Deepen excavation to -5.0 m\)/);
  assert.match(mailto, /Wall bending demand\/capacity: 182.50 \/ 246.62 kNm\/m/);
  assert.match(mailto, /Wall shear demand\/capacity: 102.30 \/ 249.51 kN\/m/);
  assert.match(mailto, /Wall governing level: -4.00 m/);
  assert.match(mailto, /Governing support demand\/capacity: 91.40 \/ 144.89 kN\/m · axial 94.62 \/ 150.00 kN\/m/);
});

test("study-request helpers build and submit the retained contact payload", async () => {
  const payload = buildStudyRequestPayload(
    {
      projectName: " Basement wall study ",
      email: " engineer@example.com ",
      message: " Please review the final phase. ",
      consent: true,
    },
    SAMPLE_RESULT,
    2,
    "turnstile-token",
    "https://retaining.easuys.com/demo"
  );

  assert.equal(payload.project_name, "Basement wall study");
  assert.equal(payload.email, "engineer@example.com");
  assert.equal(payload.message, "Please review the final phase.");
  assert.equal(payload.lead_tracking_consent, true);
  assert.equal(payload.source_tool, "retaining_flexible_wall_analysis");
  assert.equal(payload.tool_label, "Flexible wall analysis");
  assert.equal(payload.locale, "en");
  assert.equal(payload.source_url, "https://retaining.easuys.com/demo");
  assert.equal(payload.turnstile_token, "turnstile-token");
  assert.ok(payload.result_summary.some((line) => /Wall governing level: -4.00 m/.test(line)));

  let capturedUrl = "";
  let capturedOptions;
  const mockFetch = async (url, options) => {
    capturedUrl = String(url);
    capturedOptions = options;
    return {
      ok: true,
      json: async () => ({ mailto: "mailto:test@example.com" }),
    };
  };

  const body = await submitStudyRequest(payload, mockFetch);

  assert.equal(capturedUrl, `${API_BASE_URL}${CONTACT_ENDPOINT}`);
  assert.equal(capturedOptions.method, "POST");
  assert.equal(capturedOptions.headers["content-type"], "application/json");
  assert.deepEqual(JSON.parse(capturedOptions.body), payload);
  assert.deepEqual(body, { mailto: "mailto:test@example.com" });
});

test("submitStudyRequest surfaces backend contact errors", async () => {
  const payload = buildStudyRequestPayload(SAMPLE_CONTACT_STATE, SAMPLE_RESULT, 2);
  const mockFetch = async () => ({
    ok: false,
    json: async () => ({ error: "Synthetic contact failure" }),
  });

  await assert.rejects(
    () => submitStudyRequest(payload, mockFetch),
    /Synthetic contact failure/
  );
});

test("loadTurnstileScript reuses one injected script and resolves the runtime turnstile object", async () => {
  resetTurnstileLoaderForTests();
  const scripts = new Map();
  const appended = [];
  const documentRef = {
    head: {
      appendChild(node) {
        appended.push(node);
        scripts.set(node.src, node);
      },
    },
    querySelector(selector) {
      const match = /^script\[src="(.+)"\]$/.exec(selector);
      return match ? scripts.get(match[1]) ?? null : null;
    },
    createElement() {
      const listeners = new Map();
      return {
        src: "",
        async: false,
        defer: false,
        addEventListener(event, handler) {
          listeners.set(event, handler);
        },
        dispatch(event) {
          listeners.get(event)?.();
        },
      };
    },
  };
  const runtimeRef = {};

  const pending = loadTurnstileScript(documentRef, runtimeRef);
  const duplicate = loadTurnstileScript(documentRef, runtimeRef);

  assert.equal(appended.length, 1);
  assert.equal(pending, duplicate);
  runtimeRef.turnstile = { render() {} };
  appended[0].dispatch("load");
  assert.equal(await pending, runtimeRef.turnstile);

  resetTurnstileLoaderForTests();
});

test("loadTurnstileScript resolves immediately when turnstile is already present", async () => {
  resetTurnstileLoaderForTests();
  const runtimeRef = { turnstile: { render() {} } };
  const documentRef = {
    head: {
      appendChild() {
        throw new Error("should not append script when turnstile is already present");
      },
    },
    querySelector() {
      return null;
    },
    createElement() {
      throw new Error("should not create script when turnstile is already present");
    },
  };

  assert.equal(await loadTurnstileScript(documentRef, runtimeRef), runtimeRef.turnstile);
  resetTurnstileLoaderForTests();
});

test("result summaries surface non-converged phase solver status", () => {
  const unstable = structuredClone(SAMPLE_RESULT);
  unstable.design_checks.overall_pass = false;
  unstable.warnings = [
    ...(unstable.warnings || []),
    "PHASE_DID_NOT_CONVERGE:Deepen excavation to -5.0 m",
  ];
  unstable.phases[2].converged = false;
  unstable.phases[2].iterations = 40;

  const html = buildResultHtml(unstable, 2);
  const preview = buildReportPreviewHtml(SAMPLE_PROJECT, unstable, 2);
  const report = buildReportHtml(SAMPLE_PROJECT, unstable, 2);
  const mailto = decodeURIComponent(buildDirectMailto(SAMPLE_CONTACT_STATE, unstable, 2));

  assert.match(html, /Did not converge after 40 iteration\(s\)/);
  assert.match(preview, /Phase solver status: did not converge after 40 iteration\(s\)/);
  assert.match(report, /Phase solver status: did not converge after 40 iteration\(s\)/);
  assert.match(mailto, /Phase solver status: did not converge after 40 iteration\(s\)/);
});

test("result rendering shows dedicated moment support output in kNm/m", () => {
  const resultWithMoment = structuredClone(SAMPLE_RESULT);
  resultWithMoment.phases[2].support_reactions = [
    ...resultWithMoment.phases[2].support_reactions,
    {
      id: "M1",
      type: "moment",
      side: "left",
      depth_m: 3.5,
      reaction_kN_per_m: 0,
      reaction_moment_kNm_per_m: 25,
      branch_state: "elastic",
    },
  ];

  const html = buildResultHtml(resultWithMoment, 2);
  const report = buildReportHtml(SAMPLE_PROJECT, resultWithMoment, 2);

  assert.match(html, /M1/);
  assert.match(html, /25\.00 kNm\/m/);
  assert.doesNotMatch(html, /M1[\s\S]*25\.00 kN\/m/);
  assert.match(report, /25\.00 kNm\/m/);
  assert.doesNotMatch(report, /M1[\s\S]*25\.00 kN\/m/);
});

test("result rendering shows combined force and moment output for clamp restraints", () => {
  const resultWithClamp = structuredClone(SAMPLE_RESULT);
  resultWithClamp.phases[2].support_reactions = [
    ...resultWithClamp.phases[2].support_reactions,
    {
      id: "C1",
      type: "clamp",
      side: "right",
      depth_m: 1.8,
      reaction_kN_per_m: 32.5,
      reaction_moment_kNm_per_m: 18.4,
      branch_state: "fixed",
    },
  ];

  const html = buildResultHtml(resultWithClamp, 2);
  const report = buildReportHtml(SAMPLE_PROJECT, resultWithClamp, 2);

  assert.match(html, /32\.50 kN\/m/);
  assert.match(html, /18\.40 kNm\/m/);
  assert.match(report, /32\.50 kN\/m/);
  assert.match(report, /18\.40 kNm\/m/);
});

test("report helpers prefer backend normalized input over drifted local project metadata", () => {
  const driftedProject = structuredClone(SAMPLE_PROJECT);
  driftedProject.wall_type = "diaphragm_wall";
  driftedProject.design_mode = "ec7";
  driftedProject.wall_geometry.inclination_degrees = 17;
  driftedProject.wall_geometry.segments[0].steel_section = {
    section_name: "Local override section",
    steel_grade_mpa: 460,
    gamma_m0: 1.25,
    plastic_section_modulus_cm3_per_m: 999,
    shear_area_cm2_per_m: 19,
  };
  driftedProject.design_options.target_element_length_m = 0.9;
  driftedProject.phases[2].vertical_line_load_kN_per_m = 99;

  const preview = buildReportPreviewHtml(driftedProject, SAMPLE_RESULT, 2);
  const report = buildReportHtml(driftedProject, SAMPLE_RESULT, 2);

  assert.match(preview, /Wall type: steel sheet pile/);
  assert.doesNotMatch(preview, /Wall type: diaphragm wall/);
  assert.match(preview, /Steel section: AZ 18/);
  assert.doesNotMatch(preview, /Local override section/);
  assert.match(preview, /Wall inclination: 4\.0°/);
  assert.doesNotMatch(preview, /Wall inclination: 17\.0°/);
  assert.match(preview, /Phase vertical wall load: 35\.0 kN\/m/);
  assert.doesNotMatch(preview, /Phase vertical wall load: 99\.0 kN\/m/);
  assert.match(preview, /Target element length: 0\.50 m/);
  assert.doesNotMatch(preview, /Target element length: 0\.90 m/);

  assert.match(report, /<dt>Wall type<\/dt><dd>steel sheet pile<\/dd>/);
  assert.doesNotMatch(report, /<dt>Wall type<\/dt><dd>diaphragm wall<\/dd>/);
  assert.match(report, /<dt>Design mode<\/dt><dd>CLASSIC<\/dd>/);
  assert.doesNotMatch(report, /<dt>Design mode<\/dt><dd>EC7<\/dd>/);
  assert.match(report, /<dt>Wall inclination<\/dt><dd>4\.0°<\/dd>/);
  assert.doesNotMatch(report, /<dt>Wall inclination<\/dt><dd>17\.0°<\/dd>/);
  assert.match(report, /<dt>Vertical wall load<\/dt><dd>35\.0 kN\/m<\/dd>/);
  assert.doesNotMatch(report, /<dt>Vertical wall load<\/dt><dd>99\.0 kN\/m<\/dd>/);
  assert.match(report, /<dt>Target element length<\/dt><dd>0\.50 m<\/dd>/);
  assert.doesNotMatch(report, /<dt>Target element length<\/dt><dd>0\.90 m<\/dd>/);
  assert.match(report, /<dt>Steel section<\/dt><dd>AZ 18<\/dd>/);
  assert.doesNotMatch(report, /Local override section/);
});

test("export helpers bind downloads to the analyzed normalized input", () => {
  const driftedProject = structuredClone(SAMPLE_PROJECT);
  driftedProject.wall_type = "diaphragm_wall";
  driftedProject.design_mode = "ec7";
  driftedProject.wall_geometry.inclination_degrees = 17;
  driftedProject.design_options.target_element_length_m = 0.9;

  const analyzedProject = resolveAnalyzedProject(driftedProject, SAMPLE_RESULT);
  assert.equal(analyzedProject.wall_type, "steel_sheet_pile");
  assert.equal(analyzedProject.design_mode, "classic");
  assert.equal(analyzedProject.wall_geometry.inclination_degrees, 4);
  assert.equal(analyzedProject.design_options.target_element_length_m, 0.5);

  const fallbackProject = resolveAnalyzedProject(driftedProject, { normalized_input: { wall_type: "invalid" } });
  assert.equal(fallbackProject, driftedProject);

  const exported = JSON.parse(buildResultDownloadText(driftedProject, SAMPLE_RESULT));
  assert.equal(exported.project.wall_type, "steel_sheet_pile");
  assert.equal(exported.project.design_mode, "classic");
  assert.equal(exported.project.wall_geometry.inclination_degrees, 4);
  assert.equal(exported.project.design_options.target_element_length_m, 0.5);
  assert.equal(exported.result.formula_version, "retaining-ts-sample-v1");

  const fixedDate = new Date("2026-06-09T06:00:00.000Z");
  assert.equal(
    buildResultFilename(analyzedProject, fixedDate),
    "ea-suys-steel-sheet-pile-classic-20260609T060000Z.json",
  );
  assert.equal(
    buildReportFilename(analyzedProject, fixedDate),
    "ea-suys-steel-sheet-pile-classic-20260609T060000Z.html",
  );
});

test("diaphragm wall editor and reports use diaphragm-section language instead of steel-section controls", () => {
  const diaphragmProject = structuredClone(SAMPLE_PROJECT);
  diaphragmProject.wall_type = "diaphragm_wall";
  diaphragmProject.wall_geometry.segments[0].label = "800 mm panel";
  diaphragmProject.wall_geometry.segments[0].ei_kNm2_per_m = 88000;
  diaphragmProject.wall_geometry.segments[0].cracked_ei_kNm2_per_m = 32000;
  diaphragmProject.wall_geometry.segments[0].cracking_moment_kNm_per_m = 210;
  diaphragmProject.wall_geometry.segments[0].moment_resistance_kNm_per_m = 640;
  diaphragmProject.wall_geometry.segments[0].shear_resistance_kN_per_m = 410;
  diaphragmProject.wall_geometry.segments[0].steel_section = {};

  const diaphragmSnapshot = buildInputSnapshot(diaphragmProject, 1);
  const diaphragmEditor = buildQuickEditorHtml(diaphragmProject, 1);
  const diaphragmResult = structuredClone(SAMPLE_RESULT);
  diaphragmResult.normalized_input = structuredClone(diaphragmProject);
  diaphragmResult.design_checks.wall.wall_type = "diaphragm_wall";
  const diaphragmPreview = buildReportPreviewHtml(diaphragmProject, diaphragmResult, 2);
  const diaphragmReport = buildReportHtml(diaphragmProject, diaphragmResult, 2);

  assert.match(diaphragmSnapshot[0].text, /diaphragm wall/);
  assert.match(diaphragmSnapshot[0].text, /800 mm panel/);
  assert.match(diaphragmSnapshot[0].text, /EI 88000 kNm2\/m/);
  assert.match(diaphragmSnapshot[0].text, /Md 640 kNm\/m/);

  assert.doesNotMatch(diaphragmEditor, /Steel section/);
  assert.doesNotMatch(diaphragmEditor, /Manual Wpl/);
  assert.doesNotMatch(diaphragmEditor, /Gamma M0/);
  assert.match(diaphragmEditor, /Diaphragm wall mode uses the direct EI, cracked EI, cracking moment, and direct moment\/shear resistance fields above/);
  assert.match(diaphragmEditor, /direct diaphragm section stiffness\/cracking\/resistance inputs/);

  assert.match(diaphragmPreview, /Diaphragm section: 800 mm panel/);
  assert.doesNotMatch(diaphragmPreview, /Steel section:/);
  assert.match(diaphragmReport, /<dt>Diaphragm section<\/dt><dd>800 mm panel/);
  assert.doesNotMatch(diaphragmReport, /<dt>Steel section<\/dt>/);
});

test("result rendering prefers visualization arrays over sampled-result fallback", () => {
  const visualized = structuredClone(SAMPLE_RESULT);
  const visualizationPhases = visualized.phases.map((phase, index) => ({
    phase_index: phase.phase_index ?? index,
    name: phase.name,
    converged: phase.converged,
    iterations: phase.iterations,
    levels_m: index === 2 ? [0, -4, -9.5] : phase.sampled_results.map((item) => item.level_m),
    displacement_mm: index === 2 ? [0, 40, 0] : phase.sampled_results.map((item) => item.displacement_mm),
    rotation_mrad: index === 2 ? [0, 9, 0] : phase.sampled_results.map((item) => item.rotation_mrad),
    moment_kNm_per_m: index === 2 ? [0, 250, 0] : phase.sampled_results.map((item) => item.moment_kNm_per_m),
    shear_kN_per_m: index === 2 ? [0, 120, 0] : phase.sampled_results.map((item) => item.shear_kN_per_m),
    net_soil_pressure_kPa: index === 2 ? [0, -35, 0] : phase.sampled_results.map((item) => item.net_soil_pressure_kPa),
    water_pressure_kPa: index === 2 ? [0, 22, 0] : phase.sampled_results.map((item) => item.water_pressure_kPa),
    branch_state: index === 2 ? ["neutral/neutral", "active/passive", "passive/passive"] : phase.sampled_results.map((item) => item.branch_state),
    left_branch: phase.sampled_results.map((item) => item.left_branch ?? item.branch_state.split("/")[0]),
    right_branch: phase.sampled_results.map((item) => item.right_branch ?? item.branch_state.split("/")[1]),
  }));
  const targetVisualization = {
    ...visualizationPhases[2],
    name: "Mismatched visualization phase name",
  };
  visualized.visualization = {
    phases: [targetVisualization, visualizationPhases[0], visualizationPhases[1]],
  };

  const html = buildResultHtml(visualized, 2);
  const report = buildReportHtml(SAMPLE_PROJECT, visualized, 2);
  const visualizationPath = buildPlotPath([0, -4, -9.5], [0, 250, 0]);
  const sampledPath = buildPlotPath(
    SAMPLE_RESULT.phases[2].sampled_results.map((item) => item.level_m),
    SAMPLE_RESULT.phases[2].sampled_results.map((item) => item.moment_kNm_per_m)
  );
  const visualizationRotationPath = buildPlotPath([0, -4, -9.5], [0, 9, 0]);
  const sampledRotationPath = buildPlotPath(
    SAMPLE_RESULT.phases[2].sampled_results.map((item) => item.level_m),
    SAMPLE_RESULT.phases[2].sampled_results.map((item) => item.rotation_mrad)
  );

  assert.match(html, /Direct API visualization moment array/);
  assert.match(html, /Direct API visualization rotation array/);
  assert.match(html, new RegExp(visualizationPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(html, new RegExp(visualizationRotationPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.doesNotMatch(html, new RegExp(sampledPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.doesNotMatch(html, new RegExp(sampledRotationPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.match(report, /Direct API visualization moment array/);
  assert.match(report, /Direct API visualization rotation array/);
});

test("underwater concrete block support type is editable and rendered in geometry preview", () => {
  const blockedProject = applyQuickEditorPatch(SAMPLE_PROJECT, 1, {
    support_id: "B1",
    support_type: "underwater_concrete_block",
    support_side: "left",
    support_depth_m: 2.2,
    support_stiffness_kN_per_m: 7000,
    support_capacity_kN_per_m: 110,
    support_prestress_kN_per_m: 0,
  });

  assert.equal(blockedProject.supports[0].type, "underwater_concrete_block");
  assert.equal(blockedProject.supports[0].side, "left");
  assert.equal(blockedProject.supports[0].stiffness_kN_per_m, 7000);
  assert.match(buildInputSnapshot(blockedProject, 1)[4].text, /underwater concrete block/);
  assert.match(buildGeometryPreviewSvg(blockedProject, 1), /B1 underwater concrete block/);
});

test("quick editor patch updates section, load and geometry fields", () => {
  const patched = applyQuickEditorPatch(SAMPLE_PROJECT, 1, {
    phase_name: "Revised excavation stage",
    segment_label: "Updated segment",
    segment_top_level_m: 0.2,
    segment_bottom_level_m: -9.4,
    wall_type: "diaphragm_wall",
    design_mode: "ec7",
    inclination_degrees: 8,
    segment_ei_kNm2_per_m: 88000,
    segment_cracked_ei_kNm2_per_m: 32000,
    segment_cracking_moment_kNm_per_m: 210,
    segment_moment_resistance_kNm_per_m: 640,
    segment_shear_resistance_kN_per_m: 410,
    library_section_id: "GU_22N",
    section_name: "Custom GU panel",
    plastic_section_modulus_cm3_per_m: 1040,
    shear_area_cm2_per_m: 14.5,
    steel_grade_mpa: 355,
    gamma_m0: 1.15,
    surface_level_left_m: 0.8,
    surface_level_right_m: 0.4,
    excavation_level_left_m: -4.5,
    groundwater_level_right_m: -1.8,
    surcharge_right_kPa: 26,
    left_unit_weight_dry_kN_m3: 18.2,
    left_wall_friction_deg: 20,
    left_at_rest_coefficient: 0.55,
    left_bedding_model: "tri_linear",
    left_tri_linear_displacement_breakpoints_mm: [1, 3],
    left_tri_linear_stiffness_factors: [1, 0.4, 0.1],
    right_active_coefficient: 0.31,
    right_pore_pressure_offset_kPa: 4.5,
    right_bedding_model: "tri_linear",
    right_tri_linear_displacement_breakpoints_mm: [1.5, 4],
    right_tri_linear_stiffness_factors: [1, 0.5, 0.2],
    vertical_line_load_kN_per_m: 52,
    include_vertical_line_second_order: false,
    support_id: "A1R",
    support_inclination_degrees: 24,
    target_element_length_m: 0.3,
  });

  assert.equal(patched.phases[1].name, "Revised excavation stage");
  assert.equal(patched.wall_geometry.top_level_m, 0.2);
  assert.equal(patched.wall_geometry.toe_level_m, -9.4);
  assert.equal(patched.wall_geometry.segments[0].label, "Updated segment");
  assert.equal(patched.wall_geometry.segments[0].top_level_m, 0.2);
  assert.equal(patched.wall_geometry.segments[0].bottom_level_m, -9.4);
  assert.equal(patched.wall_type, "diaphragm_wall");
  assert.equal(patched.design_mode, "ec7");
  assert.equal(patched.wall_geometry.inclination_degrees, 8);
  assert.equal(patched.wall_geometry.segments[0].ei_kNm2_per_m, 88000);
  assert.equal(patched.wall_geometry.segments[0].cracked_ei_kNm2_per_m, 32000);
  assert.equal(patched.wall_geometry.segments[0].cracking_moment_kNm_per_m, 210);
  assert.equal(patched.wall_geometry.segments[0].moment_resistance_kNm_per_m, 640);
  assert.equal(patched.wall_geometry.segments[0].shear_resistance_kN_per_m, 410);
  assert.equal(patched.wall_geometry.segments[0].steel_section.library_section_id, "GU_22N");
  assert.equal(patched.wall_geometry.segments[0].steel_section.section_name, "Custom GU panel");
  assert.equal(patched.wall_geometry.segments[0].steel_section.plastic_section_modulus_cm3_per_m, 1040);
  assert.equal(patched.wall_geometry.segments[0].steel_section.gamma_m0, 1.15);
  assert.equal(patched.phases[1].surface_level_left_m, 0.8);
  assert.equal(patched.phases[1].surface_level_right_m, 0.4);
  assert.equal(patched.phases[1].excavation_level_left_m, -4.5);
  assert.equal(patched.phases[1].groundwater_level_right_m, -1.8);
  assert.equal(patched.phases[1].surcharge_right_kPa, 26);
  assert.equal(patched.soil_profiles.left.layers[0].unit_weight_dry_kN_m3, 18.2);
  assert.equal(patched.soil_profiles.left.layers[0].wall_friction_deg, 20);
  assert.equal(patched.soil_profiles.left.layers[0].at_rest_coefficient, 0.55);
  assert.equal(patched.soil_profiles.left.layers[0].bedding_model, "tri_linear");
  assert.deepEqual(patched.soil_profiles.left.layers[0].tri_linear_displacement_breakpoints_mm, [1, 3]);
  assert.deepEqual(patched.soil_profiles.left.layers[0].tri_linear_stiffness_factors, [1, 0.4, 0.1]);
  assert.equal(patched.soil_profiles.right.layers[0].active_coefficient, 0.31);
  assert.equal(patched.soil_profiles.right.layers[0].pore_pressure_offset_kPa, 4.5);
  assert.equal(patched.soil_profiles.right.layers[0].bedding_model, "tri_linear");
  assert.deepEqual(patched.soil_profiles.right.layers[0].tri_linear_displacement_breakpoints_mm, [1.5, 4]);
  assert.deepEqual(patched.soil_profiles.right.layers[0].tri_linear_stiffness_factors, [1, 0.5, 0.2]);
  assert.equal(patched.phases[1].vertical_line_load_kN_per_m, 52);
  assert.equal(patched.phases[1].include_vertical_line_second_order, false);
  assert.equal(patched.supports[0].id, "A1R");
  assert.equal(patched.supports[0].inclination_degrees, 24);
  assert.equal(patched.design_options.target_element_length_m, 0.3);
});

test("quick editor patch applies design-mode gamma M0 defaults when manual steel gamma is omitted", () => {
  const classicProject = structuredClone(SAMPLE_PROJECT);
  delete classicProject.wall_geometry.segments[0].steel_section.gamma_m0;

  const classicPatched = applyQuickEditorPatch(classicProject, 1, {
    segment_label: "Classic manual segment",
  });
  assert.equal(classicPatched.wall_geometry.segments[0].steel_section.gamma_m0, 1);

  const ec7Patched = applyQuickEditorPatch(classicProject, 1, {
    design_mode: "ec7",
    segment_label: "EC7 manual segment",
  });
  assert.equal(ec7Patched.design_mode, "ec7");
  assert.equal(ec7Patched.wall_geometry.segments[0].steel_section.gamma_m0, 1.1);
});

test("quick editor can target non-first segment, soil layers and support items", () => {
  const multiItemProject = structuredClone(SAMPLE_PROJECT);
  multiItemProject.wall_geometry.segments.push({
    label: "Lower diaphragm segment",
    top_level_m: -4.5,
    bottom_level_m: -9,
    ei_kNm2_per_m: 41000,
    cracked_ei_kNm2_per_m: 24000,
    cracking_moment_kNm_per_m: 180,
    moment_resistance_kNm_per_m: 510,
    shear_resistance_kN_per_m: 320,
    steel_section: {
      section_name: "Manual lower",
      plastic_section_modulus_cm3_per_m: 920,
      shear_area_cm2_per_m: 12.3,
      steel_grade_mpa: 355,
      gamma_m0: 1,
    },
  });
  multiItemProject.soil_profiles.left.layers.push({
    top_level_m: -6,
    bottom_level_m: -12,
    unit_weight_dry_kN_m3: 19,
    unit_weight_wet_kN_m3: 21,
    friction_angle_deg: 36,
    cohesion_kPa: 5,
    subgrade_modulus_kN_m3: 36000,
  });
  multiItemProject.soil_profiles.right.layers.push({
    top_level_m: -5,
    bottom_level_m: -12,
    unit_weight_dry_kN_m3: 20,
    unit_weight_wet_kN_m3: 21,
    friction_angle_deg: 34,
    cohesion_kPa: 3,
    subgrade_modulus_kN_m3: 34000,
  });
  multiItemProject.supports.push({
    id: "S2",
    type: "spring",
    depth_m: 5.4,
    side: "left",
    stiffness_kN_per_m: 18000,
    active_from_phase: 2,
  });

  const editorHtml = buildQuickEditorHtml(multiItemProject, 2, {
    segmentIndex: 1,
    leftLayerIndex: 1,
    rightLayerIndex: 1,
    supportIndex: 1,
  });
  assert.match(editorHtml, /Lower diaphragm segment/);
  assert.match(editorHtml, /S2 spring/);
  assert.match(editorHtml, /<option value="1" selected>2\. Lower diaphragm segment<\/option>/);
  assert.match(editorHtml, /<option value="1" selected>2\. S2 spring<\/option>/);

  const patched = applyQuickEditorPatch(multiItemProject, 2, {
    phase_name: "Stage 3 renamed",
    segment_label: "Rebased lower segment",
    segment_top_level_m: -4.8,
    segment_bottom_level_m: -10.2,
    segment_ei_kNm2_per_m: 45500,
    left_friction_angle_deg: 39,
    right_pore_pressure_offset_kPa: 6.5,
    support_id: "M2",
    support_type: "moment",
    support_moment_kNm_per_m: 72,
    support_side: "right",
  }, {
    segmentIndex: 1,
    leftLayerIndex: 1,
    rightLayerIndex: 1,
    supportIndex: 1,
  });

  assert.equal(patched.phases[2].name, "Stage 3 renamed");
  assert.equal(patched.wall_geometry.segments[0].label, "AZ 18 sample");
  assert.equal(patched.wall_geometry.segments[1].label, "Rebased lower segment");
  assert.equal(patched.wall_geometry.segments[1].top_level_m, -4.8);
  assert.equal(patched.wall_geometry.segments[1].bottom_level_m, -10.2);
  assert.equal(patched.wall_geometry.toe_level_m, -10.2);
  assert.equal(patched.wall_geometry.segments[0].ei_kNm2_per_m, 52000);
  assert.equal(patched.wall_geometry.segments[1].ei_kNm2_per_m, 45500);
  assert.equal(patched.soil_profiles.left.layers[0].friction_angle_deg, 30);
  assert.equal(patched.soil_profiles.left.layers[1].friction_angle_deg, 39);
  assert.equal(patched.soil_profiles.right.layers[0].pore_pressure_offset_kPa, undefined);
  assert.equal(patched.soil_profiles.right.layers[1].pore_pressure_offset_kPa, 6.5);
  assert.equal(patched.supports[0].type, "anchor");
  assert.equal(patched.supports[1].id, "M2");
  assert.equal(patched.supports[1].type, "moment");
  assert.equal(patched.supports[1].moment_kNm_per_m, 72);
  assert.equal(patched.supports[1].side, "right");
});

test("structure actions split and remove selected retaining items with bounded geometry", () => {
  const multiItemProject = structuredClone(SAMPLE_PROJECT);
  multiItemProject.wall_geometry.segments.push({
    label: "Lower segment",
    top_level_m: -4,
    bottom_level_m: -9,
    ei_kNm2_per_m: 41000,
  });
  multiItemProject.soil_profiles.left.layers.push({
    top_level_m: -6,
    bottom_level_m: -12,
    unit_weight_dry_kN_m3: 19,
    unit_weight_wet_kN_m3: 21,
    friction_angle_deg: 36,
    subgrade_modulus_kN_m3: 36000,
  });
  multiItemProject.soil_profiles.right.layers.push({
    top_level_m: -5,
    bottom_level_m: -12,
    unit_weight_dry_kN_m3: 20,
    unit_weight_wet_kN_m3: 21,
    friction_angle_deg: 34,
    subgrade_modulus_kN_m3: 34000,
  });
  multiItemProject.supports.push({
    id: "S2",
    type: "spring",
    depth_m: 5.4,
    side: "left",
    stiffness_kN_per_m: 18000,
    active_from_phase: 2,
  });

  const splitSegment = applyQuickEditorStructureAction(multiItemProject, { segmentIndex: 1 }, "segment_split");
  assert.equal(splitSegment.project.wall_geometry.segments.length, 3);
  assert.equal(splitSegment.project.wall_geometry.segments[1].top_level_m, -4);
  assert.equal(splitSegment.project.wall_geometry.segments[1].bottom_level_m, -6.5);
  assert.equal(splitSegment.project.wall_geometry.segments[2].top_level_m, -6.5);
  assert.equal(splitSegment.project.wall_geometry.segments[2].bottom_level_m, -9);
  assert.equal(splitSegment.focus.segmentIndex, 2);

  const removedSegment = applyQuickEditorStructureAction(splitSegment.project, splitSegment.focus, "segment_remove");
  assert.equal(removedSegment.project.wall_geometry.segments.length, 2);
  assert.equal(removedSegment.project.wall_geometry.segments[1].top_level_m, -4);
  assert.equal(removedSegment.project.wall_geometry.segments[1].bottom_level_m, -9);
  assert.equal(removedSegment.project.wall_geometry.toe_level_m, -9);

  const splitLeftLayer = applyQuickEditorStructureAction(multiItemProject, { leftLayerIndex: 1 }, "left_layer_split");
  assert.equal(splitLeftLayer.project.soil_profiles.left.layers.length, 3);
  assert.equal(splitLeftLayer.project.soil_profiles.left.layers[1].bottom_level_m, -9);
  assert.equal(splitLeftLayer.project.soil_profiles.left.layers[2].top_level_m, -9);

  const removedRightLayer = applyQuickEditorStructureAction(multiItemProject, { rightLayerIndex: 1 }, "right_layer_remove");
  assert.equal(removedRightLayer.project.soil_profiles.right.layers.length, 1);
  assert.equal(removedRightLayer.project.soil_profiles.right.layers[0].bottom_level_m, -12);

  const addedSupport = applyQuickEditorStructureAction(multiItemProject, { supportIndex: 1 }, "support_add");
  assert.equal(addedSupport.project.supports.length, 3);
  assert.match(addedSupport.project.supports[2].id, /^S\d+$/);
  assert.equal(addedSupport.focus.supportIndex, 2);

  const removedSupport = applyQuickEditorStructureAction(addedSupport.project, { supportIndex: 2 }, "support_remove");
  assert.equal(removedSupport.project.supports.length, 2);
});

test("structure actions can duplicate and remove phases while shifting support phase windows", () => {
  const phaseProject = structuredClone(SAMPLE_PROJECT);
  phaseProject.supports[0].active_to_phase = 1;
  phaseProject.supports.push({
    id: "S2",
    type: "spring",
    depth_m: 4.5,
    side: "left",
    stiffness_kN_per_m: 15000,
    active_from_phase: 2,
    active_to_phase: 2,
  });

  const duplicated = applyQuickEditorStructureAction(phaseProject, {}, "phase_duplicate", 1);
  assert.equal(duplicated.project.phases.length, 4);
  assert.equal(duplicated.project.phases[2].name, "Excavate left side to -4.0 m copy");
  assert.equal(duplicated.project.supports[0].active_from_phase, 1);
  assert.equal(duplicated.project.supports[0].active_to_phase, 2);
  assert.equal(duplicated.project.supports[1].active_from_phase, 3);
  assert.equal(duplicated.project.supports[1].active_to_phase, 3);
  assert.equal(duplicated.previewPhaseIndex, 2);

  const removed = applyQuickEditorStructureAction(duplicated.project, duplicated.focus, "phase_remove", 1);
  assert.equal(removed.project.phases.length, 3);
  assert.equal(removed.project.supports[0].active_from_phase, 1);
  assert.equal(removed.project.supports[0].active_to_phase, 1);
  assert.equal(removed.project.supports[1].active_from_phase, 2);
  assert.equal(removed.project.supports[1].active_to_phase, 2);
  assert.equal(removed.previewPhaseIndex, 1);
});

test("quick editor can switch from library to manual steel section input", () => {
  const manual = applyQuickEditorPatch(SAMPLE_PROJECT, 1, {
    library_section_id: "",
    plastic_section_modulus_cm3_per_m: 1115,
    shear_area_cm2_per_m: 15.2,
    steel_grade_mpa: 390,
  });

  assert.equal(manual.wall_geometry.segments[0].steel_section.library_section_id, undefined);
  assert.equal(manual.wall_geometry.segments[0].steel_section.plastic_section_modulus_cm3_per_m, 1115);
  assert.equal(manual.wall_geometry.segments[0].steel_section.shear_area_cm2_per_m, 15.2);
  assert.equal(manual.wall_geometry.segments[0].steel_section.steel_grade_mpa, 390);
  assert.match(buildQuickEditorHtml(manual, 1), /<option value="" selected>Manual \/ custom<\/option>/);
});

test("quick editor can enable wall-length search controls", () => {
  const searched = applyQuickEditorPatch(SAMPLE_PROJECT, 1, {
    toe_mode: "search",
    search_start_toe_level_m: -8,
    search_minimum_toe_level_m: -10,
    search_step_m: 0.5,
    search_max_head_displacement_mm: 8,
  });

  assert.deepEqual(searched.design_options.wall_length_search, {
    start_toe_level_m: -8,
    minimum_toe_level_m: -10,
    step_m: 0.5,
    max_head_displacement_mm: 8,
  });
  assert.match(buildInputSnapshot(searched, 1)[5].text, /Search from -8.0 m to -10.0 m/);
  assert.match(buildQuickEditorHtml(searched, 1), /<option value="search" selected>Search length<\/option>/);
});

test("quick editor can switch the first support to a point load and geometry preview reflects it", () => {
  const pointLoadProject = applyQuickEditorPatch(SAMPLE_PROJECT, 1, {
    support_type: "point_load",
    support_side: "left",
    support_depth_m: 2.5,
    support_force_kN_per_m: 40,
    support_moment_kNm_per_m: 0,
  });

  assert.equal(pointLoadProject.supports[0].type, "point_load");
  assert.equal(pointLoadProject.supports[0].side, "left");
  assert.equal(pointLoadProject.supports[0].depth_m, 2.5);
  assert.equal(pointLoadProject.supports[0].force_kN_per_m, 40);
  assert.match(buildInputSnapshot(pointLoadProject, 1)[4].text, /point load/);
  assert.match(buildGeometryPreviewSvg(pointLoadProject, 1), /P1 point load|A1 point load/);
});

test("quick editor can patch selected phase and first soil layers together", () => {
  const edited = applyQuickEditorPatch(SAMPLE_PROJECT, 2, {
    surface_level_left_m: 0.6,
    surface_level_right_m: 0.2,
    excavation_level_left_m: -5.8,
    excavation_level_right_m: -0.6,
    groundwater_level_left_m: -2.6,
    groundwater_level_right_m: -1.9,
    surcharge_left_kPa: 6,
    surcharge_right_kPa: 24,
    left_friction_angle_deg: 31.5,
    left_subgrade_modulus_kN_m3: 24500,
    left_pore_pressure_offset_kPa: 3,
    left_bedding_model: "tri_linear",
    left_tri_linear_displacement_breakpoints_mm: [1, 3],
    left_tri_linear_stiffness_factors: [1, 0.4, 0.1],
    right_friction_angle_deg: 34.2,
    right_cohesion_kPa: 2.5,
    right_subgrade_modulus_kN_m3: 30000,
  });

  assert.equal(edited.phases[2].surface_level_left_m, 0.6);
  assert.equal(edited.phases[2].surface_level_right_m, 0.2);
  assert.equal(edited.phases[2].excavation_level_left_m, -5.8);
  assert.equal(edited.phases[2].excavation_level_right_m, -0.6);
  assert.equal(edited.phases[2].groundwater_level_left_m, -2.6);
  assert.equal(edited.phases[2].groundwater_level_right_m, -1.9);
  assert.equal(edited.phases[2].surcharge_left_kPa, 6);
  assert.equal(edited.phases[2].surcharge_right_kPa, 24);
  assert.equal(edited.soil_profiles.left.layers[0].friction_angle_deg, 31.5);
  assert.equal(edited.soil_profiles.left.layers[0].subgrade_modulus_kN_m3, 24500);
  assert.equal(edited.soil_profiles.left.layers[0].pore_pressure_offset_kPa, 3);
  assert.equal(edited.soil_profiles.left.layers[0].bedding_model, "tri_linear");
  assert.deepEqual(edited.soil_profiles.left.layers[0].tri_linear_displacement_breakpoints_mm, [1, 3]);
  assert.deepEqual(edited.soil_profiles.left.layers[0].tri_linear_stiffness_factors, [1, 0.4, 0.1]);
  assert.equal(edited.soil_profiles.right.layers[0].friction_angle_deg, 34.2);
  assert.equal(edited.soil_profiles.right.layers[0].cohesion_kPa, 2.5);
  assert.equal(edited.soil_profiles.right.layers[0].subgrade_modulus_kN_m3, 30000);
  assert.match(buildInputSnapshot(edited, 2)[2].text, /surface L\/R 0.6 \/ 0.2 m/);
  assert.match(buildInputSnapshot(edited, 2)[2].text, /excavation L\/R -5.8 \/ -0.6 m/);
  assert.match(buildInputSnapshot(edited, 2)[3].text, /L1: φ 31.5°/);
  assert.match(buildInputSnapshot(edited, 2)[3].text, /tri-linear 1.0\/3.0 mm/);
  assert.match(buildInputSnapshot(edited, 2)[3].text, /Δu 3.0 kPa/);
  assert.match(buildGeometryPreviewSvg(edited, 2), /Surface L\/R 0.6 \/ 0.2 m/);
  assert.match(buildGeometryPreviewSvg(edited, 2), /Left excavation -5.8 m/);
});

test("quick editor can patch support permanence across phases", () => {
  const phasedSupport = applyQuickEditorPatch(SAMPLE_PROJECT, 1, {
    support_active_from_phase: 3,
    support_active_to_phase: 3,
  });

  assert.equal(phasedSupport.supports[0].active_from_phase, 2);
  assert.equal(phasedSupport.supports[0].active_to_phase, 2);
  assert.match(buildInputSnapshot(phasedSupport, 1)[4].text, /first support phase window 3-3/);
  assert.match(buildGeometryPreviewSvg(phasedSupport, 1), /Supports none in this phase/);
  assert.match(buildGeometryPreviewSvg(phasedSupport, 2), /A1 anchor/);
});
