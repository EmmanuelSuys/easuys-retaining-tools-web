export const API_BASE_URL = "https://easuys-retaining-tools-api.yellow-violet-f185.workers.dev";
export const ANALYSIS_ROUTE = "/calculate/retaining/flexible-wall-analysis";
export const CONTACT_ENDPOINT = "/lead/study-request";
export const TURNSTILE_SITE_KEY = "0x4AAAAAADYeVJCZgqihubKs";
export const TURNSTILE_SCRIPT_URL = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const APP_STATE_STORAGE_KEY = "ea-suys-retaining-contact";
export const STEEL_SHEET_PILE_LIBRARY = {
    AZ_18: {
        label: "AZ 18",
        plastic_section_modulus_cm3_per_m: 1183,
        shear_area_cm2_per_m: 13.7,
    },
    AZ_26: {
        label: "AZ 26",
        plastic_section_modulus_cm3_per_m: 1650,
        shear_area_cm2_per_m: 17.8,
    },
    GU_22N: {
        label: "GU 22N",
        plastic_section_modulus_cm3_per_m: 960,
        shear_area_cm2_per_m: 12.8,
    },
};
export const SAMPLE_PROJECT = {
    design_mode: "classic",
    wall_type: "steel_sheet_pile",
    wall_geometry: {
        top_level_m: 0,
        toe_level_m: -9,
        inclination_degrees: 4,
        segments: [
            {
                label: "AZ 18 sample",
                top_level_m: 0,
                bottom_level_m: -9,
                ei_kNm2_per_m: 52000,
                steel_section: {
                    library_section_id: "AZ_18",
                    steel_grade_mpa: 355,
                    gamma_m0: 1,
                },
            },
        ],
    },
    phases: [
        {
            name: "Initial at-rest state",
            excavation_level_left_m: 0,
            excavation_level_right_m: 0,
            groundwater_level_left_m: -2,
            groundwater_level_right_m: -2,
            surcharge_left_kPa: 0,
            surcharge_right_kPa: 12,
        },
        {
            name: "Excavate left side to -4.0 m",
            excavation_level_left_m: -4,
            excavation_level_right_m: 0,
            groundwater_level_left_m: -2,
            groundwater_level_right_m: -2,
            surcharge_left_kPa: 0,
            surcharge_right_kPa: 18,
            vertical_line_load_kN_per_m: 35,
            include_vertical_line_second_order: true,
        },
        {
            name: "Deepen excavation to -5.0 m",
            excavation_level_left_m: -5,
            excavation_level_right_m: 0,
            groundwater_level_left_m: -2,
            groundwater_level_right_m: -2,
            surcharge_left_kPa: 0,
            surcharge_right_kPa: 18,
            vertical_line_load_kN_per_m: 35,
            include_vertical_line_second_order: true,
        },
    ],
    soil_profiles: {
        left: {
            layers: [
                {
                    top_level_m: 0,
                    bottom_level_m: -12,
                    unit_weight_dry_kN_m3: 17,
                    unit_weight_wet_kN_m3: 20,
                    friction_angle_deg: 30,
                    cohesion_kPa: 0,
                    subgrade_modulus_kN_m3: 22000,
                },
            ],
        },
        right: {
            layers: [
                {
                    top_level_m: 0,
                    bottom_level_m: -12,
                    unit_weight_dry_kN_m3: 18,
                    unit_weight_wet_kN_m3: 20,
                    friction_angle_deg: 33,
                    cohesion_kPa: 0,
                    subgrade_modulus_kN_m3: 28000,
                },
            ],
        },
    },
    supports: [
        {
            id: "A1",
            type: "anchor",
            depth_m: 1.6,
            side: "right",
            inclination_degrees: 15,
            stiffness_kN_per_m: 9000,
            prestress_kN_per_m: 55,
            capacity_kN_per_m: 150,
            active_from_phase: 1,
        },
    ],
    design_options: {
        target_element_length_m: 0.5,
        max_wall_displacement_mm: 30,
    },
};
export const SAMPLE_RESULT = {
    formula_version: "retaining-ts-sample-v1",
    discretization: {
        node_levels_m: [0, -2, -4, -6, -8, -9.5],
        element_lengths_m: [2, 2, 2, 2, 1.5],
    },
    governing: {
        max_abs_displacement_mm: 16.4,
        max_abs_displacement_phase: "Deepen excavation to -5.0 m",
        max_displacement_mm: 16.4,
        max_displacement_phase: "Deepen excavation to -5.0 m",
        min_displacement_mm: -1.1,
        min_displacement_phase: "Deepen excavation to -5.0 m",
        max_abs_rotation_mrad: 4.0,
        max_abs_rotation_phase: "Deepen excavation to -5.0 m",
        max_rotation_mrad: 4.0,
        max_rotation_phase: "Deepen excavation to -5.0 m",
        min_rotation_mrad: 0,
        min_rotation_phase: "Deepen excavation to -5.0 m",
        max_abs_moment_kNm_per_m: 182.5,
        max_abs_moment_phase: "Deepen excavation to -5.0 m",
        max_moment_kNm_per_m: 182.5,
        max_moment_phase: "Deepen excavation to -5.0 m",
        min_moment_kNm_per_m: -18,
        min_moment_phase: "Deepen excavation to -5.0 m",
        max_abs_shear_kN_per_m: 102.3,
        max_abs_shear_phase: "Deepen excavation to -5.0 m",
        max_shear_kN_per_m: 102.3,
        max_shear_phase: "Deepen excavation to -5.0 m",
        min_shear_kN_per_m: -12,
        min_shear_phase: "Deepen excavation to -5.0 m",
    },
    search_evaluation: {
        selected_toe_level_m: -9.5,
        trial_count: 4,
        stop_reason: "criterion_met",
        start_toe_level_m: -8,
        minimum_toe_level_m: -10,
        step_m: 0.5,
        max_head_displacement_mm: 0.18,
        achieved_max_head_displacement_mm: 0.179,
    },
    design_checks: {
        overall_pass: true,
        serviceability: {
            assessed: true,
            max_abs_displacement_mm: 16.4,
            limit_mm: 30,
            pass: true,
        },
        wall: {
            wall_type: "steel_sheet_pile",
            governing_check: "bending",
            bending_utilization: 0.74,
            bending_demand_kNm_per_m: 182.5,
            bending_capacity_kNm_per_m: 246.622,
            bending_governing_phase: "Deepen excavation to -5.0 m",
            bending_governing_level_m: -4,
            shear_utilization: 0.41,
            shear_demand_kN_per_m: 102.3,
            shear_capacity_kN_per_m: 249.512,
            shear_governing_phase: "Deepen excavation to -5.0 m",
            shear_governing_level_m: -4,
            governing_level_m: -4,
            cracked_stiffness_state: "not_applicable",
            governing_phase: "Deepen excavation to -5.0 m",
            pass: true,
        },
        supports: [
            {
                support_id: "A1",
                support_type: "anchor",
                governing_phase: "Deepen excavation to -5.0 m",
                demand_kN_per_m: 91.4,
                capacity_kN_per_m: 144.889,
                axial_demand_kN_per_m: 94.624,
                axial_capacity_kN_per_m: 150,
                utilization_ratio: 0.631,
                pass: true,
            },
        ],
    },
    warnings: [
        "Benchmark-backed validation remains pending until the named reference source files are available locally.",
    ],
    assumptions: [
        "Sample retaining result for frontend rendering and screenshot generation.",
        "Plots are rendered directly from backend visualization arrays when available.",
    ],
    source_refs: [
        "EA Suys retaining flexible wall analysis sample payload",
        "plan.md screenshot acceptance workflow",
    ],
    phases: [
        {
            name: "Initial at-rest state",
            phase_index: 0,
            converged: true,
            iterations: 1,
            envelope: {
                max_abs_displacement_mm: 3.6,
                max_abs_moment_kNm_per_m: 52.0,
                max_abs_shear_kN_per_m: 31.0,
                max_abs_plastic_offset_mm: 1.8,
            },
            support_reactions: [
                { id: "A1", type: "anchor", side: "right", depth_m: 1.6, reaction_kN_per_m: 0, branch_state: "inactive" },
            ],
            sampled_results: [
                { level_m: 0, depth_m: 0, rotation_mrad: 0, branch_state: "neutral/neutral", left_branch: "neutral", right_branch: "neutral", displacement_mm: 0, moment_kNm_per_m: 0, shear_kN_per_m: 8, net_soil_pressure_kPa: 0, water_pressure_kPa: 0 },
                { level_m: -2, depth_m: 2, rotation_mrad: 0.8, branch_state: "neutral/active", left_branch: "neutral", right_branch: "active", displacement_mm: 2.1, moment_kNm_per_m: 38, shear_kN_per_m: 25, net_soil_pressure_kPa: 6, water_pressure_kPa: 0 },
                { level_m: -4, depth_m: 4, rotation_mrad: 1.2, branch_state: "active/passive", left_branch: "active", right_branch: "passive", displacement_mm: 3.6, moment_kNm_per_m: 52, shear_kN_per_m: 31, net_soil_pressure_kPa: -4, water_pressure_kPa: 0 },
                { level_m: -6, depth_m: 6, rotation_mrad: 0.9, branch_state: "passive/passive", left_branch: "passive", right_branch: "passive", displacement_mm: 2.8, moment_kNm_per_m: 34, shear_kN_per_m: 18, net_soil_pressure_kPa: -10, water_pressure_kPa: 0 },
                { level_m: -8, depth_m: 8, rotation_mrad: 0.3, branch_state: "passive/passive", left_branch: "passive", right_branch: "passive", displacement_mm: 1.0, moment_kNm_per_m: 12, shear_kN_per_m: 7, net_soil_pressure_kPa: -6, water_pressure_kPa: 0 },
                { level_m: -9.5, depth_m: 9.5, rotation_mrad: 0.1, branch_state: "passive/passive", left_branch: "passive", right_branch: "passive", displacement_mm: -0.2, moment_kNm_per_m: -6, shear_kN_per_m: -4, net_soil_pressure_kPa: -2, water_pressure_kPa: 0 },
            ],
        },
        {
            name: "Excavate left side to -4.0 m",
            phase_index: 1,
            converged: true,
            iterations: 6,
            envelope: {
                max_abs_displacement_mm: 12.2,
                max_abs_moment_kNm_per_m: 144.8,
                max_abs_shear_kN_per_m: 89.2,
                max_abs_plastic_offset_mm: 6.4,
            },
            normalized_vertical_line_load_kN_per_m: 35,
            support_reactions: [
                { id: "A1", type: "anchor", side: "right", depth_m: 1.6, reaction_kN_per_m: 65.1, axial_force_kN_per_m: 67.396, utilization_ratio: 0.449, branch_state: "elastic" },
            ],
            sampled_results: [
                { level_m: 0, depth_m: 0, rotation_mrad: 0, branch_state: "neutral/neutral", left_branch: "neutral", right_branch: "neutral", displacement_mm: 0, moment_kNm_per_m: 12, shear_kN_per_m: 34, net_soil_pressure_kPa: 1, water_pressure_kPa: 0 },
                { level_m: -2, depth_m: 2, rotation_mrad: 2.1, branch_state: "active/neutral", left_branch: "active", right_branch: "neutral", displacement_mm: 7.4, moment_kNm_per_m: 108, shear_kN_per_m: 74, net_soil_pressure_kPa: -12, water_pressure_kPa: 4 },
                { level_m: -4, depth_m: 4, rotation_mrad: 3.6, branch_state: "active/passive", left_branch: "active", right_branch: "passive", displacement_mm: 14.0, moment_kNm_per_m: 144.8, shear_kN_per_m: 89.2, net_soil_pressure_kPa: -24, water_pressure_kPa: 12 },
                { level_m: -6, depth_m: 6, rotation_mrad: 2.9, branch_state: "passive/passive", left_branch: "passive", right_branch: "passive", displacement_mm: 11.3, moment_kNm_per_m: 118, shear_kN_per_m: 60, net_soil_pressure_kPa: -18, water_pressure_kPa: 18 },
                { level_m: -8, depth_m: 8, rotation_mrad: 1.5, branch_state: "passive/passive", left_branch: "passive", right_branch: "passive", displacement_mm: 7.0, moment_kNm_per_m: 48, shear_kN_per_m: 20, net_soil_pressure_kPa: -6, water_pressure_kPa: 22 },
                { level_m: -9.5, depth_m: 9.5, rotation_mrad: 0.5, branch_state: "passive/passive", left_branch: "passive", right_branch: "passive", displacement_mm: -0.7, moment_kNm_per_m: -14, shear_kN_per_m: -10, net_soil_pressure_kPa: 5, water_pressure_kPa: 26 },
            ],
        },
        {
            name: "Deepen excavation to -5.0 m",
            phase_index: 2,
            converged: true,
            iterations: 5,
            envelope: {
                max_abs_displacement_mm: 16.4,
                max_abs_moment_kNm_per_m: 182.5,
                max_abs_shear_kN_per_m: 102.3,
                max_abs_plastic_offset_mm: 9.1,
            },
            normalized_vertical_line_load_kN_per_m: 35,
            support_reactions: [
                { id: "A1", type: "anchor", side: "right", depth_m: 1.6, reaction_kN_per_m: 91.4, axial_force_kN_per_m: 94.624, utilization_ratio: 0.631, branch_state: "elastic" },
            ],
            sampled_results: [
                { level_m: 0, depth_m: 0, rotation_mrad: 0, branch_state: "neutral/neutral", left_branch: "neutral", right_branch: "neutral", displacement_mm: 0, moment_kNm_per_m: 18, shear_kN_per_m: 38, net_soil_pressure_kPa: 3, water_pressure_kPa: 0 },
                { level_m: -2, depth_m: 2, rotation_mrad: 2.5, branch_state: "active/neutral", left_branch: "active", right_branch: "neutral", displacement_mm: 9.2, moment_kNm_per_m: 132, shear_kN_per_m: 88, net_soil_pressure_kPa: -10, water_pressure_kPa: 5 },
                { level_m: -4, depth_m: 4, rotation_mrad: 4.0, branch_state: "active/passive", left_branch: "active", right_branch: "passive", displacement_mm: 16.4, moment_kNm_per_m: 182.5, shear_kN_per_m: 102.3, net_soil_pressure_kPa: -28, water_pressure_kPa: 14 },
                { level_m: -6, depth_m: 6, rotation_mrad: 3.1, branch_state: "passive/passive", left_branch: "passive", right_branch: "passive", displacement_mm: 13.7, moment_kNm_per_m: 146, shear_kN_per_m: 72, net_soil_pressure_kPa: -20, water_pressure_kPa: 20 },
                { level_m: -8, depth_m: 8, rotation_mrad: 1.8, branch_state: "passive/passive", left_branch: "passive", right_branch: "passive", displacement_mm: 8.4, moment_kNm_per_m: 64, shear_kN_per_m: 28, net_soil_pressure_kPa: -8, water_pressure_kPa: 24 },
                { level_m: -9.5, depth_m: 9.5, rotation_mrad: 0.6, branch_state: "passive/passive", left_branch: "passive", right_branch: "passive", displacement_mm: -1.1, moment_kNm_per_m: -18, shear_kN_per_m: -12, net_soil_pressure_kPa: 6, water_pressure_kPa: 28 },
            ],
        },
    ],
};
SAMPLE_RESULT.normalized_input = structuredClone(SAMPLE_PROJECT);
SAMPLE_RESULT.visualization = {
    phases: SAMPLE_RESULT.phases.map((phase, phaseIndex) => ({
        name: phase.name,
        phase_index: phase.phase_index ?? phaseIndex,
        converged: phase.converged ?? true,
        iterations: phase.iterations ?? 0,
        levels_m: phase.sampled_results.map((item) => item.level_m),
        displacement_mm: phase.sampled_results.map((item) => item.displacement_mm),
        rotation_mrad: phase.sampled_results.map((item) => item.rotation_mrad),
        moment_kNm_per_m: phase.sampled_results.map((item) => item.moment_kNm_per_m),
        shear_kN_per_m: phase.sampled_results.map((item) => item.shear_kN_per_m),
        net_soil_pressure_kPa: phase.sampled_results.map((item) => item.net_soil_pressure_kPa),
        water_pressure_kPa: phase.sampled_results.map((item) => item.water_pressure_kPa),
        branch_state: phase.sampled_results.map((item) => item.branch_state),
        left_branch: phase.sampled_results.map((item) => item.left_branch ?? String(item.branch_state ?? "").split("/")[0] ?? "n/a"),
        right_branch: phase.sampled_results.map((item) => item.right_branch ?? String(item.branch_state ?? "").split("/")[1] ?? "n/a"),
    })),
};
export const SAMPLE_CONTACT_STATE = {
    projectName: "Basement wall study",
    email: "engineer@example.com",
    message: "Please review the staged excavation response and advise on anchor reserve.",
    consent: true,
};
let turnstileScriptPromise = null;
export function resetTurnstileLoaderForTests() {
    turnstileScriptPromise = null;
}
export function formatNumber(value, digits = 2) {
    return Number.isFinite(value) ? value.toFixed(digits) : "0.00";
}
function numberOrUndefined(value) {
    if (value === undefined || value === null || value === "") {
        return undefined;
    }
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric : undefined;
}
export function formatJson(value) {
    return JSON.stringify(value, null, 2);
}
function optionalNumberLabel(value, digits = 2, prefix = "", suffix = "") {
    if (value === undefined || value === null || !Number.isFinite(value)) {
        return "";
    }
    return `${prefix}${formatNumber(value, digits)}${suffix}`;
}
function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}
function normalizeFileSlug(value) {
    return value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") || "retaining-analysis";
}
export function buildPlotPath(levels, values, width = 360, height = 180) {
    if (!levels.length || !values.length || levels.length !== values.length) {
        return "";
    }
    const minLevel = Math.min(...levels);
    const maxLevel = Math.max(...levels);
    const maxAbsValue = Math.max(1e-9, ...values.map((value) => Math.abs(value)));
    return values.map((value, index) => {
        const x = ((value + maxAbsValue) / (2 * maxAbsValue)) * width;
        const y = ((maxLevel - levels[index]) / Math.max(1e-9, maxLevel - minLevel)) * height;
        return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    }).join(" ");
}
function visualizationPhaseForResult(result, phaseIndex) {
    const phases = result?.visualization?.phases;
    const phase = result?.phases?.[phaseIndex];
    if (!Array.isArray(phases) || !phase) {
        return null;
    }
    const targetPhaseIndex = phase?.phase_index ?? phaseIndex;
    return (phases.find((item) => item?.phase_index === targetPhaseIndex) ??
        phases.find((item) => item?.name === phase.name) ??
        phases[phaseIndex] ??
        null);
}
function isPlotArray(value, expectedLength) {
    return Array.isArray(value) && value.length === expectedLength;
}
function buildPhasePlotData(result, phaseIndex) {
    const phase = result?.phases?.[phaseIndex];
    const sampledResults = phase?.sampled_results ?? [];
    const sampled = {
        levels: sampledResults.map((item) => item.level_m),
        displacement: sampledResults.map((item) => item.displacement_mm),
        rotation: sampledResults.map((item) => item.rotation_mrad),
        moment: sampledResults.map((item) => item.moment_kNm_per_m),
        shear: sampledResults.map((item) => item.shear_kN_per_m),
        pressure: sampledResults.map((item) => item.net_soil_pressure_kPa),
        waterPressure: sampledResults.map((item) => item.water_pressure_kPa),
        branchState: sampledResults.map((item) => item.branch_state),
        source: "sampled_results",
    };
    const visualizationPhase = visualizationPhaseForResult(result, phaseIndex);
    const expectedLength = visualizationPhase?.levels_m?.length ?? 0;
    if (visualizationPhase &&
        expectedLength > 0 &&
        isPlotArray(visualizationPhase.displacement_mm, expectedLength) &&
        isPlotArray(visualizationPhase.rotation_mrad, expectedLength) &&
        isPlotArray(visualizationPhase.moment_kNm_per_m, expectedLength) &&
        isPlotArray(visualizationPhase.shear_kN_per_m, expectedLength) &&
        isPlotArray(visualizationPhase.net_soil_pressure_kPa, expectedLength) &&
        isPlotArray(visualizationPhase.water_pressure_kPa, expectedLength) &&
        isPlotArray(visualizationPhase.branch_state, expectedLength)) {
        return {
            levels: visualizationPhase.levels_m,
            displacement: visualizationPhase.displacement_mm,
            rotation: visualizationPhase.rotation_mrad,
            moment: visualizationPhase.moment_kNm_per_m,
            shear: visualizationPhase.shear_kN_per_m,
            pressure: visualizationPhase.net_soil_pressure_kPa,
            waterPressure: visualizationPhase.water_pressure_kPa,
            branchState: visualizationPhase.branch_state,
            source: "visualization",
        };
    }
    return sampled;
}
function plotSourceDescription(source, quantity) {
    if (source === "visualization") {
        return `Direct API visualization ${quantity}, without client-side mechanics.`;
    }
    return `Fallback ${quantity} from sampled results because visualization arrays were unavailable.`;
}
export function buildInputSnapshot(project, phaseIndex = 0) {
    const wallDepth = project.wall_geometry.top_level_m - project.wall_geometry.toe_level_m;
    const leftLayers = project.soil_profiles.left.layers.length;
    const rightLayers = project.soil_profiles.right.layers.length;
    const activeVerticalLoads = project.phases
        .map((phase) => phase.vertical_line_load_kN_per_m ?? 0)
        .filter((value) => Math.abs(value) > 1e-9);
    const primarySegment = project.wall_geometry.segments[0];
    const wallSection = buildWallSectionMetadata(project);
    const segmentStiffnessLabel = primarySegment
        ? `EI ${formatNumber(primarySegment.ei_kNm2_per_m, 0)} kNm2/m`
        : "";
    const segmentCrackedLabel = primarySegment?.cracked_ei_kNm2_per_m !== undefined
        ? ` · cracked EI ${formatNumber(primarySegment.cracked_ei_kNm2_per_m, 0)}`
        : "";
    const wallLengthSearch = wallLengthSearchForProject(project);
    const targetElementLengthM = targetElementLengthForProject(project);
    const maxWallDisplacementMm = project.design_options?.max_wall_displacement_mm;
    const supportTypes = [...new Set(project.supports.map((item) => supportTypeLabel(item.type)))];
    const phase = activePhaseForProject(project, phaseIndex);
    const leftLayer = firstSoilLayerForSide(project, "left");
    const rightLayer = firstSoilLayerForSide(project, "right");
    const firstSupport = project.supports[0];
    const firstSupportPhaseWindow = firstSupport
        ? `${(firstSupport.active_from_phase ?? 0) + 1}-${Number.isFinite(firstSupport.active_to_phase ?? Number.POSITIVE_INFINITY) ? (firstSupport.active_to_phase ?? 0) + 1 : "∞"}`
        : "n/a";
    return [
        {
            title: "Wall",
            text: `${project.wall_type.replaceAll("_", " ")} · ${formatNumber(wallDepth, 1)} m embedment · ${project.wall_geometry.segments.length} segment(s) · ${formatNumber(project.wall_geometry.inclination_degrees ?? 0, 1)}° from vertical${project.wall_type === "steel_sheet_pile" ? `${wallSection.value ? ` · ${wallSection.value}` : ""}${segmentStiffnessLabel ? ` · ${segmentStiffnessLabel}${segmentCrackedLabel}` : ""}` : `${wallSection.value ? ` · ${wallSection.value}` : ""}`}`,
        },
        {
            title: "Design mode",
            text: `${project.design_mode.toUpperCase()} · ${project.phases.length} phase(s) · target element length ${formatNumber(targetElementLengthM, 2)} m · max wall displacement (project limit) ${Number.isFinite(maxWallDisplacementMm) ? `${formatNumber(maxWallDisplacementMm, 2)} mm` : "not declared"}`,
        },
        {
            title: "Selected phase",
            text: `${phase.name} · surface L/R ${formatNumber(phase.surface_level_left_m ?? project.wall_geometry.top_level_m, 1)} / ${formatNumber(phase.surface_level_right_m ?? project.wall_geometry.top_level_m, 1)} m · excavation L/R ${formatNumber(phase.excavation_level_left_m, 1)} / ${formatNumber(phase.excavation_level_right_m, 1)} m · groundwater L/R ${formatNumber(phase.groundwater_level_left_m, 1)} / ${formatNumber(phase.groundwater_level_right_m, 1)} m · surcharge L/R ${formatNumber(phase.surcharge_left_kPa ?? 0, 1)} / ${formatNumber(phase.surcharge_right_kPa ?? 0, 1)} kPa`,
        },
        {
            title: "Soils",
            text: `${leftLayers} left layer(s), ${rightLayers} right layer(s) · ${buildSoilLayerSummary("L1", leftLayer)} · ${buildSoilLayerSummary("R1", rightLayer)}`,
        },
        {
            title: "Supports",
            text: `${project.supports.length} support item(s), ${project.supports.filter((item) => item.type === "anchor" || item.type === "strut" || item.type === "underwater_concrete_block").length} one-sided support(s) · types ${supportTypes.join(", ")} · first support phase window ${firstSupportPhaseWindow} · max inclination ${formatNumber(Math.max(0, ...project.supports.map((item) => item.inclination_degrees ?? 0)), 1)}°`,
        },
        {
            title: "Toe control",
            text: wallLengthSearch
                ? `Search from ${formatNumber(wallLengthSearch.start_toe_level_m, 1)} m to ${formatNumber(wallLengthSearch.minimum_toe_level_m, 1)} m in ${formatNumber(wallLengthSearch.step_m, 2)} m steps · target ${formatNumber(wallLengthSearch.max_head_displacement_mm ?? 60, 1)} mm`
                : `Fixed toe at ${formatNumber(project.wall_geometry.toe_level_m, 1)} m`,
        },
        {
            title: "Vertical wall load",
            text: activeVerticalLoads.length
                ? `${formatNumber(Math.max(...activeVerticalLoads), 1)} kN/m active in selected excavation phases with second-order option`
                : "No vertical wall line load defined",
        },
    ];
}
function buildSteelSectionLabel(section) {
    if (!section) {
        return "";
    }
    const libraryLabel = section.library_section_id
        ? STEEL_SHEET_PILE_LIBRARY[section.library_section_id]?.label
        : "";
    return section.section_name || libraryLabel || "manual section";
}
function buildWallSectionMetadata(project) {
    const segment = project.wall_geometry.segments[0];
    if (project.wall_type === "steel_sheet_pile") {
        return {
            label: "Steel section",
            value: buildSteelSectionLabel(segment?.steel_section) || "manual/direct input",
        };
    }
    const sectionParts = [
        segment?.label || "direct section input",
        segment?.ei_kNm2_per_m !== undefined ? `EI ${formatNumber(segment.ei_kNm2_per_m, 0)} kNm2/m` : "",
        segment?.cracked_ei_kNm2_per_m !== undefined
            ? `cracked EI ${formatNumber(segment.cracked_ei_kNm2_per_m, 0)} kNm2/m`
            : "",
        segment?.cracking_moment_kNm_per_m !== undefined
            ? `Mcr ${formatNumber(segment.cracking_moment_kNm_per_m, 0)} kNm/m`
            : "",
        segment?.moment_resistance_kNm_per_m !== undefined
            ? `Md ${formatNumber(segment.moment_resistance_kNm_per_m, 0)} kNm/m`
            : "",
        segment?.shear_resistance_kN_per_m !== undefined
            ? `Vd ${formatNumber(segment.shear_resistance_kN_per_m, 0)} kN/m`
            : "",
    ].filter(Boolean);
    return {
        label: "Diaphragm section",
        value: sectionParts.join(" · ") || "direct EI/cracked EI resistance input",
    };
}
function steelSectionForProject(project) {
    const segment = project.wall_geometry.segments[0];
    return segment?.steel_section || {};
}
function wallLengthSearchForProject(project) {
    return project.design_options?.wall_length_search;
}
function defaultSteelGammaM0(designMode) {
    return designMode === "ec7" ? 1.1 : 1;
}
function targetElementLengthForProject(project) {
    return project?.design_options?.target_element_length_m ?? 0.5;
}
function targetElementLengthForResult(result) {
    return result?.normalized_input?.design_options?.target_element_length_m ?? 0.5;
}
function isDisplayProjectCandidate(value) {
    return Boolean(value &&
        typeof value === "object" &&
        typeof value.wall_type === "string" &&
        typeof value.design_mode === "string" &&
        value.wall_geometry &&
        Array.isArray(value.wall_geometry.segments) &&
        Array.isArray(value.phases) &&
        value.soil_profiles?.left &&
        Array.isArray(value.soil_profiles.left.layers) &&
        value.soil_profiles?.right &&
        Array.isArray(value.soil_profiles.right.layers) &&
        Array.isArray(value.supports));
}
export function resolveAnalyzedProject(project, result) {
    return isDisplayProjectCandidate(result?.normalized_input)
        ? result.normalized_input
        : project;
}
function buildDiscretizationSummary(result) {
    const targetElementLengthM = targetElementLengthForResult(result);
    const nodeLevels = result?.discretization?.node_levels_m;
    const elementLengths = result?.discretization?.element_lengths_m;
    if (!Array.isArray(nodeLevels) || !Array.isArray(elementLengths) || !nodeLevels.length || !elementLengths.length) {
        return `Target element length ${formatNumber(targetElementLengthM, 2)} m · discretization metadata unavailable`;
    }
    const minElementLength = Math.min(...elementLengths);
    const maxElementLength = Math.max(...elementLengths);
    return `Target element length ${formatNumber(targetElementLengthM, 2)} m · ${nodeLevels.length} nodes · ${elementLengths.length} elements · element range ${formatNumber(minElementLength, 2)}-${formatNumber(maxElementLength, 2)} m`;
}
function buildDiscretizationRows(result) {
    const nodeLevels = result?.discretization?.node_levels_m;
    const elementLengths = result?.discretization?.element_lengths_m;
    if (!Array.isArray(nodeLevels) || !nodeLevels.length) {
        return `<tr><td colspan="3">No discretization metadata returned.</td></tr>`;
    }
    return nodeLevels.map((level, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${escapeHtml(formatNumber(level, 2))}</td>
      <td>${index < (elementLengths?.length ?? 0) ? `${escapeHtml(formatNumber(elementLengths[index], 2))} m` : "n/a"}</td>
    </tr>
  `).join("");
}
function supportTypeLabel(type) {
    return type.replaceAll("_", " ");
}
function firstSoilLayerForSide(project, side) {
    return project.soil_profiles[side].layers[0];
}
function buildSoilLayerSummary(sideLabel, layer) {
    if (!layer) {
        return `${sideLabel}: none`;
    }
    const overrides = [
        optionalNumberLabel(layer.at_rest_coefficient, 2, "K0 "),
        optionalNumberLabel(layer.active_coefficient, 2, "Ka "),
        optionalNumberLabel(layer.passive_coefficient, 2, "Kp "),
        optionalNumberLabel(layer.pore_pressure_offset_kPa, 1, "Δu ", " kPa"),
    ].filter(Boolean);
    const beddingSummary = layer.bedding_model === "tri_linear" &&
        layer.tri_linear_displacement_breakpoints_mm &&
        layer.tri_linear_stiffness_factors
        ? `tri-linear ${layer.tri_linear_displacement_breakpoints_mm.map((value) => formatNumber(value, 1)).join("/")} mm · k ${layer.tri_linear_stiffness_factors.map((value) => formatNumber(value, 2)).join("/")}`
        : "linear bedding";
    return [
        `${sideLabel}: φ ${formatNumber(layer.friction_angle_deg, 1)}°`,
        `c ${formatNumber(layer.cohesion_kPa ?? 0, 1)} kPa`,
        `γd ${formatNumber(layer.unit_weight_dry_kN_m3, 1)}`,
        `γw ${formatNumber(layer.unit_weight_wet_kN_m3, 1)}`,
        `ks ${formatNumber(layer.subgrade_modulus_kN_m3, 0)}`,
        beddingSummary,
        optionalNumberLabel(layer.wall_friction_deg, 1, "δ ", "°"),
        overrides.length ? overrides.join(", ") : "",
    ].filter(Boolean).join(" · ");
}
export function buildProjectPhaseOptions(project) {
    return project.phases.map((phase, index) => ({
        index,
        label: `${index + 1}. ${phase.name}`,
    }));
}
export function buildPhaseOptions(result) {
    return result.phases.map((phase, index) => ({
        index,
        label: `${index + 1}. ${phase.name}`,
    }));
}
function clampIndex(value, length) {
    if (!length) {
        return 0;
    }
    const normalized = Number.isFinite(value) ? Math.round(value) : 0;
    return Math.max(0, Math.min(length - 1, normalized));
}
function normalizeEditorFocus(project, focus = {}) {
    return {
        segmentIndex: clampIndex(focus.segmentIndex, project.wall_geometry.segments.length),
        leftLayerIndex: clampIndex(focus.leftLayerIndex, project.soil_profiles.left.layers.length),
        rightLayerIndex: clampIndex(focus.rightLayerIndex, project.soil_profiles.right.layers.length),
        supportIndex: clampIndex(focus.supportIndex, project.supports.length),
    };
}
function midpointLevel(topLevelM, bottomLevelM) {
    return (topLevelM + bottomLevelM) / 2;
}
function nextSupportId(existingSupports, baseId = "S") {
    const existing = new Set(existingSupports.map((support) => support.id));
    let candidateIndex = existingSupports.length + 1;
    let candidate = `${baseId}${candidateIndex}`;
    while (existing.has(candidate)) {
        candidateIndex += 1;
        candidate = `${baseId}${candidateIndex}`;
    }
    return candidate;
}
function mapFiniteSupportWindow(support, phaseCount, transform) {
    const start = Math.max(0, Math.min(phaseCount - 1, support.active_from_phase ?? 0));
    const end = support.active_to_phase === undefined
        ? start
        : Math.max(start, Math.min(phaseCount - 1, support.active_to_phase));
    const mapped = new Set();
    for (let phaseIndex = start; phaseIndex <= end; phaseIndex += 1) {
        const transformed = transform(phaseIndex);
        if (transformed !== null) {
            mapped.add(transformed);
        }
    }
    return [...mapped].sort((left, right) => left - right);
}
function shiftSupportsForPhaseInsert(supports, selectedPhaseIndex, phaseCountBeforeInsert) {
    const insertIndex = selectedPhaseIndex + 1;
    for (const support of supports) {
        if (support.active_to_phase === undefined) {
            if ((support.active_from_phase ?? 0) > selectedPhaseIndex) {
                support.active_from_phase = (support.active_from_phase ?? 0) + 1;
            }
            continue;
        }
        const mapped = mapFiniteSupportWindow(support, phaseCountBeforeInsert, (phaseIndex) => {
            if (phaseIndex > selectedPhaseIndex) {
                return phaseIndex + 1;
            }
            if (phaseIndex === selectedPhaseIndex) {
                return phaseIndex;
            }
            return phaseIndex;
        });
        if (mapped.includes(selectedPhaseIndex)) {
            mapped.push(insertIndex);
        }
        const normalized = [...new Set(mapped)].sort((left, right) => left - right);
        support.active_from_phase = normalized[0];
        support.active_to_phase = normalized[normalized.length - 1];
    }
}
function shiftSupportsForPhaseRemoval(supports, removedPhaseIndex, phaseCountBeforeRemoval, phaseCountAfterRemoval) {
    const lastPhaseIndex = Math.max(0, phaseCountAfterRemoval - 1);
    for (const support of supports) {
        if (support.active_to_phase === undefined) {
            const start = support.active_from_phase ?? 0;
            if (start > removedPhaseIndex) {
                support.active_from_phase = start - 1;
            }
            else {
                support.active_from_phase = Math.min(start, lastPhaseIndex);
            }
            continue;
        }
        const mapped = mapFiniteSupportWindow(support, phaseCountBeforeRemoval, (phaseIndex) => {
            if (phaseIndex === removedPhaseIndex) {
                return null;
            }
            return phaseIndex > removedPhaseIndex ? phaseIndex - 1 : phaseIndex;
        });
        if (!mapped.length) {
            const survivorPhaseIndex = Math.min(removedPhaseIndex, lastPhaseIndex);
            support.active_from_phase = survivorPhaseIndex;
            support.active_to_phase = survivorPhaseIndex;
            continue;
        }
        support.active_from_phase = mapped[0];
        support.active_to_phase = mapped[mapped.length - 1];
    }
}
export function applyQuickEditorStructureAction(project, focus = {}, action, phaseIndex = 0) {
    const nextProject = structuredClone(project);
    const focusState = normalizeEditorFocus(nextProject, focus);
    if (action === "phase_duplicate") {
        const selectedPhaseIndex = Math.max(0, Math.min(nextProject.phases.length - 1, phaseIndex));
        const sourcePhase = nextProject.phases[selectedPhaseIndex];
        const duplicatedPhase = structuredClone(sourcePhase);
        duplicatedPhase.name = `${sourcePhase.name} copy`;
        const phaseCountBeforeInsert = nextProject.phases.length;
        nextProject.phases.splice(selectedPhaseIndex + 1, 0, duplicatedPhase);
        shiftSupportsForPhaseInsert(nextProject.supports, selectedPhaseIndex, phaseCountBeforeInsert);
        return {
            project: nextProject,
            focus: normalizeEditorFocus(nextProject, focusState),
            previewPhaseIndex: selectedPhaseIndex + 1,
        };
    }
    if (action === "phase_remove" && nextProject.phases.length > 1) {
        const removedPhaseIndex = Math.max(0, Math.min(nextProject.phases.length - 1, phaseIndex));
        const phaseCountBeforeRemoval = nextProject.phases.length;
        nextProject.phases.splice(removedPhaseIndex, 1);
        shiftSupportsForPhaseRemoval(nextProject.supports, removedPhaseIndex, phaseCountBeforeRemoval, nextProject.phases.length);
        return {
            project: nextProject,
            focus: normalizeEditorFocus(nextProject, focusState),
            previewPhaseIndex: Math.max(0, Math.min(removedPhaseIndex, nextProject.phases.length - 1)),
        };
    }
    if (action === "segment_split") {
        const segment = nextProject.wall_geometry.segments[focusState.segmentIndex];
        if (segment && Math.abs(segment.top_level_m - segment.bottom_level_m) > 1e-9) {
            const splitLevelM = midpointLevel(segment.top_level_m, segment.bottom_level_m);
            const upper = {
                ...structuredClone(segment),
                label: segment.label ? `${segment.label} upper` : `Segment ${focusState.segmentIndex + 1} upper`,
                bottom_level_m: splitLevelM,
            };
            const lower = {
                ...structuredClone(segment),
                label: segment.label ? `${segment.label} lower` : `Segment ${focusState.segmentIndex + 1} lower`,
                top_level_m: splitLevelM,
            };
            nextProject.wall_geometry.segments.splice(focusState.segmentIndex, 1, upper, lower);
            return {
                project: nextProject,
                focus: normalizeEditorFocus(nextProject, {
                    ...focusState,
                    segmentIndex: focusState.segmentIndex + 1,
                }),
                previewPhaseIndex: undefined,
            };
        }
    }
    if (action === "segment_remove" && nextProject.wall_geometry.segments.length > 1) {
        const removed = nextProject.wall_geometry.segments[focusState.segmentIndex];
        if (focusState.segmentIndex === 0) {
            nextProject.wall_geometry.segments[1].top_level_m = removed.top_level_m;
        }
        else {
            nextProject.wall_geometry.segments[focusState.segmentIndex - 1].bottom_level_m = removed.bottom_level_m;
        }
        nextProject.wall_geometry.segments.splice(focusState.segmentIndex, 1);
        nextProject.wall_geometry.top_level_m = nextProject.wall_geometry.segments[0].top_level_m;
        nextProject.wall_geometry.toe_level_m =
            nextProject.wall_geometry.segments[nextProject.wall_geometry.segments.length - 1].bottom_level_m;
        return {
            project: nextProject,
            focus: normalizeEditorFocus(nextProject, {
                ...focusState,
                segmentIndex: Math.max(0, focusState.segmentIndex - (focusState.segmentIndex === nextProject.wall_geometry.segments.length ? 1 : 0)),
            }),
            previewPhaseIndex: undefined,
        };
    }
    const splitLayer = (side) => {
        const layers = nextProject.soil_profiles[side].layers;
        const layerIndex = side === "left" ? focusState.leftLayerIndex : focusState.rightLayerIndex;
        const layer = layers[layerIndex];
        if (layer && Math.abs(layer.top_level_m - layer.bottom_level_m) > 1e-9) {
            const splitLevelM = midpointLevel(layer.top_level_m, layer.bottom_level_m);
            const upper = {
                ...structuredClone(layer),
                bottom_level_m: splitLevelM,
            };
            const lower = {
                ...structuredClone(layer),
                top_level_m: splitLevelM,
            };
            layers.splice(layerIndex, 1, upper, lower);
            return {
                project: nextProject,
                focus: normalizeEditorFocus(nextProject, side === "left"
                    ? { ...focusState, leftLayerIndex: layerIndex + 1 }
                    : { ...focusState, rightLayerIndex: layerIndex + 1 }),
                previewPhaseIndex: undefined,
            };
        }
        return null;
    };
    if (action === "left_layer_split") {
        return splitLayer("left") ?? { project: nextProject, focus: focusState };
    }
    if (action === "right_layer_split") {
        return splitLayer("right") ?? { project: nextProject, focus: focusState };
    }
    const removeLayer = (side) => {
        const layers = nextProject.soil_profiles[side].layers;
        const layerIndex = side === "left" ? focusState.leftLayerIndex : focusState.rightLayerIndex;
        if (layers.length <= 1) {
            return null;
        }
        const removed = layers[layerIndex];
        if (layerIndex === 0) {
            layers[1].top_level_m = removed.top_level_m;
        }
        else {
            layers[layerIndex - 1].bottom_level_m = removed.bottom_level_m;
        }
        layers.splice(layerIndex, 1);
        return {
            project: nextProject,
            focus: normalizeEditorFocus(nextProject, side === "left"
                ? { ...focusState, leftLayerIndex: Math.max(0, layerIndex - (layerIndex === layers.length ? 1 : 0)) }
                : { ...focusState, rightLayerIndex: Math.max(0, layerIndex - (layerIndex === layers.length ? 1 : 0)) }),
            previewPhaseIndex: undefined,
        };
    };
    if (action === "left_layer_remove") {
        return removeLayer("left") ?? { project: nextProject, focus: focusState };
    }
    if (action === "right_layer_remove") {
        return removeLayer("right") ?? { project: nextProject, focus: focusState };
    }
    if (action === "support_add") {
        const source = nextProject.supports[focusState.supportIndex] ?? {
            id: nextSupportId(nextProject.supports),
            type: "anchor",
            depth_m: 2,
            side: "right",
            stiffness_kN_per_m: 5000,
            active_from_phase: 0,
        };
        const clonedSupport = structuredClone(source);
        clonedSupport.id = nextSupportId(nextProject.supports, source.id.replace(/\d+$/, "") || "S");
        clonedSupport.depth_m = Number((clonedSupport.depth_m + 0.5).toFixed(2));
        nextProject.supports.splice(Math.min(focusState.supportIndex + 1, nextProject.supports.length), 0, clonedSupport);
        return {
            project: nextProject,
            focus: normalizeEditorFocus(nextProject, {
                ...focusState,
                supportIndex: Math.min(focusState.supportIndex + 1, nextProject.supports.length - 1),
            }),
            previewPhaseIndex: undefined,
        };
    }
    if (action === "support_remove" && nextProject.supports.length) {
        nextProject.supports.splice(focusState.supportIndex, 1);
        return {
            project: nextProject,
            focus: normalizeEditorFocus(nextProject, {
                ...focusState,
                supportIndex: Math.max(0, focusState.supportIndex - (focusState.supportIndex === nextProject.supports.length ? 1 : 0)),
            }),
            previewPhaseIndex: undefined,
        };
    }
    return {
        project: nextProject,
        focus: focusState,
        previewPhaseIndex: undefined,
    };
}
function activePhaseForProject(project, phaseIndex) {
    return project.phases[Math.max(0, Math.min(project.phases.length - 1, phaseIndex))];
}
export function buildGeometryPreviewSvg(project, phaseIndex = 0) {
    const phase = activePhaseForProject(project, phaseIndex);
    const wallTop = project.wall_geometry.top_level_m;
    const wallToe = project.wall_geometry.toe_level_m;
    const leftSurfaceLevel = phase.surface_level_left_m ?? wallTop;
    const rightSurfaceLevel = phase.surface_level_right_m ?? wallTop;
    const minLevel = Math.min(wallToe, ...project.soil_profiles.left.layers.map((layer) => layer.bottom_level_m), ...project.soil_profiles.right.layers.map((layer) => layer.bottom_level_m));
    const maxLevel = Math.max(wallTop, leftSurfaceLevel, rightSurfaceLevel);
    const width = 420;
    const height = 520;
    const topPad = 24;
    const bottomPad = 24;
    const leftSoilX = 46;
    const wallX = width / 2;
    const rightSoilX = width - 46;
    const soilWidth = 118;
    const inclinationTan = Math.tan(((project.wall_geometry.inclination_degrees ?? 0) * Math.PI) / 180);
    const wallBottomX = wallX + inclinationTan * (height - topPad - bottomPad) * 0.18;
    const scaleY = (levelM) => topPad + ((maxLevel - levelM) / Math.max(1e-9, maxLevel - minLevel)) * (height - topPad - bottomPad);
    const wallAxisX = (levelM) => {
        const y = scaleY(levelM);
        const normalized = (y - topPad) / Math.max(1e-9, height - topPad - bottomPad);
        return wallX + (wallBottomX - wallX) * normalized;
    };
    const leftSoils = project.soil_profiles.left.layers.map((layer, index) => {
        const yTop = scaleY(layer.top_level_m);
        const yBottom = scaleY(layer.bottom_level_m);
        return `<rect x="${leftSoilX}" y="${yTop.toFixed(1)}" width="${soilWidth}" height="${Math.max(2, yBottom - yTop).toFixed(1)}" rx="12" fill="${index % 2 === 0 ? "#d8c3aa" : "#c7b097"}"></rect>`;
    }).join("");
    const rightSoils = project.soil_profiles.right.layers.map((layer, index) => {
        const yTop = scaleY(layer.top_level_m);
        const yBottom = scaleY(layer.bottom_level_m);
        return `<rect x="${(rightSoilX - soilWidth).toFixed(1)}" y="${yTop.toFixed(1)}" width="${soilWidth}" height="${Math.max(2, yBottom - yTop).toFixed(1)}" rx="12" fill="${index % 2 === 0 ? "#ceb693" : "#b89d78"}"></rect>`;
    }).join("");
    const leftExcavationY = scaleY(phase.excavation_level_left_m);
    const rightExcavationY = scaleY(phase.excavation_level_right_m);
    const leftSurfaceY = scaleY(leftSurfaceLevel);
    const rightSurfaceY = scaleY(rightSurfaceLevel);
    const leftWaterY = scaleY(phase.groundwater_level_left_m);
    const rightWaterY = scaleY(phase.groundwater_level_right_m);
    const wallSegments = project.wall_geometry.segments.map((segment) => {
        const yTop = scaleY(segment.top_level_m);
        const yBottom = scaleY(segment.bottom_level_m);
        return `<line x1="${wallAxisX(segment.top_level_m).toFixed(1)}" y1="${yTop.toFixed(1)}" x2="${wallAxisX(segment.bottom_level_m).toFixed(1)}" y2="${yBottom.toFixed(1)}" stroke="#23495a" stroke-width="8" stroke-linecap="round"></line>`;
    }).join("");
    const activeSupports = project.supports.filter((support) => {
        const supportStartPhase = support.active_from_phase ?? 0;
        const supportEndPhase = support.active_to_phase ?? Number.POSITIVE_INFINITY;
        return phaseIndex >= supportStartPhase && phaseIndex <= supportEndPhase;
    });
    const supports = activeSupports
        .map((support) => {
        const y = scaleY(project.wall_geometry.top_level_m - support.depth_m);
        const supportWallX = wallAxisX(project.wall_geometry.top_level_m - support.depth_m);
        const supportSide = support.side ?? "right";
        const supportColor = supportSide === "left" ? "#8b5e00" : "#0b6e4f";
        const supportLabel = `${support.id} ${supportTypeLabel(support.type)}`;
        const angle = ((support.inclination_degrees ?? 0) * Math.PI) / 180;
        const length = 56;
        const dx = Math.cos(angle) * length * (supportSide === "left" ? -1 : 1);
        const dy = Math.sin(angle) * length;
        const targetX = supportSide === "left" ? Math.max(leftSoilX + 10, supportWallX + dx) : Math.min(rightSoilX - 10, supportWallX + dx);
        const targetY = y + dy;
        if (support.type === "anchor" || support.type === "strut") {
            return [
                `<line x1="${supportWallX.toFixed(1)}" y1="${y.toFixed(1)}" x2="${targetX.toFixed(1)}" y2="${targetY.toFixed(1)}" stroke="${supportColor}" stroke-width="4"></line>`,
                `<circle cx="${targetX.toFixed(1)}" cy="${targetY.toFixed(1)}" r="6" fill="${supportColor}"></circle>`,
                `<text x="${(targetX + (supportSide === "left" ? -12 : 12)).toFixed(1)}" y="${(targetY - 10).toFixed(1)}" font-size="11" font-weight="700" fill="${supportColor}" text-anchor="${supportSide === "left" ? "end" : "start"}">${escapeHtml(supportLabel)}</text>`,
            ].join("");
        }
        if (support.type === "spring") {
            return [
                `<line x1="${supportWallX.toFixed(1)}" y1="${y.toFixed(1)}" x2="${targetX.toFixed(1)}" y2="${y.toFixed(1)}" stroke="${supportColor}" stroke-width="3" stroke-dasharray="5 5"></line>`,
                `<rect x="${(targetX - 6).toFixed(1)}" y="${(y - 6).toFixed(1)}" width="12" height="12" fill="${supportColor}" rx="2"></rect>`,
                `<text x="${(targetX + (supportSide === "left" ? -12 : 12)).toFixed(1)}" y="${(y - 10).toFixed(1)}" font-size="11" font-weight="700" fill="${supportColor}" text-anchor="${supportSide === "left" ? "end" : "start"}">${escapeHtml(supportLabel)}</text>`,
            ].join("");
        }
        if (support.type === "underwater_concrete_block") {
            const blockWidth = 20;
            const blockHeight = 14;
            const blockX = supportSide === "left" ? targetX - blockWidth : targetX;
            return [
                `<line x1="${supportWallX.toFixed(1)}" y1="${y.toFixed(1)}" x2="${(supportSide === "left" ? targetX + 2 : targetX - 2).toFixed(1)}" y2="${y.toFixed(1)}" stroke="${supportColor}" stroke-width="4"></line>`,
                `<rect x="${blockX.toFixed(1)}" y="${(y - blockHeight / 2).toFixed(1)}" width="${blockWidth}" height="${blockHeight}" fill="${supportColor}" rx="2"></rect>`,
                `<line x1="${blockX.toFixed(1)}" y1="${(y + blockHeight / 2 + 3).toFixed(1)}" x2="${(blockX + blockWidth).toFixed(1)}" y2="${(y + blockHeight / 2 + 3).toFixed(1)}" stroke="${supportColor}" stroke-width="2"></line>`,
                `<text x="${(targetX + (supportSide === "left" ? -12 : 12)).toFixed(1)}" y="${(y - 12).toFixed(1)}" font-size="11" font-weight="700" fill="${supportColor}" text-anchor="${supportSide === "left" ? "end" : "start"}">${escapeHtml(supportLabel)}</text>`,
            ].join("");
        }
        if (support.type === "rigid" || support.type === "clamp") {
            const bracketDirection = supportSide === "left" ? -1 : 1;
            return [
                `<line x1="${supportWallX.toFixed(1)}" y1="${(y - 12).toFixed(1)}" x2="${supportWallX.toFixed(1)}" y2="${(y + 12).toFixed(1)}" stroke="${supportColor}" stroke-width="4"></line>`,
                `<line x1="${supportWallX.toFixed(1)}" y1="${(y - 12).toFixed(1)}" x2="${(supportWallX + bracketDirection * 14).toFixed(1)}" y2="${(y - 12).toFixed(1)}" stroke="${supportColor}" stroke-width="4"></line>`,
                `<line x1="${supportWallX.toFixed(1)}" y1="${(y + 12).toFixed(1)}" x2="${(supportWallX + bracketDirection * 14).toFixed(1)}" y2="${(y + 12).toFixed(1)}" stroke="${supportColor}" stroke-width="4"></line>`,
                support.type === "clamp"
                    ? `<line x1="${(supportWallX + bracketDirection * 7).toFixed(1)}" y1="${(y - 12).toFixed(1)}" x2="${(supportWallX + bracketDirection * 7).toFixed(1)}" y2="${(y + 12).toFixed(1)}" stroke="${supportColor}" stroke-width="2"></line>`
                    : "",
                `<text x="${(supportWallX + bracketDirection * 18).toFixed(1)}" y="${(y - 16).toFixed(1)}" font-size="11" font-weight="700" fill="${supportColor}" text-anchor="${supportSide === "left" ? "end" : "start"}">${escapeHtml(supportLabel)}</text>`,
            ].join("");
        }
        if (support.type === "point_load") {
            const arrowStartX = supportSide === "left" ? supportWallX - 42 : supportWallX + 42;
            const arrowEndX = supportSide === "left" ? supportWallX - 6 : supportWallX + 6;
            const arrowHeadX = supportSide === "left" ? arrowEndX + 10 : arrowEndX - 10;
            return [
                `<line x1="${arrowStartX.toFixed(1)}" y1="${y.toFixed(1)}" x2="${arrowEndX.toFixed(1)}" y2="${y.toFixed(1)}" stroke="${supportColor}" stroke-width="4"></line>`,
                `<polygon points="${arrowEndX.toFixed(1)},${y.toFixed(1)} ${arrowHeadX.toFixed(1)},${(y - 7).toFixed(1)} ${arrowHeadX.toFixed(1)},${(y + 7).toFixed(1)}" fill="${supportColor}"></polygon>`,
                `<text x="${arrowStartX.toFixed(1)}" y="${(y - 10).toFixed(1)}" font-size="11" font-weight="700" fill="${supportColor}" text-anchor="${supportSide === "left" ? "start" : "end"}">${escapeHtml(`${supportLabel} ${formatNumber(support.force_kN_per_m ?? 0, 1)} kN/m`)}</text>`,
            ].join("");
        }
        if (support.type === "moment") {
            const radius = 18;
            const sweep = supportSide === "left" ? 0 : 1;
            const startX = supportWallX - radius;
            const endX = supportWallX + radius;
            const arrowHeadX = supportSide === "left" ? endX - 6 : startX + 6;
            return [
                `<path d="M ${startX.toFixed(1)} ${(y + 2).toFixed(1)} A ${radius} ${radius} 0 1 ${sweep} ${endX.toFixed(1)} ${(y + 2).toFixed(1)}" stroke="${supportColor}" stroke-width="3" fill="none"></path>`,
                `<polygon points="${(supportSide === "left" ? arrowHeadX + 8 : arrowHeadX - 8).toFixed(1)},${(y - 10).toFixed(1)} ${arrowHeadX.toFixed(1)},${(y - 2).toFixed(1)} ${(supportSide === "left" ? arrowHeadX + 10 : arrowHeadX - 10).toFixed(1)},${(y + 6).toFixed(1)}" fill="${supportColor}"></polygon>`,
                `<text x="${supportWallX.toFixed(1)}" y="${(y - 22).toFixed(1)}" font-size="11" font-weight="700" fill="${supportColor}" text-anchor="middle">${escapeHtml(`${supportLabel} ${formatNumber(support.moment_kNm_per_m ?? 0, 1)} kNm/m`)}</text>`,
            ].join("");
        }
        return "";
    }).join("");
    const legend = [
        `Phase ${phaseIndex + 1}: ${phase.name}`,
        `Left excavation ${formatNumber(phase.excavation_level_left_m, 1)} m`,
        `Right excavation ${formatNumber(phase.excavation_level_right_m, 1)} m`,
        `Surface L/R ${formatNumber(leftSurfaceLevel, 1)} / ${formatNumber(rightSurfaceLevel, 1)} m`,
        `Wall inclination ${formatNumber(project.wall_geometry.inclination_degrees ?? 0, 1)}°`,
        `Vertical wall load ${formatNumber(phase.vertical_line_load_kN_per_m ?? 0, 1)} kN/m${phase.include_vertical_line_second_order ? " · 2nd order on" : ""}`,
        activeSupports.length
            ? `Supports ${activeSupports.map((support) => `${support.id} ${supportTypeLabel(support.type)}`).join(", ")}`
            : "Supports none in this phase",
    ];
    return `
    <svg class="geometry-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Retaining wall geometry preview">
      <rect x="0" y="0" width="${width}" height="${height}" rx="24" fill="#fdfbf6"></rect>
      ${leftSoils}
      ${rightSoils}
      <rect x="${leftSoilX}" y="0" width="${soilWidth}" height="${leftExcavationY.toFixed(1)}" fill="#fdfbf6"></rect>
      <rect x="${(rightSoilX - soilWidth).toFixed(1)}" y="0" width="${soilWidth}" height="${rightExcavationY.toFixed(1)}" fill="#fdfbf6"></rect>
      <line x1="${leftSoilX}" y1="${leftSurfaceY.toFixed(1)}" x2="${wallAxisX(leftSurfaceLevel).toFixed(1)}" y2="${leftSurfaceY.toFixed(1)}" stroke="#7d5a36" stroke-width="2" stroke-dasharray="4 4"></line>
      <line x1="${wallAxisX(rightSurfaceLevel).toFixed(1)}" y1="${rightSurfaceY.toFixed(1)}" x2="${rightSoilX}" y2="${rightSurfaceY.toFixed(1)}" stroke="#7d5a36" stroke-width="2" stroke-dasharray="4 4"></line>
      <line x1="${leftSoilX}" y1="${leftWaterY.toFixed(1)}" x2="${(wallAxisX(phase.groundwater_level_left_m) - 10).toFixed(1)}" y2="${leftWaterY.toFixed(1)}" stroke="#2f8fda" stroke-width="2.5" stroke-dasharray="7 7"></line>
      <line x1="${(wallAxisX(phase.groundwater_level_right_m) + 10).toFixed(1)}" y1="${rightWaterY.toFixed(1)}" x2="${rightSoilX}" y2="${rightWaterY.toFixed(1)}" stroke="#2f8fda" stroke-width="2.5" stroke-dasharray="7 7"></line>
      <line x1="${leftSoilX}" y1="${leftExcavationY.toFixed(1)}" x2="${wallAxisX(phase.excavation_level_left_m).toFixed(1)}" y2="${leftExcavationY.toFixed(1)}" stroke="#9b6b43" stroke-width="3"></line>
      <line x1="${wallAxisX(phase.excavation_level_right_m).toFixed(1)}" y1="${rightExcavationY.toFixed(1)}" x2="${rightSoilX}" y2="${rightExcavationY.toFixed(1)}" stroke="#9b6b43" stroke-width="3"></line>
      ${wallSegments}
      ${supports}
      <text x="24" y="30" font-size="14" font-weight="700" fill="#182022">${escapeHtml(legend[0])}</text>
      <text x="24" y="50" font-size="12" fill="#596265">${escapeHtml(legend[1])}</text>
      <text x="24" y="68" font-size="12" fill="#596265">${escapeHtml(legend[2])}</text>
      <text x="24" y="86" font-size="12" fill="#596265">${escapeHtml(legend[3])}</text>
      <text x="24" y="104" font-size="12" fill="#596265">${escapeHtml(legend[4])}</text>
      <text x="24" y="122" font-size="12" fill="#596265">${escapeHtml(legend[5])}</text>
      <text x="24" y="140" font-size="12" fill="#596265">${escapeHtml(legend[6])}</text>
    </svg>
  `;
}
export function buildQuickEditorHtml(project, phaseIndex = 0, focus = {}) {
    const phase = activePhaseForProject(project, phaseIndex);
    const focusState = normalizeEditorFocus(project, focus);
    const wallLengthSearch = wallLengthSearchForProject(project);
    const gammaM0Default = defaultSteelGammaM0(project.design_mode);
    const toeControlMode = wallLengthSearch ? "search" : "fixed";
    const selectedSupport = project.supports[focusState.supportIndex];
    const leftLayer = project.soil_profiles.left.layers[focusState.leftLayerIndex];
    const rightLayer = project.soil_profiles.right.layers[focusState.rightLayerIndex];
    const selectedSegment = project.wall_geometry.segments[focusState.segmentIndex];
    const section = selectedSegment?.steel_section || {};
    const libraryOptions = Object.entries(STEEL_SHEET_PILE_LIBRARY).map(([id, item]) => `
    <option value="${escapeHtml(id)}" ${section.library_section_id === id ? "selected" : ""}>${escapeHtml(item.label)}</option>
  `).join("");
    const wallTypeSpecificSectionControls = project.wall_type === "steel_sheet_pile"
        ? `
      <label class="quick-editor-field"><span>Steel section</span><select data-qe-library><option value="" ${section.library_section_id ? "" : "selected"}>Manual / custom</option>${libraryOptions}</select></label>
      <label class="quick-editor-field"><span>Manual section name</span><input data-qe-section-name type="text" value="${escapeHtml(section.section_name ?? "")}"></label>
      <label class="quick-editor-field"><span>Manual Wpl</span><input data-qe-wpl type="number" step="1" value="${escapeHtml(section.plastic_section_modulus_cm3_per_m ?? "")}"></label>
      <label class="quick-editor-field"><span>Manual Av</span><input data-qe-av type="number" step="0.1" value="${escapeHtml(section.shear_area_cm2_per_m ?? "")}"></label>
      <label class="quick-editor-field"><span>Steel grade fy</span><input data-qe-fy type="number" step="1" value="${escapeHtml(section.steel_grade_mpa ?? 355)}"></label>
      <label class="quick-editor-field"><span>Gamma M0</span><input data-qe-gamma-m0 type="number" step="0.01" min="0.1" value="${escapeHtml(section.gamma_m0 ?? gammaM0Default)}"></label>
    `
        : `
      <p class="quick-editor-note">Diaphragm wall mode uses the direct EI, cracked EI, cracking moment, and direct moment/shear resistance fields above. Steel-library Wpl/Av/fy/gamma inputs are hidden in this mode.</p>
    `;
    const segmentOptions = project.wall_geometry.segments.length
        ? project.wall_geometry.segments.map((segment, index) => `
      <option value="${index}" ${index === focusState.segmentIndex ? "selected" : ""}>${escapeHtml(`${index + 1}. ${segment.label || `Segment ${index + 1}`}`)}</option>
    `).join("")
        : `<option value="0" selected>No segments</option>`;
    const leftLayerOptions = project.soil_profiles.left.layers.length
        ? project.soil_profiles.left.layers.map((layer, index) => `
      <option value="${index}" ${index === focusState.leftLayerIndex ? "selected" : ""}>${escapeHtml(`${index + 1}. ${formatNumber(layer.top_level_m, 1)} to ${formatNumber(layer.bottom_level_m, 1)} m`)}</option>
    `).join("")
        : `<option value="0" selected>No left layers</option>`;
    const rightLayerOptions = project.soil_profiles.right.layers.length
        ? project.soil_profiles.right.layers.map((layer, index) => `
      <option value="${index}" ${index === focusState.rightLayerIndex ? "selected" : ""}>${escapeHtml(`${index + 1}. ${formatNumber(layer.top_level_m, 1)} to ${formatNumber(layer.bottom_level_m, 1)} m`)}</option>
    `).join("")
        : `<option value="0" selected>No right layers</option>`;
    const supportOptions = project.supports.length
        ? project.supports.map((support, index) => `
      <option value="${index}" ${index === focusState.supportIndex ? "selected" : ""}>${escapeHtml(`${index + 1}. ${support.id} ${supportTypeLabel(support.type)}`)}</option>
    `).join("")
        : `<option value="0" selected>No supports</option>`;
    return `
    <div class="quick-editor-grid">
      <label class="quick-editor-field"><span>Wall segment</span><select data-qe-segment-index>${segmentOptions}</select></label>
      <div class="quick-editor-actions"><button type="button" class="secondary-button" data-qe-structure-action="segment_split">Split segment</button><button type="button" class="secondary-button" data-qe-structure-action="segment_remove">Remove segment</button></div>
      <label class="quick-editor-field"><span>Left soil layer</span><select data-qe-left-layer-index>${leftLayerOptions}</select></label>
      <div class="quick-editor-actions"><button type="button" class="secondary-button" data-qe-structure-action="left_layer_split">Split left layer</button><button type="button" class="secondary-button" data-qe-structure-action="left_layer_remove">Remove left layer</button></div>
      <label class="quick-editor-field"><span>Right soil layer</span><select data-qe-right-layer-index>${rightLayerOptions}</select></label>
      <div class="quick-editor-actions"><button type="button" class="secondary-button" data-qe-structure-action="right_layer_split">Split right layer</button><button type="button" class="secondary-button" data-qe-structure-action="right_layer_remove">Remove right layer</button></div>
      <label class="quick-editor-field"><span>Support item</span><select data-qe-support-index>${supportOptions}</select></label>
      <div class="quick-editor-actions"><button type="button" class="secondary-button" data-qe-structure-action="support_add">Add support</button><button type="button" class="secondary-button" data-qe-structure-action="support_remove">Remove support</button></div>
      <label class="quick-editor-field"><span>Phase name</span><input data-qe-phase-name type="text" value="${escapeHtml(phase.name)}"></label>
      <div class="quick-editor-actions"><button type="button" class="secondary-button" data-qe-structure-action="phase_duplicate">Duplicate phase</button><button type="button" class="secondary-button" data-qe-structure-action="phase_remove">Remove phase</button></div>
      <label class="quick-editor-field"><span>Wall type</span><select data-qe-wall-type><option value="steel_sheet_pile" ${project.wall_type === "steel_sheet_pile" ? "selected" : ""}>Steel sheet pile</option><option value="diaphragm_wall" ${project.wall_type === "diaphragm_wall" ? "selected" : ""} disabled>Diaphragm wall (validation pending)</option></select></label>
      <label class="quick-editor-field"><span>Design mode</span><select data-qe-design-mode><option value="classic" ${project.design_mode === "classic" ? "selected" : ""}>Classic</option><option value="ec7" ${project.design_mode === "ec7" ? "selected" : ""}>EC7</option></select></label>
      <label class="quick-editor-field"><span>Toe control</span><select data-qe-toe-mode><option value="fixed" ${toeControlMode === "fixed" ? "selected" : ""}>Fixed toe</option><option value="search" ${toeControlMode === "search" ? "selected" : ""}>Search length</option></select></label>
      <label class="quick-editor-field"><span>Top level</span><input data-qe-top-level type="number" step="0.1" value="${escapeHtml(project.wall_geometry.top_level_m)}"></label>
      <label class="quick-editor-field"><span>Toe level</span><input data-qe-toe-level type="number" step="0.1" value="${escapeHtml(project.wall_geometry.toe_level_m)}"></label>
      <label class="quick-editor-field"><span>Search start toe</span><input data-qe-search-start type="number" step="0.1" value="${escapeHtml(wallLengthSearch?.start_toe_level_m ?? project.wall_geometry.toe_level_m)}"></label>
      <label class="quick-editor-field"><span>Search minimum toe</span><input data-qe-search-minimum type="number" step="0.1" value="${escapeHtml(wallLengthSearch?.minimum_toe_level_m ?? project.wall_geometry.toe_level_m - 1)}"></label>
      <label class="quick-editor-field"><span>Search step</span><input data-qe-search-step type="number" step="0.1" min="0.1" value="${escapeHtml(wallLengthSearch?.step_m ?? 0.5)}"></label>
      <label class="quick-editor-field"><span>Max head displacement</span><input data-qe-search-max-disp type="number" step="0.1" value="${escapeHtml(wallLengthSearch?.max_head_displacement_mm ?? 60)}"></label>
      <label class="quick-editor-field"><span>Target element length</span><input data-qe-target-element-length type="number" step="0.05" min="0.05" value="${escapeHtml(targetElementLengthForProject(project))}"></label>
      <label class="quick-editor-field"><span>Max wall displacement (project limit)</span><input data-qe-max-wall-displacement type="number" step="0.1" min="0.1" value="${escapeHtml(project.design_options?.max_wall_displacement_mm ?? "")}" placeholder="Required for public analysis"></label>
      <label class="quick-editor-field"><span>Segment label</span><input data-qe-segment-label type="text" value="${escapeHtml(selectedSegment?.label ?? "")}"></label>
      <label class="quick-editor-field"><span>Segment top</span><input data-qe-segment-top type="number" step="0.1" value="${escapeHtml(selectedSegment?.top_level_m ?? "")}"></label>
      <label class="quick-editor-field"><span>Segment bottom</span><input data-qe-segment-bottom type="number" step="0.1" value="${escapeHtml(selectedSegment?.bottom_level_m ?? "")}"></label>
      <label class="quick-editor-field"><span>Wall inclination</span><input data-qe-inclination type="number" step="0.1" value="${escapeHtml(project.wall_geometry.inclination_degrees ?? 0)}"></label>
      <label class="quick-editor-field"><span>Segment EI</span><input data-qe-segment-ei type="number" step="1" value="${escapeHtml(selectedSegment?.ei_kNm2_per_m ?? "")}"></label>
      <label class="quick-editor-field"><span>Cracked EI</span><input data-qe-segment-cracked-ei type="number" step="1" value="${escapeHtml(selectedSegment?.cracked_ei_kNm2_per_m ?? "")}"></label>
      <label class="quick-editor-field"><span>Cracking moment</span><input data-qe-segment-cracking-moment type="number" step="1" value="${escapeHtml(selectedSegment?.cracking_moment_kNm_per_m ?? "")}"></label>
      <label class="quick-editor-field"><span>Direct M resistance</span><input data-qe-segment-mr type="number" step="1" value="${escapeHtml(selectedSegment?.moment_resistance_kNm_per_m ?? "")}"></label>
      <label class="quick-editor-field"><span>Direct V resistance</span><input data-qe-segment-vr type="number" step="1" value="${escapeHtml(selectedSegment?.shear_resistance_kN_per_m ?? "")}"></label>
      ${wallTypeSpecificSectionControls}
      <label class="quick-editor-field"><span>Surface left</span><input data-qe-surface-left type="number" step="0.1" value="${escapeHtml(phase.surface_level_left_m ?? project.wall_geometry.top_level_m)}"></label>
      <label class="quick-editor-field"><span>Surface right</span><input data-qe-surface-right type="number" step="0.1" value="${escapeHtml(phase.surface_level_right_m ?? project.wall_geometry.top_level_m)}"></label>
      <label class="quick-editor-field"><span>Excavation left</span><input data-qe-exc-left type="number" step="0.1" value="${escapeHtml(phase.excavation_level_left_m)}"></label>
      <label class="quick-editor-field"><span>Excavation right</span><input data-qe-exc-right type="number" step="0.1" value="${escapeHtml(phase.excavation_level_right_m)}"></label>
      <label class="quick-editor-field"><span>Groundwater left</span><input data-qe-gw-left type="number" step="0.1" value="${escapeHtml(phase.groundwater_level_left_m)}"></label>
      <label class="quick-editor-field"><span>Groundwater right</span><input data-qe-gw-right type="number" step="0.1" value="${escapeHtml(phase.groundwater_level_right_m)}"></label>
      <label class="quick-editor-field"><span>Surcharge left</span><input data-qe-sur-left type="number" step="0.1" value="${escapeHtml(phase.surcharge_left_kPa ?? 0)}"></label>
      <label class="quick-editor-field"><span>Surcharge right</span><input data-qe-sur-right type="number" step="0.1" value="${escapeHtml(phase.surcharge_right_kPa ?? 0)}"></label>
      <label class="quick-editor-field"><span>Phase vertical load</span><input data-qe-vertical-load type="number" step="1" value="${escapeHtml(project.phases[phaseIndex]?.vertical_line_load_kN_per_m ?? 0)}"></label>
      <label class="quick-editor-field"><span>2nd order</span><select data-qe-second-order><option value="false" ${project.phases[phaseIndex]?.include_vertical_line_second_order ? "" : "selected"}>Off</option><option value="true" ${project.phases[phaseIndex]?.include_vertical_line_second_order ? "selected" : ""}>On</option></select></label>
      <label class="quick-editor-field"><span>Left layer top</span><input data-qe-left-top type="number" step="0.1" value="${escapeHtml(leftLayer?.top_level_m ?? "")}"></label>
      <label class="quick-editor-field"><span>Left layer bottom</span><input data-qe-left-bottom type="number" step="0.1" value="${escapeHtml(leftLayer?.bottom_level_m ?? "")}"></label>
      <label class="quick-editor-field"><span>Left γ dry</span><input data-qe-left-gamma-dry type="number" step="0.1" value="${escapeHtml(leftLayer?.unit_weight_dry_kN_m3 ?? "")}"></label>
      <label class="quick-editor-field"><span>Left γ wet</span><input data-qe-left-gamma-wet type="number" step="0.1" value="${escapeHtml(leftLayer?.unit_weight_wet_kN_m3 ?? "")}"></label>
      <label class="quick-editor-field"><span>Left φ</span><input data-qe-left-phi type="number" step="0.1" value="${escapeHtml(leftLayer?.friction_angle_deg ?? "")}"></label>
      <label class="quick-editor-field"><span>Left cohesion</span><input data-qe-left-cohesion type="number" step="0.1" value="${escapeHtml(leftLayer?.cohesion_kPa ?? "")}"></label>
      <label class="quick-editor-field"><span>Left wall friction</span><input data-qe-left-wall-friction type="number" step="0.1" value="${escapeHtml(leftLayer?.wall_friction_deg ?? "")}"></label>
      <label class="quick-editor-field"><span>Left K0 / Ka / Kp</span><input data-qe-left-k0 type="number" step="0.01" value="${escapeHtml(leftLayer?.at_rest_coefficient ?? "")}" placeholder="K0"><input data-qe-left-ka type="number" step="0.01" value="${escapeHtml(leftLayer?.active_coefficient ?? "")}" placeholder="Ka"><input data-qe-left-kp type="number" step="0.01" value="${escapeHtml(leftLayer?.passive_coefficient ?? "")}" placeholder="Kp"></label>
      <label class="quick-editor-field"><span>Left bedding model</span><select data-qe-left-bedding-model><option value="linear" ${(leftLayer?.bedding_model ?? "linear") === "linear" ? "selected" : ""}>Linear</option><option value="tri_linear" ${leftLayer?.bedding_model === "tri_linear" ? "selected" : ""}>Tri-linear</option></select></label>
      <label class="quick-editor-field"><span>Left tri-linear breakpoints</span><input data-qe-left-breakpoint-1 type="number" step="0.1" value="${escapeHtml(leftLayer?.tri_linear_displacement_breakpoints_mm?.[0] ?? "")}" placeholder="bp1 mm"><input data-qe-left-breakpoint-2 type="number" step="0.1" value="${escapeHtml(leftLayer?.tri_linear_displacement_breakpoints_mm?.[1] ?? "")}" placeholder="bp2 mm"></label>
      <label class="quick-editor-field"><span>Left tri-linear factors</span><input data-qe-left-factor-1 type="number" step="0.01" value="${escapeHtml(leftLayer?.tri_linear_stiffness_factors?.[0] ?? "")}" placeholder="k1"><input data-qe-left-factor-2 type="number" step="0.01" value="${escapeHtml(leftLayer?.tri_linear_stiffness_factors?.[1] ?? "")}" placeholder="k2"><input data-qe-left-factor-3 type="number" step="0.01" value="${escapeHtml(leftLayer?.tri_linear_stiffness_factors?.[2] ?? "")}" placeholder="k3"></label>
      <label class="quick-editor-field"><span>Left ks</span><input data-qe-left-ks type="number" step="1" value="${escapeHtml(leftLayer?.subgrade_modulus_kN_m3 ?? "")}"></label>
      <label class="quick-editor-field"><span>Left pore offset</span><input data-qe-left-pore type="number" step="0.1" value="${escapeHtml(leftLayer?.pore_pressure_offset_kPa ?? "")}"></label>
      <label class="quick-editor-field"><span>Right layer top</span><input data-qe-right-top type="number" step="0.1" value="${escapeHtml(rightLayer?.top_level_m ?? "")}"></label>
      <label class="quick-editor-field"><span>Right layer bottom</span><input data-qe-right-bottom type="number" step="0.1" value="${escapeHtml(rightLayer?.bottom_level_m ?? "")}"></label>
      <label class="quick-editor-field"><span>Right γ dry</span><input data-qe-right-gamma-dry type="number" step="0.1" value="${escapeHtml(rightLayer?.unit_weight_dry_kN_m3 ?? "")}"></label>
      <label class="quick-editor-field"><span>Right γ wet</span><input data-qe-right-gamma-wet type="number" step="0.1" value="${escapeHtml(rightLayer?.unit_weight_wet_kN_m3 ?? "")}"></label>
      <label class="quick-editor-field"><span>Right φ</span><input data-qe-right-phi type="number" step="0.1" value="${escapeHtml(rightLayer?.friction_angle_deg ?? "")}"></label>
      <label class="quick-editor-field"><span>Right cohesion</span><input data-qe-right-cohesion type="number" step="0.1" value="${escapeHtml(rightLayer?.cohesion_kPa ?? "")}"></label>
      <label class="quick-editor-field"><span>Right wall friction</span><input data-qe-right-wall-friction type="number" step="0.1" value="${escapeHtml(rightLayer?.wall_friction_deg ?? "")}"></label>
      <label class="quick-editor-field"><span>Right K0 / Ka / Kp</span><input data-qe-right-k0 type="number" step="0.01" value="${escapeHtml(rightLayer?.at_rest_coefficient ?? "")}" placeholder="K0"><input data-qe-right-ka type="number" step="0.01" value="${escapeHtml(rightLayer?.active_coefficient ?? "")}" placeholder="Ka"><input data-qe-right-kp type="number" step="0.01" value="${escapeHtml(rightLayer?.passive_coefficient ?? "")}" placeholder="Kp"></label>
      <label class="quick-editor-field"><span>Right bedding model</span><select data-qe-right-bedding-model><option value="linear" ${(rightLayer?.bedding_model ?? "linear") === "linear" ? "selected" : ""}>Linear</option><option value="tri_linear" ${rightLayer?.bedding_model === "tri_linear" ? "selected" : ""}>Tri-linear</option></select></label>
      <label class="quick-editor-field"><span>Right tri-linear breakpoints</span><input data-qe-right-breakpoint-1 type="number" step="0.1" value="${escapeHtml(rightLayer?.tri_linear_displacement_breakpoints_mm?.[0] ?? "")}" placeholder="bp1 mm"><input data-qe-right-breakpoint-2 type="number" step="0.1" value="${escapeHtml(rightLayer?.tri_linear_displacement_breakpoints_mm?.[1] ?? "")}" placeholder="bp2 mm"></label>
      <label class="quick-editor-field"><span>Right tri-linear factors</span><input data-qe-right-factor-1 type="number" step="0.01" value="${escapeHtml(rightLayer?.tri_linear_stiffness_factors?.[0] ?? "")}" placeholder="k1"><input data-qe-right-factor-2 type="number" step="0.01" value="${escapeHtml(rightLayer?.tri_linear_stiffness_factors?.[1] ?? "")}" placeholder="k2"><input data-qe-right-factor-3 type="number" step="0.01" value="${escapeHtml(rightLayer?.tri_linear_stiffness_factors?.[2] ?? "")}" placeholder="k3"></label>
      <label class="quick-editor-field"><span>Right ks</span><input data-qe-right-ks type="number" step="1" value="${escapeHtml(rightLayer?.subgrade_modulus_kN_m3 ?? "")}"></label>
      <label class="quick-editor-field"><span>Right pore offset</span><input data-qe-right-pore type="number" step="0.1" value="${escapeHtml(rightLayer?.pore_pressure_offset_kPa ?? "")}"></label>
      <label class="quick-editor-field"><span>Support id</span><input data-qe-support-id type="text" value="${escapeHtml(selectedSupport?.id ?? "")}"></label>
      <label class="quick-editor-field"><span>Support type</span><select data-qe-support-type><option value="anchor" ${selectedSupport?.type === "anchor" ? "selected" : ""}>Anchor</option><option value="strut" ${selectedSupport?.type === "strut" ? "selected" : ""}>Strut</option><option value="spring" ${selectedSupport?.type === "spring" ? "selected" : ""}>Spring</option><option value="underwater_concrete_block" ${selectedSupport?.type === "underwater_concrete_block" ? "selected" : ""}>Underwater concrete block</option><option value="rigid" ${selectedSupport?.type === "rigid" ? "selected" : ""}>Rigid</option><option value="clamp" ${selectedSupport?.type === "clamp" ? "selected" : ""}>Clamp</option><option value="point_load" ${selectedSupport?.type === "point_load" ? "selected" : ""}>Point load</option><option value="moment" ${selectedSupport?.type === "moment" ? "selected" : ""}>Moment</option></select></label>
      <label class="quick-editor-field"><span>Support side</span><select data-qe-support-side><option value="right" ${selectedSupport?.side !== "left" ? "selected" : ""}>Right</option><option value="left" ${selectedSupport?.side === "left" ? "selected" : ""}>Left</option></select></label>
      <label class="quick-editor-field"><span>Support depth</span><input data-qe-support-depth type="number" step="0.1" value="${escapeHtml(selectedSupport?.depth_m ?? 0)}"></label>
      <label class="quick-editor-field"><span>Support active from phase</span><input data-qe-support-active-from type="number" step="1" min="1" value="${escapeHtml((selectedSupport?.active_from_phase ?? 0) + 1)}"></label>
      <label class="quick-editor-field"><span>Support active to phase</span><input data-qe-support-active-to type="number" step="1" min="1" value="${escapeHtml(selectedSupport?.active_to_phase === undefined ? "" : selectedSupport.active_to_phase + 1)}" placeholder="blank = final phase"></label>
      <label class="quick-editor-field"><span>Support inclination</span><input data-qe-support-inclination type="number" step="0.1" value="${escapeHtml(selectedSupport?.inclination_degrees ?? 0)}"></label>
      <label class="quick-editor-field"><span>Support stiffness</span><input data-qe-support-stiffness type="number" step="1" value="${escapeHtml(selectedSupport?.stiffness_kN_per_m ?? "")}"></label>
      <label class="quick-editor-field"><span>Prestress</span><input data-qe-support-prestress type="number" step="1" value="${escapeHtml(selectedSupport?.prestress_kN_per_m ?? "")}"></label>
      <label class="quick-editor-field"><span>Capacity</span><input data-qe-support-capacity type="number" step="1" value="${escapeHtml(selectedSupport?.capacity_kN_per_m ?? "")}"></label>
      <label class="quick-editor-field"><span>Point load</span><input data-qe-support-force type="number" step="1" value="${escapeHtml(selectedSupport?.force_kN_per_m ?? "")}"></label>
      <label class="quick-editor-field"><span>Applied moment</span><input data-qe-support-moment type="number" step="1" value="${escapeHtml(selectedSupport?.moment_kNm_per_m ?? "")}"></label>
      <p class="quick-editor-note">Select a wall segment, left/right soil layer, support item, or phase to edit existing staged retaining data from the structured UI. The segment editor covers EI, cracked EI, cracking moment, direct moment/shear resistances, and ${project.wall_type === "steel_sheet_pile" ? "manual steel-section metadata" : "direct diaphragm section stiffness/cracking/resistance inputs"}; the phase editor covers naming, surface, excavation, groundwater, surcharge, and vertical wall load state; the left/right soil layers cover density, friction, cohesion, stiffness, coefficient overrides, and pore offsets; the support editor covers id, type, permanence by phase, stiffness/prestress/capacity, unilateral underwater concrete blocks, point loads, and applied moments; and the workspace also exposes the required project-specific wall-displacement limit, target element length, and returned discretization metadata. JSON remains available for direct editing and future branches.</p>
    </div>
  `;
}
export function reconcileQuickEditorEventPatch(changedField, patch) {
    const reconciled = { ...patch };
    if (changedField === "top_level_m") {
        delete reconciled.segment_top_level_m;
    }
    else if (changedField === "toe_level_m") {
        delete reconciled.segment_bottom_level_m;
    }
    else if (changedField === "segment_top_level_m") {
        delete reconciled.top_level_m;
    }
    else if (changedField === "segment_bottom_level_m") {
        delete reconciled.toe_level_m;
    }
    else if (changedField === "design_mode") {
        reconciled.gamma_m0 = defaultSteelGammaM0(reconciled.design_mode);
    }
    return reconciled;
}
export function applyQuickEditorPatch(project, phaseIndex, patch, focus = {}) {
    const nextProject = structuredClone(project);
    const focusState = normalizeEditorFocus(nextProject, focus);
    nextProject.design_options = {
        ...(nextProject.design_options || {}),
        target_element_length_m: patch.target_element_length_m ??
            nextProject.design_options?.target_element_length_m ??
            0.5,
        max_wall_displacement_mm: patch.max_wall_displacement_mm ??
            nextProject.design_options?.max_wall_displacement_mm,
    };
    const nextWallLengthSearch = nextProject.design_options?.wall_length_search;
    nextProject.wall_type = patch.wall_type ?? nextProject.wall_type;
    nextProject.design_mode = patch.design_mode ?? nextProject.design_mode;
    nextProject.wall_geometry.top_level_m = patch.top_level_m ?? nextProject.wall_geometry.top_level_m;
    nextProject.wall_geometry.toe_level_m = patch.toe_level_m ?? nextProject.wall_geometry.toe_level_m;
    nextProject.wall_geometry.inclination_degrees = patch.inclination_degrees ?? nextProject.wall_geometry.inclination_degrees;
    if (nextProject.wall_geometry.segments[0]) {
        nextProject.wall_geometry.segments[0].top_level_m = nextProject.wall_geometry.top_level_m;
    }
    if (nextProject.wall_geometry.segments[nextProject.wall_geometry.segments.length - 1]) {
        nextProject.wall_geometry.segments[nextProject.wall_geometry.segments.length - 1].bottom_level_m = nextProject.wall_geometry.toe_level_m;
    }
    if (patch.toe_mode === "search") {
        const searchStartToeLevelM = patch.search_start_toe_level_m ??
            nextWallLengthSearch?.start_toe_level_m ??
            nextProject.wall_geometry.toe_level_m;
        nextProject.design_options = {
            ...(nextProject.design_options || {}),
            wall_length_search: {
                start_toe_level_m: searchStartToeLevelM,
                minimum_toe_level_m: patch.search_minimum_toe_level_m ??
                    nextWallLengthSearch?.minimum_toe_level_m ??
                    searchStartToeLevelM - 1,
                step_m: patch.search_step_m ??
                    nextWallLengthSearch?.step_m ??
                    0.5,
                max_head_displacement_mm: patch.search_max_head_displacement_mm ??
                    nextWallLengthSearch?.max_head_displacement_mm ??
                    60,
            },
        };
        nextProject.wall_geometry.toe_level_m = searchStartToeLevelM;
        if (nextProject.wall_geometry.segments[nextProject.wall_geometry.segments.length - 1]) {
            nextProject.wall_geometry.segments[nextProject.wall_geometry.segments.length - 1].bottom_level_m = searchStartToeLevelM;
        }
    }
    if (patch.toe_mode === "fixed" && nextProject.design_options?.wall_length_search) {
        delete nextProject.design_options.wall_length_search;
    }
    const selectedSegment = nextProject.wall_geometry.segments[focusState.segmentIndex];
    if (selectedSegment) {
        selectedSegment.label =
            patch.segment_label ?? selectedSegment.label;
        selectedSegment.top_level_m =
            patch.segment_top_level_m ?? selectedSegment.top_level_m;
        selectedSegment.bottom_level_m =
            patch.segment_bottom_level_m ?? selectedSegment.bottom_level_m;
        const librarySectionId = patch.library_section_id === ""
            ? undefined
            : patch.library_section_id ?? selectedSegment.steel_section?.library_section_id;
        selectedSegment.ei_kNm2_per_m =
            patch.segment_ei_kNm2_per_m ?? selectedSegment.ei_kNm2_per_m;
        selectedSegment.cracked_ei_kNm2_per_m =
            patch.segment_cracked_ei_kNm2_per_m ?? selectedSegment.cracked_ei_kNm2_per_m;
        selectedSegment.cracking_moment_kNm_per_m =
            patch.segment_cracking_moment_kNm_per_m ?? selectedSegment.cracking_moment_kNm_per_m;
        selectedSegment.moment_resistance_kNm_per_m =
            patch.segment_moment_resistance_kNm_per_m ?? selectedSegment.moment_resistance_kNm_per_m;
        selectedSegment.shear_resistance_kN_per_m =
            patch.segment_shear_resistance_kN_per_m ?? selectedSegment.shear_resistance_kN_per_m;
        selectedSegment.steel_section = {
            ...(selectedSegment.steel_section || {}),
            library_section_id: librarySectionId,
            section_name: patch.section_name ?? selectedSegment.steel_section?.section_name,
            plastic_section_modulus_cm3_per_m: patch.plastic_section_modulus_cm3_per_m ?? selectedSegment.steel_section?.plastic_section_modulus_cm3_per_m,
            shear_area_cm2_per_m: patch.shear_area_cm2_per_m ?? selectedSegment.steel_section?.shear_area_cm2_per_m,
            steel_grade_mpa: patch.steel_grade_mpa ?? selectedSegment.steel_section?.steel_grade_mpa ?? 355,
            gamma_m0: patch.gamma_m0 ??
                selectedSegment.steel_section?.gamma_m0 ??
                defaultSteelGammaM0(nextProject.design_mode),
        };
        if (focusState.segmentIndex === 0 && patch.segment_top_level_m !== undefined) {
            nextProject.wall_geometry.top_level_m = patch.segment_top_level_m;
        }
        if (focusState.segmentIndex === nextProject.wall_geometry.segments.length - 1 &&
            patch.segment_bottom_level_m !== undefined) {
            nextProject.wall_geometry.toe_level_m = patch.segment_bottom_level_m;
        }
    }
    if (nextProject.phases[phaseIndex]) {
        nextProject.phases[phaseIndex].name =
            patch.phase_name ?? nextProject.phases[phaseIndex].name;
        nextProject.phases[phaseIndex].surface_level_left_m =
            patch.surface_level_left_m ?? nextProject.phases[phaseIndex].surface_level_left_m;
        nextProject.phases[phaseIndex].surface_level_right_m =
            patch.surface_level_right_m ?? nextProject.phases[phaseIndex].surface_level_right_m;
        nextProject.phases[phaseIndex].excavation_level_left_m =
            patch.excavation_level_left_m ?? nextProject.phases[phaseIndex].excavation_level_left_m;
        nextProject.phases[phaseIndex].excavation_level_right_m =
            patch.excavation_level_right_m ?? nextProject.phases[phaseIndex].excavation_level_right_m;
        nextProject.phases[phaseIndex].groundwater_level_left_m =
            patch.groundwater_level_left_m ?? nextProject.phases[phaseIndex].groundwater_level_left_m;
        nextProject.phases[phaseIndex].groundwater_level_right_m =
            patch.groundwater_level_right_m ?? nextProject.phases[phaseIndex].groundwater_level_right_m;
        nextProject.phases[phaseIndex].surcharge_left_kPa =
            patch.surcharge_left_kPa ?? nextProject.phases[phaseIndex].surcharge_left_kPa;
        nextProject.phases[phaseIndex].surcharge_right_kPa =
            patch.surcharge_right_kPa ?? nextProject.phases[phaseIndex].surcharge_right_kPa;
        nextProject.phases[phaseIndex].vertical_line_load_kN_per_m =
            patch.vertical_line_load_kN_per_m ?? nextProject.phases[phaseIndex].vertical_line_load_kN_per_m;
        nextProject.phases[phaseIndex].include_vertical_line_second_order =
            patch.include_vertical_line_second_order ?? nextProject.phases[phaseIndex].include_vertical_line_second_order;
    }
    const selectedLeftLayer = nextProject.soil_profiles.left.layers[focusState.leftLayerIndex];
    if (selectedLeftLayer) {
        selectedLeftLayer.top_level_m =
            patch.left_top_level_m ?? selectedLeftLayer.top_level_m;
        selectedLeftLayer.bottom_level_m =
            patch.left_bottom_level_m ?? selectedLeftLayer.bottom_level_m;
        selectedLeftLayer.unit_weight_dry_kN_m3 =
            patch.left_unit_weight_dry_kN_m3 ?? selectedLeftLayer.unit_weight_dry_kN_m3;
        selectedLeftLayer.unit_weight_wet_kN_m3 =
            patch.left_unit_weight_wet_kN_m3 ?? selectedLeftLayer.unit_weight_wet_kN_m3;
        selectedLeftLayer.friction_angle_deg =
            patch.left_friction_angle_deg ?? selectedLeftLayer.friction_angle_deg;
        selectedLeftLayer.cohesion_kPa =
            patch.left_cohesion_kPa ?? selectedLeftLayer.cohesion_kPa;
        selectedLeftLayer.wall_friction_deg =
            patch.left_wall_friction_deg ?? selectedLeftLayer.wall_friction_deg;
        selectedLeftLayer.at_rest_coefficient =
            patch.left_at_rest_coefficient ?? selectedLeftLayer.at_rest_coefficient;
        selectedLeftLayer.active_coefficient =
            patch.left_active_coefficient ?? selectedLeftLayer.active_coefficient;
        selectedLeftLayer.passive_coefficient =
            patch.left_passive_coefficient ?? selectedLeftLayer.passive_coefficient;
        selectedLeftLayer.bedding_model =
            patch.left_bedding_model ?? selectedLeftLayer.bedding_model;
        selectedLeftLayer.tri_linear_displacement_breakpoints_mm =
            patch.left_tri_linear_displacement_breakpoints_mm ?? selectedLeftLayer.tri_linear_displacement_breakpoints_mm;
        selectedLeftLayer.tri_linear_stiffness_factors =
            patch.left_tri_linear_stiffness_factors ?? selectedLeftLayer.tri_linear_stiffness_factors;
        selectedLeftLayer.subgrade_modulus_kN_m3 =
            patch.left_subgrade_modulus_kN_m3 ?? selectedLeftLayer.subgrade_modulus_kN_m3;
        selectedLeftLayer.pore_pressure_offset_kPa =
            patch.left_pore_pressure_offset_kPa ?? selectedLeftLayer.pore_pressure_offset_kPa;
    }
    const selectedRightLayer = nextProject.soil_profiles.right.layers[focusState.rightLayerIndex];
    if (selectedRightLayer) {
        selectedRightLayer.top_level_m =
            patch.right_top_level_m ?? selectedRightLayer.top_level_m;
        selectedRightLayer.bottom_level_m =
            patch.right_bottom_level_m ?? selectedRightLayer.bottom_level_m;
        selectedRightLayer.unit_weight_dry_kN_m3 =
            patch.right_unit_weight_dry_kN_m3 ?? selectedRightLayer.unit_weight_dry_kN_m3;
        selectedRightLayer.unit_weight_wet_kN_m3 =
            patch.right_unit_weight_wet_kN_m3 ?? selectedRightLayer.unit_weight_wet_kN_m3;
        selectedRightLayer.friction_angle_deg =
            patch.right_friction_angle_deg ?? selectedRightLayer.friction_angle_deg;
        selectedRightLayer.cohesion_kPa =
            patch.right_cohesion_kPa ?? selectedRightLayer.cohesion_kPa;
        selectedRightLayer.wall_friction_deg =
            patch.right_wall_friction_deg ?? selectedRightLayer.wall_friction_deg;
        selectedRightLayer.at_rest_coefficient =
            patch.right_at_rest_coefficient ?? selectedRightLayer.at_rest_coefficient;
        selectedRightLayer.active_coefficient =
            patch.right_active_coefficient ?? selectedRightLayer.active_coefficient;
        selectedRightLayer.passive_coefficient =
            patch.right_passive_coefficient ?? selectedRightLayer.passive_coefficient;
        selectedRightLayer.bedding_model =
            patch.right_bedding_model ?? selectedRightLayer.bedding_model;
        selectedRightLayer.tri_linear_displacement_breakpoints_mm =
            patch.right_tri_linear_displacement_breakpoints_mm ?? selectedRightLayer.tri_linear_displacement_breakpoints_mm;
        selectedRightLayer.tri_linear_stiffness_factors =
            patch.right_tri_linear_stiffness_factors ?? selectedRightLayer.tri_linear_stiffness_factors;
        selectedRightLayer.subgrade_modulus_kN_m3 =
            patch.right_subgrade_modulus_kN_m3 ?? selectedRightLayer.subgrade_modulus_kN_m3;
        selectedRightLayer.pore_pressure_offset_kPa =
            patch.right_pore_pressure_offset_kPa ?? selectedRightLayer.pore_pressure_offset_kPa;
    }
    const selectedSupport = nextProject.supports[focusState.supportIndex];
    if (selectedSupport) {
        selectedSupport.id =
            patch.support_id ?? selectedSupport.id;
        selectedSupport.type =
            patch.support_type ?? selectedSupport.type;
        selectedSupport.side =
            patch.support_side ?? selectedSupport.side;
        selectedSupport.depth_m =
            patch.support_depth_m ?? selectedSupport.depth_m;
        selectedSupport.active_from_phase =
            patch.support_active_from_phase === undefined
                ? selectedSupport.active_from_phase
                : Math.max(0, Math.round(patch.support_active_from_phase) - 1);
        selectedSupport.active_to_phase =
            patch.support_active_to_phase === null
                ? undefined
                : patch.support_active_to_phase === undefined
                    ? selectedSupport.active_to_phase
                    : Math.max(0, Math.round(patch.support_active_to_phase) - 1);
        selectedSupport.inclination_degrees =
            patch.support_inclination_degrees ??
                patch.anchor_inclination_degrees ??
                selectedSupport.inclination_degrees;
        selectedSupport.stiffness_kN_per_m =
            patch.support_stiffness_kN_per_m ?? selectedSupport.stiffness_kN_per_m;
        selectedSupport.prestress_kN_per_m =
            patch.support_prestress_kN_per_m ?? selectedSupport.prestress_kN_per_m;
        selectedSupport.capacity_kN_per_m =
            patch.support_capacity_kN_per_m ?? selectedSupport.capacity_kN_per_m;
        selectedSupport.force_kN_per_m =
            patch.support_force_kN_per_m ?? selectedSupport.force_kN_per_m;
        selectedSupport.moment_kNm_per_m =
            patch.support_moment_kNm_per_m ?? selectedSupport.moment_kNm_per_m;
    }
    return nextProject;
}
function buildSvgPlot(levels, values, cssClass, label) {
    const path = buildPlotPath(levels, values);
    return `
    <svg class="plot-svg" viewBox="0 0 360 180" role="img" aria-label="${escapeHtml(label)}">
      <path class="plot-line ${cssClass}" d="${path}"></path>
    </svg>
  `;
}
function buildDeformedWallSvg(levels, displacements) {
    const width = 240;
    const height = 300;
    const centerX = width / 2;
    const minLevel = Math.min(...levels);
    const maxLevel = Math.max(...levels);
    const maxAbsDisp = Math.max(1e-6, ...displacements.map((value) => Math.abs(value)));
    const path = displacements.map((value, index) => {
        const x = centerX + (value / maxAbsDisp) * 58;
        const y = ((maxLevel - levels[index]) / Math.max(1e-9, maxLevel - minLevel)) * (height - 24) + 12;
        return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    }).join(" ");
    return `
    <svg class="deformed-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="Wall deformed shape">
      <rect x="0" y="0" width="${width}" height="${height}" rx="18" fill="#fdfbf6"></rect>
      <line x1="${centerX}" y1="12" x2="${centerX}" y2="${height - 12}" stroke="#9fb1b8" stroke-width="4" stroke-dasharray="5 8"></line>
      <path d="${path}" stroke="#0b6e4f" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
  `;
}
function governingSupportCheck(result) {
    const supportChecks = result.design_checks?.supports;
    if (!Array.isArray(supportChecks) || !supportChecks.length) {
        return null;
    }
    return supportChecks.reduce((governing, item) => {
        if (!governing) {
            return item;
        }
        return (item.utilization_ratio ?? 0) >= (governing.utilization_ratio ?? 0) ? item : governing;
    }, null);
}
function hasSupportAxialForce(item) {
    return typeof item?.axial_force_kN_per_m === "number";
}
function supportReactionMoment(item) {
    if (typeof item?.reaction_moment_kNm_per_m === "number") {
        return item.reaction_moment_kNm_per_m;
    }
    if (item?.type === "moment" && typeof item?.reaction_kN_per_m === "number") {
        return item.reaction_kN_per_m;
    }
    return undefined;
}
function hasSupportAxialCheck(item) {
    return (typeof item?.axial_demand_kN_per_m === "number" &&
        typeof item?.axial_capacity_kN_per_m === "number");
}
function formatSupportReactionValue(item) {
    const supportMoment = supportReactionMoment(item);
    if (supportMoment !== undefined && item?.type === "moment") {
        return `${formatNumber(supportMoment, 2)} kNm/m`;
    }
    const values = [`${formatNumber(item?.reaction_kN_per_m ?? 0, 2)} kN/m`];
    if (supportMoment !== undefined) {
        values.push(`moment ${formatNumber(supportMoment, 2)} kNm/m`);
    }
    if (hasSupportAxialForce(item)) {
        values.push(`axial ${formatNumber(item.axial_force_kN_per_m, 2)} kN/m`);
    }
    return values.join(" · ");
}
function formatSupportReactionStatus(item) {
    if (item?.utilization_ratio !== undefined) {
        return `utilization ${formatNumber(item.utilization_ratio, 2)}`;
    }
    return item?.branch_state ?? "n/a";
}
function formatSupportCheckDemandCapacity(item) {
    const horizontal = `${formatNumber(item?.demand_kN_per_m ?? 0, 2)} / ${formatNumber(item?.capacity_kN_per_m ?? 0, 2)} kN/m`;
    if (!hasSupportAxialCheck(item)) {
        return horizontal;
    }
    return `${horizontal} · axial ${formatNumber(item.axial_demand_kN_per_m, 2)} / ${formatNumber(item.axial_capacity_kN_per_m, 2)} kN/m`;
}
function renderSupportCheckValueCell(primaryValue, axialValue) {
    const primary = `${formatNumber(primaryValue ?? 0, 2)} kN/m`;
    if (typeof axialValue !== "number") {
        return escapeHtml(primary);
    }
    return `${escapeHtml(primary)}<br><span>Axial ${escapeHtml(formatNumber(axialValue, 2))} kN/m</span>`;
}
function formatSupportReactionHorizontalCell(item) {
    return `${formatNumber(item?.reaction_kN_per_m ?? 0, 2)} kN/m`;
}
function formatSupportReactionMomentCell(item) {
    const supportMoment = supportReactionMoment(item);
    return supportMoment === undefined ? "n/a" : `${formatNumber(supportMoment, 2)} kNm/m`;
}
function formatSupportReactionAxialCell(item) {
    return hasSupportAxialForce(item)
        ? `${formatNumber(item.axial_force_kN_per_m, 2)} kN/m`
        : "n/a";
}
function assessmentStatus(value) {
    if (value === true)
        return "ASSESSED PASS";
    if (value === false)
        return "CHECK";
    return "NOT ASSESSED";
}
function serviceabilityAssessmentStatus(serviceability) {
    return serviceability?.assessed === true
        ? assessmentStatus(serviceability.pass)
        : "NOT ASSESSED";
}
function formatServiceabilityAssessment(serviceability) {
    const maximum = Number.isFinite(serviceability?.max_abs_displacement_mm)
        ? `${formatNumber(serviceability.max_abs_displacement_mm, 2)} mm maximum`
        : "maximum displacement unavailable";
    const limit = Number.isFinite(serviceability?.limit_mm)
        ? `${formatNumber(serviceability.limit_mm, 2)} mm project limit`
        : "project limit not declared";
    return `${maximum} / ${limit} · ${serviceabilityAssessmentStatus(serviceability)}`;
}
function formatSupportReactionDepthCell(item) {
    return item?.depth_m === undefined ? "n/a" : `${formatNumber(item.depth_m, 2)} m`;
}
function buildSupportReactionRows(phase) {
    if (!Array.isArray(phase?.support_reactions) || !phase.support_reactions.length) {
        return `<tr><td colspan="8">No support rows returned for this phase.</td></tr>`;
    }
    return phase.support_reactions.map((item) => `
    <tr>
      <td>${escapeHtml(item.id ?? "n/a")}</td>
      <td>${escapeHtml(item.type ?? "n/a")}</td>
      <td>${escapeHtml(item.side ?? "n/a")}</td>
      <td>${escapeHtml(formatSupportReactionDepthCell(item))}</td>
      <td>${escapeHtml(formatSupportReactionHorizontalCell(item))}</td>
      <td>${escapeHtml(formatSupportReactionMomentCell(item))}</td>
      <td>${escapeHtml(formatSupportReactionAxialCell(item))}</td>
      <td>${escapeHtml(formatSupportReactionStatus(item))}</td>
    </tr>
  `).join("");
}
function buildSupportReactionListItems(phase) {
    if (!Array.isArray(phase?.support_reactions) || !phase.support_reactions.length) {
        return `<li>No support rows returned for this phase.</li>`;
    }
    return phase.support_reactions.map((item) => {
        const supportMeta = [
            item?.type ?? "support",
            item?.side ?? undefined,
            formatSupportReactionDepthCell(item),
        ].filter((value) => value && value !== "n/a").join(" · ");
        const supportStatus = item?.utilization_ratio !== undefined || item?.branch_state !== undefined
            ? ` · ${formatSupportReactionStatus(item)}`
            : "";
        return `<li>${escapeHtml(item.id ?? "n/a")}${supportMeta ? ` (${escapeHtml(supportMeta)})` : ""}: ${escapeHtml(formatSupportReactionValue(item))}${escapeHtml(supportStatus)}</li>`;
    }).join("");
}
function buildSupportCheckList(result) {
    const supportChecks = result.design_checks?.supports;
    if (!Array.isArray(supportChecks) || !supportChecks.length) {
        return `<li>No capacity-based support design checks were triggered.</li>`;
    }
    return supportChecks.map((item) => `
    <li>${escapeHtml(item.support_id)} (${escapeHtml(item.support_type ?? "support")}): demand/capacity ${escapeHtml(formatSupportCheckDemandCapacity(item))} · utilization ${formatNumber(item.utilization_ratio ?? 0, 2)} · governing phase ${escapeHtml(item.governing_phase ?? "n/a")} · ${assessmentStatus(item.pass)}</li>
  `).join("");
}
function buildSupportCheckRows(result) {
    const supportChecks = result.design_checks?.supports;
    if (!Array.isArray(supportChecks) || !supportChecks.length) {
        return `<tr><td colspan="7">No capacity-based support design checks were triggered.</td></tr>`;
    }
    return supportChecks.map((item) => `
    <tr>
      <td>${escapeHtml(item.support_id)}</td>
      <td>${escapeHtml(item.support_type ?? "n/a")}</td>
      <td>${renderSupportCheckValueCell(item.demand_kN_per_m, item.axial_demand_kN_per_m)}</td>
      <td>${renderSupportCheckValueCell(item.capacity_kN_per_m, item.axial_capacity_kN_per_m)}</td>
      <td>${escapeHtml(formatNumber(item.utilization_ratio ?? 0, 2))}</td>
      <td>${escapeHtml(item.governing_phase ?? "n/a")}</td>
      <td>${assessmentStatus(item.pass)}</td>
    </tr>
  `).join("");
}
function buildGlobalGoverningRows(result) {
    const governing = result?.governing;
    if (!governing) {
        return `<tr><td colspan="7">No governing envelope metadata returned.</td></tr>`;
    }
    return [
        {
            label: "Displacement",
            minValue: `${formatNumber(governing.min_displacement_mm ?? 0, 2)} mm`,
            maxValue: `${formatNumber(governing.max_displacement_mm ?? 0, 2)} mm`,
            maxAbsValue: `${formatNumber(governing.max_abs_displacement_mm ?? 0, 2)} mm`,
            minPhase: governing.min_displacement_phase ?? "n/a",
            maxPhase: governing.max_displacement_phase ?? "n/a",
            maxAbsPhase: governing.max_abs_displacement_phase ?? "n/a",
        },
        {
            label: "Rotation",
            minValue: `${formatNumber(governing.min_rotation_mrad ?? 0, 2)} mrad`,
            maxValue: `${formatNumber(governing.max_rotation_mrad ?? 0, 2)} mrad`,
            maxAbsValue: `${formatNumber(governing.max_abs_rotation_mrad ?? 0, 2)} mrad`,
            minPhase: governing.min_rotation_phase ?? "n/a",
            maxPhase: governing.max_rotation_phase ?? "n/a",
            maxAbsPhase: governing.max_abs_rotation_phase ?? "n/a",
        },
        {
            label: "Moment",
            minValue: `${formatNumber(governing.min_moment_kNm_per_m ?? 0, 2)} kNm/m`,
            maxValue: `${formatNumber(governing.max_moment_kNm_per_m ?? 0, 2)} kNm/m`,
            maxAbsValue: `${formatNumber(governing.max_abs_moment_kNm_per_m ?? 0, 2)} kNm/m`,
            minPhase: governing.min_moment_phase ?? "n/a",
            maxPhase: governing.max_moment_phase ?? "n/a",
            maxAbsPhase: governing.max_abs_moment_phase ?? "n/a",
        },
        {
            label: "Shear",
            minValue: `${formatNumber(governing.min_shear_kN_per_m ?? 0, 2)} kN/m`,
            maxValue: `${formatNumber(governing.max_shear_kN_per_m ?? 0, 2)} kN/m`,
            maxAbsValue: `${formatNumber(governing.max_abs_shear_kN_per_m ?? 0, 2)} kN/m`,
            minPhase: governing.min_shear_phase ?? "n/a",
            maxPhase: governing.max_shear_phase ?? "n/a",
            maxAbsPhase: governing.max_abs_shear_phase ?? "n/a",
        },
    ].map((item) => `
    <tr>
      <td>${escapeHtml(item.label)}</td>
      <td>${escapeHtml(item.minValue)}</td>
      <td>${escapeHtml(item.maxValue)}</td>
      <td>${escapeHtml(item.maxAbsValue)}</td>
      <td>${escapeHtml(item.minPhase)}</td>
      <td>${escapeHtml(item.maxPhase)}</td>
      <td>${escapeHtml(item.maxAbsPhase)}</td>
    </tr>
  `).join("");
}
function buildWallCheckRows(result) {
    const wallCheck = result?.design_checks?.wall;
    const serviceability = result?.design_checks?.serviceability;
    if (!wallCheck) {
        return [
            ["Wall design check", "No wall design-check metadata returned."],
            ["Displacement serviceability", formatServiceabilityAssessment(serviceability)],
            ["Overall assessed checks", assessmentStatus(result?.design_checks?.overall_pass)],
        ].map(([label, value]) => `
      <tr>
        <td>${escapeHtml(label)}</td>
        <td>${escapeHtml(value)}</td>
      </tr>
    `).join("");
    }
    return [
        ["Wall type", (wallCheck.wall_type ?? "n/a").replaceAll("_", " ")],
        ["Governing check", wallCheck.governing_check ?? "n/a"],
        ["Governing phase", wallCheck.governing_phase ?? "n/a"],
        ["Governing level", `${formatNumber(wallCheck.governing_level_m ?? 0, 2)} m`],
        ["Bending demand / capacity", `${formatNumber(wallCheck.bending_demand_kNm_per_m ?? 0, 2)} / ${formatNumber(wallCheck.bending_capacity_kNm_per_m ?? 0, 2)} kNm/m`],
        ["Bending governing point", `${wallCheck.bending_governing_phase ?? "n/a"} · ${formatNumber(wallCheck.bending_governing_level_m ?? 0, 2)} m`],
        ["Bending utilization", formatNumber(wallCheck.bending_utilization ?? 0, 2)],
        ["Shear demand / capacity", `${formatNumber(wallCheck.shear_demand_kN_per_m ?? 0, 2)} / ${formatNumber(wallCheck.shear_capacity_kN_per_m ?? 0, 2)} kN/m`],
        ["Shear governing point", `${wallCheck.shear_governing_phase ?? "n/a"} · ${formatNumber(wallCheck.shear_governing_level_m ?? 0, 2)} m`],
        ["Shear utilization", formatNumber(wallCheck.shear_utilization ?? 0, 2)],
        ["Cracked stiffness state", wallCheck.cracked_stiffness_state ?? "n/a"],
        ["Wall assessment", assessmentStatus(wallCheck.pass)],
        ["Displacement serviceability", formatServiceabilityAssessment(serviceability)],
        ["Overall assessed checks", assessmentStatus(result?.design_checks?.overall_pass)],
    ].map(([label, value]) => `
    <tr>
      <td>${escapeHtml(label)}</td>
      <td>${escapeHtml(value)}</td>
    </tr>
  `).join("");
}
function buildSampledResultRows(phase) {
    if (!phase?.sampled_results?.length) {
        return `<tr><td colspan="11">No sampled results returned for this phase.</td></tr>`;
    }
    return phase.sampled_results.map((item) => `
    <tr>
      <td>${escapeHtml(formatNumber(item.level_m ?? 0, 2))}</td>
      <td>${escapeHtml(formatNumber(item.depth_m ?? 0, 2))}</td>
      <td>${escapeHtml(formatNumber(item.displacement_mm ?? 0, 2))}</td>
      <td>${escapeHtml(formatNumber(item.rotation_mrad ?? 0, 2))}</td>
      <td>${escapeHtml(formatNumber(item.moment_kNm_per_m ?? 0, 2))}</td>
      <td>${escapeHtml(formatNumber(item.shear_kN_per_m ?? 0, 2))}</td>
      <td>${escapeHtml(formatNumber(item.net_soil_pressure_kPa ?? 0, 2))}</td>
      <td>${escapeHtml(formatNumber(item.water_pressure_kPa ?? 0, 2))}</td>
      <td>${escapeHtml(item.branch_state ?? "n/a")}</td>
      <td>${escapeHtml(item.left_branch ?? "n/a")}</td>
      <td>${escapeHtml(item.right_branch ?? "n/a")}</td>
    </tr>
  `).join("");
}
function buildResultProvenanceList(result) {
    const warnings = Array.isArray(result?.warnings) ? result.warnings : [];
    const assumptions = Array.isArray(result?.assumptions) ? result.assumptions : [];
    const sourceRefs = Array.isArray(result?.source_refs) ? result.source_refs : [];
    return [
        `<li>Formula version: ${escapeHtml(result?.formula_version || "n/a")}</li>`,
        `<li>Warnings: ${warnings.length ? warnings.map((item) => escapeHtml(item)).join(", ") : "none"}</li>`,
        `<li>Assumptions: ${assumptions.length ? assumptions.map((item) => escapeHtml(item)).join(" | ") : "none"}</li>`,
        `<li>Source refs: ${sourceRefs.length ? sourceRefs.map((item) => escapeHtml(item)).join(" | ") : "none"}</li>`,
    ].join("");
}
export function buildPhaseOverview(result, phaseIndex) {
    const phase = result.phases[phaseIndex];
    const overallPass = assessmentStatus(result.design_checks?.overall_pass);
    const serviceability = result.design_checks?.serviceability;
    const supportCheck = governingSupportCheck(result);
    const phaseSolverStatus = phase?.converged === false
        ? `Did not converge after ${phase?.iterations ?? "n/a"} iteration(s)`
        : `Converged in ${phase?.iterations ?? "n/a"} iteration(s)`;
    return [
        {
            title: "Selected-phase displacement",
            text: `${formatNumber(phase.envelope.max_abs_displacement_mm, 2)} mm`,
        },
        {
            title: "Selected-phase moment",
            text: `${formatNumber(phase.envelope.max_abs_moment_kNm_per_m, 2)} kNm/m`,
        },
        {
            title: "Selected-phase plastic offset",
            text: `${formatNumber(phase.envelope.max_abs_plastic_offset_mm ?? 0, 2)} mm`,
        },
        {
            title: "Displacement serviceability",
            text: formatServiceabilityAssessment(serviceability),
        },
        {
            title: "Wall utilization",
            text: `${formatNumber(result.design_checks?.wall?.bending_utilization ?? 0, 2)} bending · ${formatNumber(result.design_checks?.wall?.shear_utilization ?? 0, 2)} shear`,
        },
        {
            title: "Governing support",
            text: supportCheck
                ? `${supportCheck.support_id} · ${formatSupportCheckDemandCapacity(supportCheck)} · ${supportCheck.governing_phase ?? phase.name}`
                : "No support capacity checks",
        },
        {
            title: "Phase solver status",
            text: phaseSolverStatus,
        },
        {
            title: "Assessment status",
            text: `${overallPass} · ${result.design_checks?.wall?.governing_phase || phase.name}`,
        },
    ];
}
export function buildResultSummaryItems(result, phaseIndex = 0) {
    const phase = result?.phases?.[phaseIndex];
    if (!phase) {
        return [];
    }
    const supportCheck = governingSupportCheck(result);
    const wallCheck = result?.design_checks?.wall;
    const serviceability = result?.design_checks?.serviceability;
    const governing = result?.governing;
    const summary = [
        `Phase: ${phase.name}`,
        `Phase solver status: ${phase?.converged === false ? `did not converge after ${phase?.iterations ?? "n/a"} iteration(s)` : `converged in ${phase?.iterations ?? "n/a"} iteration(s)`}`,
        `Selected-phase max displacement: ${formatNumber(phase.envelope.max_abs_displacement_mm, 2)} mm`,
        `Selected-phase max moment: ${formatNumber(phase.envelope.max_abs_moment_kNm_per_m, 2)} kNm/m`,
        `Selected-phase max shear: ${formatNumber(phase.envelope.max_abs_shear_kN_per_m, 2)} kN/m`,
        `Selected-phase max plastic offset: ${formatNumber(phase.envelope.max_abs_plastic_offset_mm ?? 0, 2)} mm`,
        `Global displacement range: ${formatNumber(governing?.min_displacement_mm ?? 0, 2)} to ${formatNumber(governing?.max_displacement_mm ?? phase.envelope.max_abs_displacement_mm, 2)} mm`,
        `Global rotation range: ${formatNumber(governing?.min_rotation_mrad ?? 0, 2)} to ${formatNumber(governing?.max_rotation_mrad ?? 0, 2)} mrad`,
        `Global moment range: ${formatNumber(governing?.min_moment_kNm_per_m ?? 0, 2)} to ${formatNumber(governing?.max_moment_kNm_per_m ?? phase.envelope.max_abs_moment_kNm_per_m, 2)} kNm/m`,
        `Global shear range: ${formatNumber(governing?.min_shear_kN_per_m ?? 0, 2)} to ${formatNumber(governing?.max_shear_kN_per_m ?? phase.envelope.max_abs_shear_kN_per_m, 2)} kN/m`,
        `Governing |rotation|: ${formatNumber(governing?.max_abs_rotation_mrad ?? 0, 2)} mrad (${governing?.max_abs_rotation_phase ?? phase.name})`,
        `Governing |moment|: ${formatNumber(governing?.max_abs_moment_kNm_per_m ?? phase.envelope.max_abs_moment_kNm_per_m, 2)} kNm/m (${governing?.max_abs_moment_phase ?? phase.name})`,
        `Wall bending demand/capacity: ${formatNumber(result.design_checks?.wall?.bending_demand_kNm_per_m ?? 0, 2)} / ${formatNumber(result.design_checks?.wall?.bending_capacity_kNm_per_m ?? 0, 2)} kNm/m`,
        `Wall bending utilization: ${formatNumber(result.design_checks?.wall?.bending_utilization ?? 0, 2)}`,
        `Wall shear demand/capacity: ${formatNumber(result.design_checks?.wall?.shear_demand_kN_per_m ?? 0, 2)} / ${formatNumber(result.design_checks?.wall?.shear_capacity_kN_per_m ?? 0, 2)} kN/m`,
        `Wall governing level: ${formatNumber(wallCheck?.governing_level_m ?? 0, 2)} m`,
        `Wall assessment: ${assessmentStatus(wallCheck?.pass).toLowerCase()}`,
        `Displacement serviceability: ${formatServiceabilityAssessment(serviceability).toLowerCase()}`,
        supportCheck
            ? `Governing support demand/capacity: ${formatSupportCheckDemandCapacity(supportCheck)} (${supportCheck.support_id} · ${supportCheck.governing_phase})`
            : "Governing support utilization: n/a",
        `Overall assessed checks: ${assessmentStatus(result.design_checks?.overall_pass).toLowerCase()}`,
    ];
    if (result.search_evaluation) {
        summary.push(`Wall-length search selected toe: ${formatNumber(result.search_evaluation.selected_toe_level_m, 1)} m`, `Wall-length search stop reason: ${result.search_evaluation.stop_reason}`);
    }
    return summary;
}
export function buildResultHtml(result, phaseIndex) {
    const phase = result.phases[phaseIndex];
    const wallLengthSearch = result.search_evaluation;
    const plotData = buildPhasePlotData(result, phaseIndex);
    const { levels, displacement, rotation, moment, shear, pressure, waterPressure, source } = plotData;
    const cards = buildPhaseOverview(result, phaseIndex).map((card) => `
    <article class="result-card">
      <h3>${escapeHtml(card.title)}</h3>
      <p>${escapeHtml(card.text)}</p>
    </article>
  `).join("");
    return `
    <div class="result-grid">
      ${cards}
    </div>
    ${wallLengthSearch ? `
    <article class="result-card result-card-wide">
      <h3>Wall-length search</h3>
      <p>Selected toe ${formatNumber(wallLengthSearch.selected_toe_level_m, 1)} m after ${wallLengthSearch.trial_count} trial(s). Stop reason: ${escapeHtml(wallLengthSearch.stop_reason)}.</p>
    </article>` : ""}
    <article class="result-card result-card-wide">
      <h3>Solver discretization</h3>
      <p>${escapeHtml(buildDiscretizationSummary(result))}</p>
      <div class="table-shell">
        <table>
          <thead>
            <tr><th>Node</th><th>Level</th><th>Next element</th></tr>
          </thead>
          <tbody>${buildDiscretizationRows(result)}</tbody>
        </table>
      </div>
    </article>
    <article class="result-card result-card-wide">
      <h3>Solver provenance</h3>
      <p>Formula version, warnings, assumptions, and source references returned directly by the API for this run.</p>
      <ul class="result-meta-list">${buildResultProvenanceList(result)}</ul>
    </article>
    <article class="result-card result-card-wide">
      <h3>Global governing envelope</h3>
      <p>Backend-authored signed minima/maxima plus absolute extrema across all phases, including the controlling phase for each quantity.</p>
      <div class="table-shell">
        <table>
          <thead>
            <tr><th>Quantity</th><th>Min</th><th>Max</th><th>Max |abs|</th><th>Min phase</th><th>Max phase</th><th>Abs phase</th></tr>
          </thead>
          <tbody>${buildGlobalGoverningRows(result)}</tbody>
        </table>
      </div>
    </article>
    <article class="result-card result-card-wide">
      <h3>Wall design check</h3>
      <p>Explicit wall design-check metadata returned by the API, including governing level and pass state.</p>
      <div class="table-shell">
        <table>
          <thead>
            <tr><th>Check field</th><th>Value</th></tr>
          </thead>
          <tbody>${buildWallCheckRows(result)}</tbody>
        </table>
      </div>
    </article>
    <article class="result-card result-card-wide">
      <h3>Support design checks</h3>
      <p>Capacity-based support demand/capacity outputs returned by the API.</p>
      <div class="table-shell">
        <table>
          <thead>
            <tr><th>Support</th><th>Type</th><th>Demand</th><th>Capacity</th><th>Utilization</th><th>Governing phase</th><th>Status</th></tr>
          </thead>
          <tbody>${buildSupportCheckRows(result)}</tbody>
        </table>
      </div>
    </article>
    <article class="result-card result-card-wide">
      <h3>Wall deformed shape</h3>
      <p>${escapeHtml(plotSourceDescription(source, "displacement array"))}</p>
      ${buildDeformedWallSvg(levels, displacement)}
    </article>
    <article class="result-card">
      <h3>Displacement</h3>
      <p>${escapeHtml(plotSourceDescription(source, "displacement array"))}</p>
      ${buildSvgPlot(levels, displacement, "displacement", "Displacement plot")}
    </article>
    <article class="result-card">
      <h3>Rotation</h3>
      <p>${escapeHtml(plotSourceDescription(source, "rotation array"))}</p>
      ${buildSvgPlot(levels, rotation, "rotation", "Rotation plot")}
    </article>
    <article class="result-card">
      <h3>Bending moment</h3>
      <p>${escapeHtml(plotSourceDescription(source, "moment array"))}</p>
      ${buildSvgPlot(levels, moment, "moment", "Moment plot")}
    </article>
    <article class="result-card">
      <h3>Shear</h3>
      <p>${escapeHtml(plotSourceDescription(source, "shear array"))}</p>
      ${buildSvgPlot(levels, shear, "shear", "Shear plot")}
    </article>
    <article class="result-card">
      <h3>Net pressure</h3>
      <p>${escapeHtml(plotSourceDescription(source, "net soil pressure array"))}</p>
      ${buildSvgPlot(levels, pressure, "pressure", "Net pressure plot")}
    </article>
    <article class="result-card">
      <h3>Water pressure</h3>
      <p>${escapeHtml(plotSourceDescription(source, "water-pressure array"))}</p>
      ${buildSvgPlot(levels, waterPressure, "water", "Water pressure plot")}
    </article>
    <article class="result-card">
      <h3>Support-force table</h3>
      <p>Selected-phase support output with explicit horizontal force, moment, axial force, and utilization/state columns.</p>
      <div class="table-shell">
        <table>
          <thead>
            <tr><th>Support</th><th>Type</th><th>Side</th><th>Depth</th><th>Horizontal force</th><th>Moment</th><th>Axial force</th><th>Utilization / State</th></tr>
          </thead>
          <tbody>${buildSupportReactionRows(phase)}</tbody>
        </table>
      </div>
    </article>
    <article class="result-card result-card-wide">
      <h3>Sampled numerical output</h3>
      <p>Depth-wise API response table used for the plots and report without client-side engineering recomputation.</p>
      <div class="table-shell">
        <table>
          <thead>
            <tr><th>Level</th><th>Depth</th><th>Disp.</th><th>Rot.</th><th>Moment</th><th>Shear</th><th>Net p</th><th>Water p</th><th>Branch</th><th>Left</th><th>Right</th></tr>
          </thead>
          <tbody>${buildSampledResultRows(phase)}</tbody>
        </table>
      </div>
    </article>
  `;
}
export function buildResultDownloadText(project, result) {
    const analyzedProject = resolveAnalyzedProject(project, result);
    return formatJson({
        project: analyzedProject,
        result,
    });
}
export function buildResultFilename(project, date = new Date()) {
    const stamp = date.toISOString().replaceAll("-", "").replaceAll(":", "").replace(/\.\d{3}Z$/, "Z");
    return `ea-suys-${normalizeFileSlug(project.wall_type)}-${project.design_mode}-${stamp}.json`;
}
export function buildReportFilename(project, date = new Date()) {
    return buildResultFilename(project, date).replace(/\.json$/, ".html");
}
export function buildReportPreviewHtml(project, result, phaseIndex) {
    const phase = result.phases[phaseIndex];
    const displayProject = resolveAnalyzedProject(project, result);
    const wallSection = buildWallSectionMetadata(displayProject);
    const wallLengthSearch = result.search_evaluation;
    const supportCheck = governingSupportCheck(result);
    const wallCheck = result?.design_checks?.wall;
    const governing = result?.governing;
    return `
    <article class="report-card">
      <h3>HTML report export</h3>
      <p>The exported report includes project metadata, the selected phase summary, design checks, warnings, assumptions, and source references.</p>
      <ul class="report-list">
        ${buildResultSummaryItems(result, phaseIndex).map((line) => `<li>${escapeHtml(line)}</li>`).join("")}
        <li>Wall type: ${escapeHtml(displayProject.wall_type.replaceAll("_", " "))}</li>
        <li>${escapeHtml(wallSection.label)}: ${escapeHtml(wallSection.value)}</li>
        <li>Wall inclination: ${formatNumber(displayProject.wall_geometry.inclination_degrees ?? 0, 1)}°</li>
        <li>Phase vertical wall load: ${formatNumber(phase.normalized_vertical_line_load_kN_per_m ?? phase.vertical_line_load_kN_per_m ?? displayProject.phases[phaseIndex]?.vertical_line_load_kN_per_m ?? 0, 1)} kN/m</li>
        <li>Target element length: ${formatNumber(targetElementLengthForProject(displayProject), 2)} m</li>
        <li>Max wall displacement (project limit): ${Number.isFinite(displayProject.design_options?.max_wall_displacement_mm) ? `${formatNumber(displayProject.design_options?.max_wall_displacement_mm, 2)} mm` : "not declared"}</li>
        <li>Toe control: ${wallLengthSearch ? `search selected ${formatNumber(wallLengthSearch.selected_toe_level_m, 1)} m after ${wallLengthSearch.trial_count} trial(s)` : `fixed toe ${formatNumber(displayProject.wall_geometry.toe_level_m, 1)} m`}</li>
        <li>Discretization: ${escapeHtml(buildDiscretizationSummary(result))}</li>
        <li>Global displacement range: ${formatNumber(governing?.min_displacement_mm ?? 0, 2)} to ${formatNumber(governing?.max_displacement_mm ?? phase.envelope.max_abs_displacement_mm, 2)} mm</li>
        <li>Global rotation range: ${formatNumber(governing?.min_rotation_mrad ?? 0, 2)} to ${formatNumber(governing?.max_rotation_mrad ?? 0, 2)} mrad</li>
        <li>Global moment range: ${formatNumber(governing?.min_moment_kNm_per_m ?? 0, 2)} to ${formatNumber(governing?.max_moment_kNm_per_m ?? phase.envelope.max_abs_moment_kNm_per_m, 2)} kNm/m</li>
        <li>Global shear range: ${formatNumber(governing?.min_shear_kN_per_m ?? 0, 2)} to ${formatNumber(governing?.max_shear_kN_per_m ?? phase.envelope.max_abs_shear_kN_per_m, 2)} kN/m</li>
        <li>Governing |rotation|: ${formatNumber(governing?.max_abs_rotation_mrad ?? 0, 2)} mrad (${escapeHtml(governing?.max_abs_rotation_phase ?? phase.name)})</li>
        <li>Governing |moment|: ${formatNumber(governing?.max_abs_moment_kNm_per_m ?? phase.envelope.max_abs_moment_kNm_per_m, 2)} kNm/m (${escapeHtml(governing?.max_abs_moment_phase ?? phase.name)})</li>
        <li>Wall governing level: ${formatNumber(wallCheck?.governing_level_m ?? 0, 2)} m</li>
        <li>Wall governing check: ${escapeHtml(wallCheck?.governing_check ?? "n/a")} · demand/capacity ${formatNumber(wallCheck?.governing_check === "shear" ? wallCheck?.shear_demand_kN_per_m ?? 0 : wallCheck?.bending_demand_kNm_per_m ?? 0, 2)} / ${formatNumber(wallCheck?.governing_check === "shear" ? wallCheck?.shear_capacity_kN_per_m ?? 0 : wallCheck?.bending_capacity_kNm_per_m ?? 0, 2)} ${wallCheck?.governing_check === "shear" ? "kN/m" : "kNm/m"}</li>
        <li>Governing support check: ${supportCheck ? `${escapeHtml(supportCheck.support_id)} · demand/capacity ${escapeHtml(formatSupportCheckDemandCapacity(supportCheck))} · utilization ${formatNumber(supportCheck.utilization_ratio ?? 0, 2)} · ${escapeHtml(supportCheck.governing_phase ?? phase.name)}` : "none"}</li>
        <li>Warnings: ${escapeHtml((result.warnings || []).join(", ") || "none")}</li>
      </ul>
      <p class="report-note">Selected phase: ${escapeHtml(phase.name)}</p>
    </article>
  `;
}
export function buildReportHtml(project, result, phaseIndex = 0, generatedAt = new Date()) {
    const displayProject = resolveAnalyzedProject(project, result);
    const wallSection = buildWallSectionMetadata(displayProject);
    const phase = result.phases[phaseIndex];
    const summary = buildResultSummaryItems(result, phaseIndex);
    const supportItems = buildSupportReactionListItems(phase);
    const wallLengthSearch = result.search_evaluation;
    const plotData = buildPhasePlotData(result, phaseIndex);
    const { levels, displacement, rotation, moment, shear, pressure, waterPressure, source } = plotData;
    return [
        "<!DOCTYPE html>",
        '<html lang="en">',
        "<head>",
        '  <meta charset="UTF-8">',
        '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
        "  <title>EA Suys Retaining Wall Report</title>",
        "  <style>",
        "    body { font-family: Georgia, \"Times New Roman\", serif; color: #182022; margin: 28px; line-height: 1.5; }",
        "    h1 { margin-bottom: 8px; }",
        "    h2 { margin-top: 22px; font-size: 0.9rem; letter-spacing: 0.08em; text-transform: uppercase; color: #596265; }",
        "    dl { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }",
        "    dt { font-weight: 700; color: #596265; }",
        "    dd { margin: 4px 0 0; font-weight: 700; }",
        "    ul { padding-left: 18px; }",
        "    .figure-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; margin-top: 14px; }",
        "    .figure-card { border: 1px solid rgba(24, 32, 34, 0.12); border-radius: 16px; padding: 14px; background: rgba(255, 251, 243, 0.75); break-inside: avoid; }",
        "    .figure-card h3 { margin: 0 0 8px; font-size: 1rem; }",
        "    .figure-card p { margin: 0 0 10px; color: #596265; }",
        "    .figure-card svg { width: 100%; height: auto; display: block; }",
        "    .figure-card-wide { grid-column: 1 / -1; }",
        "    table { width: 100%; border-collapse: collapse; margin-top: 10px; }",
        "    th, td { border-bottom: 1px solid rgba(24, 32, 34, 0.12); padding: 8px 6px; text-align: left; }",
        "    th { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.06em; color: #596265; }",
        "    .note { color: #596265; }",
        "    @media (max-width: 900px) { .figure-grid { grid-template-columns: 1fr; } }",
        "  </style>",
        "</head>",
        "<body>",
        "  <h1>EA Suys Retaining Wall Report</h1>",
        `  <p class="note">Generated ${escapeHtml(generatedAt.toISOString())}</p>`,
        "  <h2>Project</h2>",
        `  <dl><div><dt>Wall type</dt><dd>${escapeHtml(displayProject.wall_type.replaceAll("_", " "))}</dd></div><div><dt>Design mode</dt><dd>${escapeHtml(displayProject.design_mode.toUpperCase())}</dd></div><div><dt>Selected phase</dt><dd>${escapeHtml(phase.name)}</dd></div><div><dt>Formula version</dt><dd>${escapeHtml(result.formula_version || "n/a")}</dd></div><div><dt>Wall inclination</dt><dd>${escapeHtml(formatNumber(displayProject.wall_geometry.inclination_degrees ?? 0, 1))}°</dd></div><div><dt>Vertical wall load</dt><dd>${escapeHtml(formatNumber(phase.normalized_vertical_line_load_kN_per_m ?? phase.vertical_line_load_kN_per_m ?? displayProject.phases[phaseIndex]?.vertical_line_load_kN_per_m ?? 0, 1))} kN/m</dd></div><div><dt>Target element length</dt><dd>${escapeHtml(formatNumber(targetElementLengthForProject(displayProject), 2))} m</dd></div><div><dt>Max wall displacement (project limit)</dt><dd>${Number.isFinite(displayProject.design_options?.max_wall_displacement_mm) ? `${escapeHtml(formatNumber(displayProject.design_options?.max_wall_displacement_mm, 2))} mm` : "Not declared"}</dd></div><div><dt>${escapeHtml(wallSection.label)}</dt><dd>${escapeHtml(wallSection.value)}</dd></div><div><dt>Toe control</dt><dd>${escapeHtml(wallLengthSearch ? `Search selected ${formatNumber(wallLengthSearch.selected_toe_level_m, 1)} m (${wallLengthSearch.stop_reason})` : `Fixed toe ${formatNumber(displayProject.wall_geometry.toe_level_m, 1)} m`)}</dd></div></dl>`,
        "  <h2>Summary</h2>",
        `  <ul>${summary.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`,
        "  <h2>Global Governing Envelope</h2>",
        `  <table><thead><tr><th>Quantity</th><th>Min</th><th>Max</th><th>Max |abs|</th><th>Min phase</th><th>Max phase</th><th>Abs phase</th></tr></thead><tbody>${buildGlobalGoverningRows(result)}</tbody></table>`,
        wallLengthSearch
            ? `  <h2>Wall-Length Search</h2>\n  <ul><li>Start toe: ${escapeHtml(formatNumber(wallLengthSearch.start_toe_level_m, 1))} m</li><li>Minimum toe: ${escapeHtml(formatNumber(wallLengthSearch.minimum_toe_level_m, 1))} m</li><li>Step: ${escapeHtml(formatNumber(wallLengthSearch.step_m, 2))} m</li><li>Target max head displacement: ${escapeHtml(formatNumber(wallLengthSearch.max_head_displacement_mm, 1))} mm</li><li>Selected toe: ${escapeHtml(formatNumber(wallLengthSearch.selected_toe_level_m, 1))} m</li><li>Achieved max head displacement: ${escapeHtml(formatNumber(wallLengthSearch.achieved_max_head_displacement_mm, 2))} mm</li><li>Stop reason: ${escapeHtml(wallLengthSearch.stop_reason)}</li></ul>`
            : "",
        "  <h2>Discretization</h2>",
        `  <p>${escapeHtml(buildDiscretizationSummary(result))}</p>`,
        `  <table><thead><tr><th>Node</th><th>Level</th><th>Next element</th></tr></thead><tbody>${buildDiscretizationRows(result)}</tbody></table>`,
        "  <h2>Figures</h2>",
        "  <div class=\"figure-grid\">",
        "    <article class=\"figure-card figure-card-wide\">",
        "      <h3>Geometry Preview</h3>",
        "      <p>Selected phase geometry, excavation, groundwater, surface levels, and support layout.</p>",
        buildGeometryPreviewSvg(displayProject, phaseIndex),
        "    </article>",
        "    <article class=\"figure-card\">",
        "      <h3>Wall Deformed Shape</h3>",
        `      <p>${escapeHtml(plotSourceDescription(source, "displacement array"))}</p>`,
        buildDeformedWallSvg(levels, displacement),
        "    </article>",
        "    <article class=\"figure-card\">",
        "      <h3>Displacement Plot</h3>",
        `      <p>${escapeHtml(plotSourceDescription(source, "displacement array"))}</p>`,
        buildSvgPlot(levels, displacement, "displacement", "Displacement plot"),
        "    </article>",
        "    <article class=\"figure-card\">",
        "      <h3>Rotation Plot</h3>",
        `      <p>${escapeHtml(plotSourceDescription(source, "rotation array"))}</p>`,
        buildSvgPlot(levels, rotation, "rotation", "Rotation plot"),
        "    </article>",
        "    <article class=\"figure-card\">",
        "      <h3>Bending Moment Plot</h3>",
        `      <p>${escapeHtml(plotSourceDescription(source, "moment array"))}</p>`,
        buildSvgPlot(levels, moment, "moment", "Moment plot"),
        "    </article>",
        "    <article class=\"figure-card\">",
        "      <h3>Shear Plot</h3>",
        `      <p>${escapeHtml(plotSourceDescription(source, "shear array"))}</p>`,
        buildSvgPlot(levels, shear, "shear", "Shear plot"),
        "    </article>",
        "    <article class=\"figure-card\">",
        "      <h3>Net Pressure Plot</h3>",
        `      <p>${escapeHtml(plotSourceDescription(source, "net soil pressure array"))}</p>`,
        buildSvgPlot(levels, pressure, "pressure", "Net pressure plot"),
        "    </article>",
        "    <article class=\"figure-card\">",
        "      <h3>Water Pressure Plot</h3>",
        `      <p>${escapeHtml(plotSourceDescription(source, "water-pressure array"))}</p>`,
        buildSvgPlot(levels, waterPressure, "water", "Water pressure plot"),
        "    </article>",
        "  </div>",
        "  <h2>Wall design check</h2>",
        `  <table><thead><tr><th>Check field</th><th>Value</th></tr></thead><tbody>${buildWallCheckRows(result)}</tbody></table>`,
        "  <h2>Support design checks</h2>",
        `  <ul>${buildSupportCheckList(result)}</ul>`,
        `  <table><thead><tr><th>Support</th><th>Type</th><th>Demand</th><th>Capacity</th><th>Utilization</th><th>Governing phase</th><th>Status</th></tr></thead><tbody>${buildSupportCheckRows(result)}</tbody></table>`,
        "  <h2>Support reactions</h2>",
        `  <ul>${supportItems}</ul>`,
        `  <table><thead><tr><th>Support</th><th>Type</th><th>Side</th><th>Depth</th><th>Horizontal force</th><th>Moment</th><th>Axial force</th><th>Utilization / State</th></tr></thead><tbody>${buildSupportReactionRows(phase)}</tbody></table>`,
        "  <h2>Sampled numerical output</h2>",
        `  <table><thead><tr><th>Level</th><th>Depth</th><th>Disp.</th><th>Rot.</th><th>Moment</th><th>Shear</th><th>Net p</th><th>Water p</th><th>Branch</th><th>Left</th><th>Right</th></tr></thead><tbody>${buildSampledResultRows(phase)}</tbody></table>`,
        "  <h2>Warnings</h2>",
        `  <ul>${(result.warnings || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("") || "<li>None</li>"}</ul>`,
        "  <h2>Assumptions</h2>",
        `  <ul>${(result.assumptions || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("") || "<li>None</li>"}</ul>`,
        "  <h2>Source refs</h2>",
        `  <ul>${(result.source_refs || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("") || "<li>None</li>"}</ul>`,
        "</body>",
        "</html>",
    ].join("\n");
}
function readStoredContactState() {
    try {
        const value = JSON.parse(localStorage.getItem(APP_STATE_STORAGE_KEY) || "null");
        if (!value || typeof value !== "object") {
            throw new Error("missing");
        }
        return {
            projectName: typeof value.projectName === "string" ? value.projectName : "",
            email: typeof value.email === "string" ? value.email : "",
            message: typeof value.message === "string" ? value.message : "",
            consent: value.consent === true,
        };
    }
    catch {
        return {
            projectName: "",
            email: "",
            message: "",
            consent: false,
        };
    }
}
function persistContactState(state) {
    localStorage.setItem(APP_STATE_STORAGE_KEY, JSON.stringify(state));
}
export function buildDirectMailto(contact, result, phaseIndex = 0) {
    const subjectBase = contact.projectName.trim() || "Retaining wall enquiry";
    const summary = buildResultSummaryItems(result, phaseIndex);
    const body = [
        "Retaining tools enquiry",
        "",
        `Project: ${contact.projectName.trim() || "Not provided"}`,
        `Email: ${contact.email.trim() || "Not provided"}`,
        "",
        "Question / context:",
        contact.message.trim() || "Please review this retaining wall result.",
        "",
        "Result summary:",
        ...(summary.length ? summary.map((line) => `- ${line}`) : ["- No result summary captured"]),
    ].join("\n");
    return `mailto:info@easuys.be?subject=${encodeURIComponent(`EA Suys Retaining Tools - ${subjectBase}`)}&body=${encodeURIComponent(body)}`;
}
export function buildContactPanelHtml(contactState, result, phaseIndex, statusText = "Ready.") {
    const fallbackMailto = buildDirectMailto(contactState, result, phaseIndex);
    return [
        `<article class="contact-card-panel">`,
        `<h3>Study request</h3>`,
        `<p>Use the same mailto-first handoff pattern as the structural tools. If the backend Turnstile secret is configured, the API can verify the challenge before preparing the mailto draft.</p>`,
        `<form class="contact-form" data-contact-form>`,
        `<label class="contact-field"><span>Project</span><input data-contact-project type="text" value="${escapeHtml(contactState.projectName)}"></label>`,
        `<label class="contact-field"><span>Email</span><input data-contact-email type="email" value="${escapeHtml(contactState.email)}"></label>`,
        `<label class="contact-field"><span>Message</span><textarea data-contact-message>${escapeHtml(contactState.message)}</textarea></label>`,
        `<label class="contact-consent"><input data-contact-consent type="checkbox" ${contactState.consent ? "checked" : ""}><span>I consent to using this mailto handoff for project follow-up.</span></label>`,
        `<div class="contact-turnstile" data-contact-turnstile></div>`,
        `<div class="contact-actions"><button type="submit" class="action-button">Prepare enquiry</button><a data-contact-fallback href="${escapeHtml(fallbackMailto)}">Open mailto directly</a></div>`,
        `<div class="result-status" data-contact-status>${escapeHtml(statusText)}</div>`,
        `</form>`,
        `</article>`,
    ].join("");
}
export function loadTurnstileScript(documentRef = globalThis.document, runtimeRef = globalThis) {
    if (runtimeRef?.turnstile) {
        return Promise.resolve(runtimeRef.turnstile);
    }
    if (turnstileScriptPromise) {
        return turnstileScriptPromise;
    }
    turnstileScriptPromise = new Promise((resolve, reject) => {
        if (!documentRef) {
            reject(new Error("No document"));
            return;
        }
        const existing = documentRef.querySelector(`script[src="${TURNSTILE_SCRIPT_URL}"]`);
        if (existing) {
            existing.addEventListener("load", () => resolve(runtimeRef?.turnstile), { once: true });
            existing.addEventListener("error", () => reject(new Error("Turnstile failed to load")), { once: true });
            return;
        }
        const script = documentRef.createElement("script");
        script.src = TURNSTILE_SCRIPT_URL;
        script.async = true;
        script.defer = true;
        script.addEventListener("load", () => resolve(runtimeRef?.turnstile), { once: true });
        script.addEventListener("error", () => reject(new Error("Turnstile failed to load")), { once: true });
        documentRef.head.appendChild(script);
    });
    return turnstileScriptPromise;
}
export async function runAnalysis(project, fetchImpl = fetch) {
    const response = await fetchImpl(`${API_BASE_URL}${ANALYSIS_ROUTE}`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(project),
    });
    if (!response.ok) {
        const body = await response.json().catch(() => ({ error: "Request failed." }));
        throw new Error(body.error || "Request failed.");
    }
    return response.json();
}
export function buildStudyRequestPayload(contactState, result, phaseIndex, turnstileToken = "", sourceUrl = globalThis.location?.href || "") {
    return {
        email: contactState.email.trim(),
        project_name: contactState.projectName.trim(),
        message: contactState.message.trim(),
        lead_tracking_consent: contactState.consent,
        source_tool: "retaining_flexible_wall_analysis",
        tool_label: "Flexible wall analysis",
        locale: "en",
        source_url: sourceUrl,
        result_summary: buildResultSummaryItems(result, phaseIndex),
        turnstile_token: turnstileToken,
    };
}
export async function submitStudyRequest(payload, fetchImpl = fetch) {
    const response = await fetchImpl(`${API_BASE_URL}${CONTACT_ENDPOINT}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
    });
    const body = await response.json();
    if (!response.ok) {
        throw new Error(body.error || "Unable to prepare the enquiry.");
    }
    return body;
}
function triggerDownload(filename, text, type) {
    const blob = new Blob([text], { type });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
}
function updateInputPreview(project, preview, geometry, phaseIndex) {
    preview.innerHTML = buildInputSnapshot(project, phaseIndex).map((card) => `
    <article class="snapshot-card">
      <strong>${escapeHtml(card.title)}</strong>
      <p>${escapeHtml(card.text)}</p>
    </article>
  `).join("");
    geometry.innerHTML = buildGeometryPreviewSvg(project, phaseIndex);
}
function updateProjectPhaseSelect(project, select, phaseIndex) {
    select.innerHTML = buildProjectPhaseOptions(project).map((option) => `
    <option value="${option.index}" ${option.index === phaseIndex ? "selected" : ""}>${escapeHtml(option.label)}</option>
  `).join("");
}
function updateResultPhaseSelect(result, select, phaseIndex) {
    select.innerHTML = buildPhaseOptions(result).map((option) => `
    <option value="${option.index}" ${option.index === phaseIndex ? "selected" : ""}>${escapeHtml(option.label)}</option>
  `).join("");
}
function renderContactPanel(shell, contactState, result, phaseIndex, onPersist) {
    shell.innerHTML = buildContactPanelHtml(contactState, result, phaseIndex);
    const status = shell.querySelector("[data-contact-status]");
    const form = shell.querySelector("[data-contact-form]");
    const projectInput = shell.querySelector("[data-contact-project]");
    const emailInput = shell.querySelector("[data-contact-email]");
    const messageInput = shell.querySelector("[data-contact-message]");
    const consentInput = shell.querySelector("[data-contact-consent]");
    const fallbackLink = shell.querySelector("[data-contact-fallback]");
    const turnstileTarget = shell.querySelector("[data-contact-turnstile]");
    const turnstileState = { token: "" };
    const persist = () => {
        const nextState = {
            projectName: projectInput.value,
            email: emailInput.value,
            message: messageInput.value,
            consent: consentInput.checked,
        };
        onPersist(nextState);
        fallbackLink.href = buildDirectMailto(nextState, result, phaseIndex);
    };
    [projectInput, emailInput, messageInput, consentInput].forEach((field) => {
        field.addEventListener("input", persist);
        field.addEventListener("change", persist);
    });
    loadTurnstileScript(document)
        .then((turnstile) => {
        if (!turnstile || turnstileTarget.dataset.loaded === "true") {
            return;
        }
        turnstileTarget.dataset.loaded = "true";
        turnstile.render(turnstileTarget, {
            sitekey: TURNSTILE_SITE_KEY,
            callback: (token) => {
                turnstileState.token = token;
                status.textContent = "Verification ready.";
            },
            "expired-callback": () => {
                turnstileState.token = "";
                status.textContent = "Verification expired. Mailto fallback remains available.";
            },
            "error-callback": () => {
                turnstileState.token = "";
                status.textContent = "Turnstile unavailable. Mailto fallback remains available.";
            },
        });
    })
        .catch(() => {
        status.textContent = "Turnstile unavailable. Mailto fallback remains available.";
    });
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        persist();
        status.textContent = "Preparing enquiry...";
        const payload = buildStudyRequestPayload({
            projectName: projectInput.value,
            email: emailInput.value,
            message: messageInput.value,
            consent: consentInput.checked,
        }, result, phaseIndex, turnstileState.token);
        try {
            const body = await submitStudyRequest(payload);
            status.textContent = "Enquiry prepared. Opening mail client...";
            globalThis.location.href = body.mailto || fallbackLink.href;
        }
        catch (error) {
            status.textContent = error instanceof Error ? error.message : "Unable to prepare the enquiry.";
        }
    });
}
function bootApp() {
    const input = document.querySelector("[data-project-input]");
    const quickEditor = document.querySelector("[data-quick-editor]");
    const runButton = document.querySelector("[data-run-analysis]");
    const preview = document.querySelector("[data-input-preview]");
    const geometry = document.querySelector("[data-geometry-preview]");
    const previewPhase = document.querySelector("[data-preview-phase]");
    const resultShell = document.querySelector("[data-result-shell]");
    const reportShell = document.querySelector("[data-report-shell]");
    const contactShell = document.querySelector("[data-contact-shell]");
    const phaseSelect = document.querySelector("[data-phase-select]");
    const status = document.querySelector("[data-status]");
    const downloadJsonButton = document.querySelector("[data-download-json]");
    const downloadHtmlButton = document.querySelector("[data-download-html]");
    const printButton = document.querySelector("[data-print-report]");
    if (!input ||
        !quickEditor ||
        !runButton ||
        !preview ||
        !geometry ||
        !previewPhase ||
        !resultShell ||
        !reportShell ||
        !contactShell ||
        !phaseSelect ||
        !status ||
        !downloadJsonButton ||
        !downloadHtmlButton ||
        !printButton) {
        return;
    }
    let currentProject = structuredClone(SAMPLE_PROJECT);
    let currentResult = null;
    let currentPreviewPhaseIndex = 0;
    let currentResultPhaseIndex = 0;
    let currentContactState = readStoredContactState();
    let currentEditorFocus = {
        segmentIndex: 0,
        leftLayerIndex: 0,
        rightLayerIndex: 0,
        supportIndex: 0,
    };
    const renderPreview = () => {
        currentEditorFocus = normalizeEditorFocus(currentProject, currentEditorFocus);
        updateProjectPhaseSelect(currentProject, previewPhase, currentPreviewPhaseIndex);
        updateInputPreview(currentProject, preview, geometry, currentPreviewPhaseIndex);
        quickEditor.innerHTML = buildQuickEditorHtml(currentProject, currentPreviewPhaseIndex, currentEditorFocus);
        bindQuickEditor();
    };
    const bindQuickEditor = () => {
        quickEditor.querySelectorAll("[data-qe-structure-action]").forEach((button) => {
            button.addEventListener("click", () => {
                const action = button.dataset.qeStructureAction;
                if (!action) {
                    return;
                }
                const nextState = applyQuickEditorStructureAction(currentProject, currentEditorFocus, action, currentPreviewPhaseIndex);
                currentProject = nextState.project;
                currentEditorFocus = nextState.focus;
                if (typeof nextState.previewPhaseIndex === "number") {
                    currentPreviewPhaseIndex = nextState.previewPhaseIndex;
                }
                input.value = formatJson(currentProject);
                renderPreview();
                if (currentResult) {
                    status.textContent = "Structured editor changed the payload. Rerun the analysis to refresh results.";
                }
            });
        });
        quickEditor.querySelectorAll("input, select").forEach((field) => {
            field.addEventListener("change", () => {
                if (field.matches("[data-qe-segment-index]") ||
                    field.matches("[data-qe-left-layer-index]") ||
                    field.matches("[data-qe-right-layer-index]") ||
                    field.matches("[data-qe-support-index]")) {
                    currentEditorFocus = normalizeEditorFocus(currentProject, {
                        segmentIndex: Number(quickEditor.querySelector("[data-qe-segment-index]")?.value ?? 0),
                        leftLayerIndex: Number(quickEditor.querySelector("[data-qe-left-layer-index]")?.value ?? 0),
                        rightLayerIndex: Number(quickEditor.querySelector("[data-qe-right-layer-index]")?.value ?? 0),
                        supportIndex: Number(quickEditor.querySelector("[data-qe-support-index]")?.value ?? 0),
                    });
                    renderPreview();
                    if (currentResult) {
                        status.textContent = "Structured editor focus changed. Rerun the analysis after editing to refresh results.";
                    }
                    return;
                }
                const editorPatch = {
                    phase_name: quickEditor.querySelector("[data-qe-phase-name]")?.value,
                    wall_type: quickEditor.querySelector("[data-qe-wall-type]")?.value,
                    design_mode: quickEditor.querySelector("[data-qe-design-mode]")?.value,
                    toe_mode: quickEditor.querySelector("[data-qe-toe-mode]")?.value,
                    top_level_m: Number(quickEditor.querySelector("[data-qe-top-level]")?.value),
                    toe_level_m: Number(quickEditor.querySelector("[data-qe-toe-level]")?.value),
                    search_start_toe_level_m: numberOrUndefined(quickEditor.querySelector("[data-qe-search-start]")?.value),
                    search_minimum_toe_level_m: numberOrUndefined(quickEditor.querySelector("[data-qe-search-minimum]")?.value),
                    search_step_m: numberOrUndefined(quickEditor.querySelector("[data-qe-search-step]")?.value),
                    search_max_head_displacement_mm: numberOrUndefined(quickEditor.querySelector("[data-qe-search-max-disp]")?.value),
                    target_element_length_m: numberOrUndefined(quickEditor.querySelector("[data-qe-target-element-length]")?.value),
                    max_wall_displacement_mm: numberOrUndefined(quickEditor.querySelector("[data-qe-max-wall-displacement]")?.value),
                    segment_label: quickEditor.querySelector("[data-qe-segment-label]")?.value,
                    segment_top_level_m: numberOrUndefined(quickEditor.querySelector("[data-qe-segment-top]")?.value),
                    segment_bottom_level_m: numberOrUndefined(quickEditor.querySelector("[data-qe-segment-bottom]")?.value),
                    inclination_degrees: Number(quickEditor.querySelector("[data-qe-inclination]")?.value),
                    segment_ei_kNm2_per_m: numberOrUndefined(quickEditor.querySelector("[data-qe-segment-ei]")?.value),
                    segment_cracked_ei_kNm2_per_m: numberOrUndefined(quickEditor.querySelector("[data-qe-segment-cracked-ei]")?.value),
                    segment_cracking_moment_kNm_per_m: numberOrUndefined(quickEditor.querySelector("[data-qe-segment-cracking-moment]")?.value),
                    segment_moment_resistance_kNm_per_m: numberOrUndefined(quickEditor.querySelector("[data-qe-segment-mr]")?.value),
                    segment_shear_resistance_kN_per_m: numberOrUndefined(quickEditor.querySelector("[data-qe-segment-vr]")?.value),
                    library_section_id: quickEditor.querySelector("[data-qe-library]")?.value,
                    section_name: quickEditor.querySelector("[data-qe-section-name]")?.value,
                    plastic_section_modulus_cm3_per_m: numberOrUndefined(quickEditor.querySelector("[data-qe-wpl]")?.value),
                    shear_area_cm2_per_m: numberOrUndefined(quickEditor.querySelector("[data-qe-av]")?.value),
                    steel_grade_mpa: numberOrUndefined(quickEditor.querySelector("[data-qe-fy]")?.value),
                    gamma_m0: numberOrUndefined(quickEditor.querySelector("[data-qe-gamma-m0]")?.value),
                    surface_level_left_m: numberOrUndefined(quickEditor.querySelector("[data-qe-surface-left]")?.value),
                    surface_level_right_m: numberOrUndefined(quickEditor.querySelector("[data-qe-surface-right]")?.value),
                    excavation_level_left_m: numberOrUndefined(quickEditor.querySelector("[data-qe-exc-left]")?.value),
                    excavation_level_right_m: numberOrUndefined(quickEditor.querySelector("[data-qe-exc-right]")?.value),
                    groundwater_level_left_m: numberOrUndefined(quickEditor.querySelector("[data-qe-gw-left]")?.value),
                    groundwater_level_right_m: numberOrUndefined(quickEditor.querySelector("[data-qe-gw-right]")?.value),
                    surcharge_left_kPa: numberOrUndefined(quickEditor.querySelector("[data-qe-sur-left]")?.value),
                    surcharge_right_kPa: numberOrUndefined(quickEditor.querySelector("[data-qe-sur-right]")?.value),
                    vertical_line_load_kN_per_m: numberOrUndefined(quickEditor.querySelector("[data-qe-vertical-load]")?.value),
                    include_vertical_line_second_order: (quickEditor.querySelector("[data-qe-second-order]")?.value === "true"),
                    left_top_level_m: numberOrUndefined(quickEditor.querySelector("[data-qe-left-top]")?.value),
                    left_bottom_level_m: numberOrUndefined(quickEditor.querySelector("[data-qe-left-bottom]")?.value),
                    left_unit_weight_dry_kN_m3: numberOrUndefined(quickEditor.querySelector("[data-qe-left-gamma-dry]")?.value),
                    left_unit_weight_wet_kN_m3: numberOrUndefined(quickEditor.querySelector("[data-qe-left-gamma-wet]")?.value),
                    left_friction_angle_deg: numberOrUndefined(quickEditor.querySelector("[data-qe-left-phi]")?.value),
                    left_cohesion_kPa: numberOrUndefined(quickEditor.querySelector("[data-qe-left-cohesion]")?.value),
                    left_wall_friction_deg: numberOrUndefined(quickEditor.querySelector("[data-qe-left-wall-friction]")?.value),
                    left_at_rest_coefficient: numberOrUndefined(quickEditor.querySelector("[data-qe-left-k0]")?.value),
                    left_active_coefficient: numberOrUndefined(quickEditor.querySelector("[data-qe-left-ka]")?.value),
                    left_passive_coefficient: numberOrUndefined(quickEditor.querySelector("[data-qe-left-kp]")?.value),
                    left_bedding_model: quickEditor.querySelector("[data-qe-left-bedding-model]")?.value,
                    left_tri_linear_displacement_breakpoints_mm: numberOrUndefined(quickEditor.querySelector("[data-qe-left-breakpoint-1]")?.value) !== undefined &&
                        numberOrUndefined(quickEditor.querySelector("[data-qe-left-breakpoint-2]")?.value) !== undefined
                        ? [
                            numberOrUndefined(quickEditor.querySelector("[data-qe-left-breakpoint-1]")?.value),
                            numberOrUndefined(quickEditor.querySelector("[data-qe-left-breakpoint-2]")?.value),
                        ]
                        : undefined,
                    left_tri_linear_stiffness_factors: numberOrUndefined(quickEditor.querySelector("[data-qe-left-factor-1]")?.value) !== undefined &&
                        numberOrUndefined(quickEditor.querySelector("[data-qe-left-factor-2]")?.value) !== undefined &&
                        numberOrUndefined(quickEditor.querySelector("[data-qe-left-factor-3]")?.value) !== undefined
                        ? [
                            numberOrUndefined(quickEditor.querySelector("[data-qe-left-factor-1]")?.value),
                            numberOrUndefined(quickEditor.querySelector("[data-qe-left-factor-2]")?.value),
                            numberOrUndefined(quickEditor.querySelector("[data-qe-left-factor-3]")?.value),
                        ]
                        : undefined,
                    left_subgrade_modulus_kN_m3: numberOrUndefined(quickEditor.querySelector("[data-qe-left-ks]")?.value),
                    left_pore_pressure_offset_kPa: numberOrUndefined(quickEditor.querySelector("[data-qe-left-pore]")?.value),
                    right_top_level_m: numberOrUndefined(quickEditor.querySelector("[data-qe-right-top]")?.value),
                    right_bottom_level_m: numberOrUndefined(quickEditor.querySelector("[data-qe-right-bottom]")?.value),
                    right_unit_weight_dry_kN_m3: numberOrUndefined(quickEditor.querySelector("[data-qe-right-gamma-dry]")?.value),
                    right_unit_weight_wet_kN_m3: numberOrUndefined(quickEditor.querySelector("[data-qe-right-gamma-wet]")?.value),
                    right_friction_angle_deg: numberOrUndefined(quickEditor.querySelector("[data-qe-right-phi]")?.value),
                    right_cohesion_kPa: numberOrUndefined(quickEditor.querySelector("[data-qe-right-cohesion]")?.value),
                    right_wall_friction_deg: numberOrUndefined(quickEditor.querySelector("[data-qe-right-wall-friction]")?.value),
                    right_at_rest_coefficient: numberOrUndefined(quickEditor.querySelector("[data-qe-right-k0]")?.value),
                    right_active_coefficient: numberOrUndefined(quickEditor.querySelector("[data-qe-right-ka]")?.value),
                    right_passive_coefficient: numberOrUndefined(quickEditor.querySelector("[data-qe-right-kp]")?.value),
                    right_bedding_model: quickEditor.querySelector("[data-qe-right-bedding-model]")?.value,
                    right_tri_linear_displacement_breakpoints_mm: numberOrUndefined(quickEditor.querySelector("[data-qe-right-breakpoint-1]")?.value) !== undefined &&
                        numberOrUndefined(quickEditor.querySelector("[data-qe-right-breakpoint-2]")?.value) !== undefined
                        ? [
                            numberOrUndefined(quickEditor.querySelector("[data-qe-right-breakpoint-1]")?.value),
                            numberOrUndefined(quickEditor.querySelector("[data-qe-right-breakpoint-2]")?.value),
                        ]
                        : undefined,
                    right_tri_linear_stiffness_factors: numberOrUndefined(quickEditor.querySelector("[data-qe-right-factor-1]")?.value) !== undefined &&
                        numberOrUndefined(quickEditor.querySelector("[data-qe-right-factor-2]")?.value) !== undefined &&
                        numberOrUndefined(quickEditor.querySelector("[data-qe-right-factor-3]")?.value) !== undefined
                        ? [
                            numberOrUndefined(quickEditor.querySelector("[data-qe-right-factor-1]")?.value),
                            numberOrUndefined(quickEditor.querySelector("[data-qe-right-factor-2]")?.value),
                            numberOrUndefined(quickEditor.querySelector("[data-qe-right-factor-3]")?.value),
                        ]
                        : undefined,
                    right_subgrade_modulus_kN_m3: numberOrUndefined(quickEditor.querySelector("[data-qe-right-ks]")?.value),
                    right_pore_pressure_offset_kPa: numberOrUndefined(quickEditor.querySelector("[data-qe-right-pore]")?.value),
                    support_id: quickEditor.querySelector("[data-qe-support-id]")?.value,
                    support_type: quickEditor.querySelector("[data-qe-support-type]")?.value,
                    support_side: quickEditor.querySelector("[data-qe-support-side]")?.value,
                    support_depth_m: numberOrUndefined(quickEditor.querySelector("[data-qe-support-depth]")?.value),
                    support_active_from_phase: numberOrUndefined(quickEditor.querySelector("[data-qe-support-active-from]")?.value),
                    support_active_to_phase: (quickEditor.querySelector("[data-qe-support-active-to]")?.value === "")
                        ? null
                        : numberOrUndefined(quickEditor.querySelector("[data-qe-support-active-to]")?.value),
                    support_inclination_degrees: numberOrUndefined(quickEditor.querySelector("[data-qe-support-inclination]")?.value),
                    support_stiffness_kN_per_m: numberOrUndefined(quickEditor.querySelector("[data-qe-support-stiffness]")?.value),
                    support_prestress_kN_per_m: numberOrUndefined(quickEditor.querySelector("[data-qe-support-prestress]")?.value),
                    support_capacity_kN_per_m: numberOrUndefined(quickEditor.querySelector("[data-qe-support-capacity]")?.value),
                    support_force_kN_per_m: numberOrUndefined(quickEditor.querySelector("[data-qe-support-force]")?.value),
                    support_moment_kNm_per_m: numberOrUndefined(quickEditor.querySelector("[data-qe-support-moment]")?.value),
                    anchor_inclination_degrees: numberOrUndefined(quickEditor.querySelector("[data-qe-anchor-inclination]")?.value),
                };
                const changedField = field.matches("[data-qe-top-level]")
                    ? "top_level_m"
                    : field.matches("[data-qe-toe-level]")
                        ? "toe_level_m"
                        : field.matches("[data-qe-segment-top]")
                            ? "segment_top_level_m"
                            : field.matches("[data-qe-segment-bottom]")
                                ? "segment_bottom_level_m"
                                : field.matches("[data-qe-design-mode]")
                                    ? "design_mode"
                                    : "";
                currentProject = applyQuickEditorPatch(currentProject, currentPreviewPhaseIndex, reconcileQuickEditorEventPatch(changedField, editorPatch), currentEditorFocus);
                input.value = formatJson(currentProject);
                renderPreview();
                if (currentResult) {
                    status.textContent = "Quick editor updated the payload. Rerun the analysis to refresh results.";
                }
            });
        });
    };
    const renderResults = () => {
        if (!currentResult) {
            resultShell.innerHTML = "";
            reportShell.innerHTML = `<article class="report-card"><h3>Exports</h3><p>Run the analysis to enable JSON download, HTML report export, and the inline study request flow.</p></article>`;
            contactShell.innerHTML = "";
            return;
        }
        updateResultPhaseSelect(currentResult, phaseSelect, currentResultPhaseIndex);
        resultShell.innerHTML = buildResultHtml(currentResult, currentResultPhaseIndex);
        reportShell.innerHTML = buildReportPreviewHtml(currentProject, currentResult, currentResultPhaseIndex);
        renderContactPanel(contactShell, currentContactState, currentResult, currentResultPhaseIndex, (nextState) => {
            currentContactState = nextState;
            persistContactState(currentContactState);
        });
    };
    input.value = formatJson(currentProject);
    renderPreview();
    renderResults();
    input.addEventListener("input", () => {
        try {
            currentProject = JSON.parse(input.value);
            currentPreviewPhaseIndex = Math.min(currentPreviewPhaseIndex, Math.max(0, currentProject.phases.length - 1));
            currentEditorFocus = normalizeEditorFocus(currentProject, currentEditorFocus);
            renderPreview();
            status.textContent = "Payload parsed. Ready to run.";
            status.classList.remove("status-error");
        }
        catch {
            status.textContent = "Payload JSON is invalid.";
            status.classList.add("status-error");
        }
    });
    previewPhase.addEventListener("change", () => {
        currentPreviewPhaseIndex = Number(previewPhase.value);
        renderPreview();
    });
    phaseSelect.addEventListener("change", () => {
        if (!currentResult) {
            return;
        }
        currentResultPhaseIndex = Number(phaseSelect.value);
        renderResults();
    });
    runButton.addEventListener("click", async () => {
        try {
            status.textContent = "Running phased analysis...";
            status.classList.remove("status-error");
            currentProject = JSON.parse(input.value);
            currentResult = await runAnalysis(currentProject);
            currentResultPhaseIndex = 0;
            renderPreview();
            renderResults();
            downloadJsonButton.disabled = false;
            downloadHtmlButton.disabled = false;
            printButton.disabled = false;
            status.textContent = `Solved ${currentResult.phases.length} phase(s). Governing |M|max: ${formatNumber(currentResult.governing.max_abs_moment_kNm_per_m, 2)} kNm/m.`;
        }
        catch (error) {
            status.textContent = error instanceof Error ? error.message : "Analysis failed.";
            status.classList.add("status-error");
        }
    });
    downloadJsonButton.addEventListener("click", () => {
        if (!currentResult) {
            return;
        }
        const analyzedProject = resolveAnalyzedProject(currentProject, currentResult);
        triggerDownload(buildResultFilename(analyzedProject), buildResultDownloadText(currentProject, currentResult), "application/json");
    });
    downloadHtmlButton.addEventListener("click", () => {
        if (!currentResult) {
            return;
        }
        const analyzedProject = resolveAnalyzedProject(currentProject, currentResult);
        triggerDownload(buildReportFilename(analyzedProject), buildReportHtml(currentProject, currentResult, currentResultPhaseIndex), "text/html;charset=utf-8");
    });
    printButton.addEventListener("click", () => {
        if (!currentResult) {
            return;
        }
        const reportHtml = buildReportHtml(currentProject, currentResult, currentResultPhaseIndex);
        const printWindow = window.open("", "_blank", "noopener,noreferrer");
        if (!printWindow) {
            status.textContent = "Unable to open a print window.";
            status.classList.add("status-error");
            return;
        }
        printWindow.document.open();
        printWindow.document.write(reportHtml);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    });
}
if (typeof document !== "undefined") {
    bootApp();
}
