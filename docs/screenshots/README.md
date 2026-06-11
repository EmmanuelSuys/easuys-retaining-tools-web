# Retaining Workspace Screenshots

Generated screenshots for the `plan.md` acceptance set live here.

Files:
- `project-editor-desktop.png`
- `project-editor-mobile.png`
- `live-geometry-desktop.png`
- `live-geometry-mobile.png`
- `results-workspace-desktop.png`
- `results-workspace-mobile.png`
- `contact-report-desktop.png`
- `contact-report-mobile.png`

Regenerate them with:

```bash
npm run screenshots:render
```

The renderer uses the shipped frontend helpers plus `wkhtmltoimage`, so the captures come from deterministic local sample project/result state rather than an ad hoc manual browser session.
