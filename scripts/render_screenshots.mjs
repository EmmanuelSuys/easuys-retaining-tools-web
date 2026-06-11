import { execFile as execFileCallback } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

import {
  SAMPLE_CONTACT_STATE,
  SAMPLE_PROJECT,
  SAMPLE_RESULT,
  buildContactPanelHtml,
  buildGeometryPreviewSvg,
  buildInputSnapshot,
  buildPhaseOptions,
  buildProjectPhaseOptions,
  buildQuickEditorHtml,
  buildReportPreviewHtml,
  buildResultHtml,
  formatJson,
} from "../app.js";

const execFile = promisify(execFileCallback);

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const stylesPath = path.join(repoRoot, "styles.css");
const outputDir = path.join(repoRoot, "docs", "screenshots");
const tempDir = await mkdtemp(path.join(tmpdir(), "retaining-screenshots-"));
const screenshotPhaseIndex = 2;
const baseStyles = (await readFile(stylesPath, "utf8")).replace(/^@import[^\n]+\n+/, "");

function buildSelectHtml(options, selectedIndex) {
  return `
    <select class="phase-select">
      ${options.map((option) => `<option value="${option.index}" ${option.index === selectedIndex ? "selected" : ""}>${option.label}</option>`).join("")}
    </select>
  `;
}

function buildSnapshotGridHtml(project, phaseIndex) {
  return `
    <div class="snapshot-grid">
      ${buildInputSnapshot(project, phaseIndex).map((card) => `
        <article class="snapshot-card">
          <strong>${card.title}</strong>
          <p>${card.text}</p>
        </article>
      `).join("")}
    </div>
  `;
}

function buildShellHtml(title, workspaceClass, bodyContent) {
  return [
    "<!doctype html>",
    '<html lang="en">',
    "<head>",
    '  <meta charset="utf-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1">',
    `  <title>${title}</title>`,
    "  <style>",
    baseStyles,
    "  .screenshot-shell { width: min(1280px, calc(100vw - 1.5rem)); margin: 0 auto; padding: 1rem 0 1.5rem; }",
    "  .screenshot-workspace { grid-template-columns: 1fr; }",
    "  .screenshot-shell .project-input { min-height: 22rem; height: 22rem; }",
    "  .screenshot-shell .panel { break-inside: avoid; }",
    "  .screenshot-banner { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1rem; padding: 1rem 1.2rem; border: 1px solid var(--line); border-radius: 1.25rem; background: rgba(255, 251, 243, 0.88); box-shadow: var(--shadow); }",
    "  .screenshot-banner p { margin: 0; color: var(--muted); }",
    "  .screenshot-banner strong { display: block; margin-bottom: 0.2rem; font-size: 1.05rem; }",
    "  .screenshot-tag { padding: 0.5rem 0.85rem; border-radius: 999px; background: var(--accent-soft); color: var(--accent-deep); font-family: \"IBM Plex Mono\", monospace; font-size: 0.78rem; letter-spacing: 0.08em; text-transform: uppercase; }",
    "  .screenshot-workspace-results .result-shell, .screenshot-workspace-contact .report-shell, .screenshot-workspace-contact .contact-shell { margin-top: 0.85rem; }",
    "  .screenshot-workspace-results .result-status, .screenshot-workspace-contact .result-status { margin-top: 0.8rem; }",
    "  .screenshot-workspace-contact .export-actions .secondary-button { opacity: 1; }",
    "  .screenshot-workspace-preview .snapshot-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }",
    "  @media (max-width: 760px) { .screenshot-shell { width: min(100vw - 0.75rem, 1280px); } .screenshot-banner { display: grid; } .screenshot-workspace-preview .snapshot-grid { grid-template-columns: 1fr; } }",
    "  </style>",
    "</head>",
    "<body>",
    '  <div class="screenshot-shell">',
    '    <header class="screenshot-banner">',
    "      <div>",
    `        <strong>${title}</strong>`,
    "        <p>Deterministic retaining workspace snapshot rendered from shipped frontend helpers.</p>",
    "      </div>",
    '      <span class="screenshot-tag">retaining.easuys.com</span>',
    "    </header>",
    `    <main class="workspace screenshot-workspace ${workspaceClass}">`,
    bodyContent,
    "    </main>",
    "  </div>",
    "</body>",
    "</html>",
  ].join("\n");
}

function buildProjectEditorPage() {
  return buildShellHtml(
    "Project editor",
    "screenshot-workspace-editor",
    `
      <section class="panel editor-panel">
        <div class="panel-heading">
          <div>
            <p class="panel-kicker">Project Editor</p>
            <h2>Retaining project payload</h2>
          </div>
          <button class="action-button" type="button">Run Analysis</button>
        </div>
        <p class="panel-note">Quick editor plus canonical JSON payload for the selected construction phase.</p>
        <div class="quick-editor-shell">${buildQuickEditorHtml(SAMPLE_PROJECT, screenshotPhaseIndex)}</div>
        <textarea class="project-input" spellcheck="false">${formatJson(SAMPLE_PROJECT)}</textarea>
      </section>
    `
  );
}

function buildLiveGeometryPage() {
  return buildShellHtml(
    "Live geometry view",
    "screenshot-workspace-preview",
    `
      <section class="panel preview-panel">
        <div class="panel-heading">
          <div>
            <p class="panel-kicker">Live Input Visualization</p>
            <h2>Wall, soils, excavation, groundwater, supports</h2>
          </div>
          ${buildSelectHtml(buildProjectPhaseOptions(SAMPLE_PROJECT), screenshotPhaseIndex)}
        </div>
        <div class="geometry-shell">${buildGeometryPreviewSvg(SAMPLE_PROJECT, screenshotPhaseIndex)}</div>
        ${buildSnapshotGridHtml(SAMPLE_PROJECT, screenshotPhaseIndex)}
      </section>
    `
  );
}

function buildResultsPage() {
  return buildShellHtml(
    "Results workspace",
    "screenshot-workspace-results",
    `
      <section class="panel result-panel">
        <div class="panel-heading">
          <div>
            <p class="panel-kicker">Results Workspace</p>
            <h2>Phase response</h2>
          </div>
          ${buildSelectHtml(buildPhaseOptions(SAMPLE_RESULT), screenshotPhaseIndex)}
        </div>
        <div class="result-status">Sample backend response loaded.</div>
        <div class="export-actions">
          <button type="button" class="secondary-button">Download JSON</button>
          <button type="button" class="secondary-button">Download HTML report</button>
          <button type="button" class="secondary-button">Print report</button>
        </div>
        <div class="result-shell">${buildResultHtml(SAMPLE_RESULT, screenshotPhaseIndex)}</div>
      </section>
    `
  );
}

function buildContactReportPage() {
  return buildShellHtml(
    "Contact and report flow",
    "screenshot-workspace-contact",
    `
      <section class="panel result-panel">
        <div class="panel-heading">
          <div>
            <p class="panel-kicker">Export / Contact</p>
            <h2>HTML report and study request</h2>
          </div>
          ${buildSelectHtml(buildPhaseOptions(SAMPLE_RESULT), screenshotPhaseIndex)}
        </div>
        <div class="result-status">Report preview staged from sampled retaining result.</div>
        <div class="export-actions">
          <button type="button" class="secondary-button">Download JSON</button>
          <button type="button" class="secondary-button">Download HTML report</button>
          <button type="button" class="secondary-button">Print report</button>
        </div>
        <div class="report-shell">${buildReportPreviewHtml(SAMPLE_PROJECT, SAMPLE_RESULT, screenshotPhaseIndex)}</div>
        <div class="contact-shell">${buildContactPanelHtml(SAMPLE_CONTACT_STATE, SAMPLE_RESULT, screenshotPhaseIndex, "Turnstile placeholder for screenshot generation.")}</div>
      </section>
    `
  );
}

async function renderScreenshot(htmlName, htmlContent, width, outputName) {
  const htmlPath = path.join(tempDir, htmlName);
  const outputPath = path.join(outputDir, outputName);
  await writeFile(htmlPath, htmlContent, "utf8");
  await execFile("wkhtmltoimage", [
    "--format",
    "png",
    "--encoding",
    "utf-8",
    "--width",
    String(width),
    htmlPath,
    outputPath,
  ]);
}

await mkdir(outputDir, { recursive: true });

const pageBuilders = [
  { prefix: "project-editor", html: buildProjectEditorPage() },
  { prefix: "live-geometry", html: buildLiveGeometryPage() },
  { prefix: "results-workspace", html: buildResultsPage() },
  { prefix: "contact-report", html: buildContactReportPage() },
];

try {
  for (const page of pageBuilders) {
    await renderScreenshot(`${page.prefix}.desktop.html`, page.html, 1440, `${page.prefix}-desktop.png`);
    await renderScreenshot(`${page.prefix}.mobile.html`, page.html, 430, `${page.prefix}-mobile.png`);
  }
} finally {
  await rm(tempDir, { recursive: true, force: true });
}

for (const page of pageBuilders) {
  console.log(`Rendered ${page.prefix}-desktop.png and ${page.prefix}-mobile.png`);
}
