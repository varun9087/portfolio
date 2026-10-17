# Varun S — Portfolio (Version 3)

Complete editable source of the enhanced portfolio, including the neural field, project panels, filters, and live regression lab.

## Open locally
1. Extract this ZIP (do not edit inside the ZIP).
2. Open the varun-portfolio folder in VS Code.
3. Double-click index.html to view it in a browser. No installation or build is required.

Optional local server, from this folder if Python is installed:

    python -m http.server 5500

On Windows you can also use:

    py -m http.server 5500

Then open http://localhost:5500. Press Ctrl+C to stop the server.

## What to edit
- index.html: name, biography, employment, main project descriptions, statistics, links, and section structure.
- style.css: colors, fonts, spacing, responsive layouts, and visual styling. The Volume 02 section near the bottom contains the enhanced design overrides.
- app.js: project detail data (projects), extra repository list (archive), neural-field rendering, and page interactions.
- lab.js: synthetic regression experiment, project filters, and section navigation indicators.

Search for varun9087 to change GitHub links. Main project text appears in both index.html and the projects object in app.js; update both when changing a featured project. Archive filter categories are mapped in lab.js, so update that mapping when reordering or adding archive entries.

Save an edited file and refresh your browser. Use Ctrl+F5 if an old version remains cached.

## Dependencies and data
This is plain HTML, CSS, and JavaScript, not React. No npm install, backend, API keys, or account login is required locally. Google Fonts loads DM Sans and Instrument Serif when online; system fonts are used if unavailable. All artwork is generated with CSS, SVG, and canvas, so no image assets are missing.

LeetCode numbers are the supplied October 2026 snapshot, not a live feed. The lab uses synthetic data and does not load the trained GitHub models. GitHub links require internet access.

## Hosting and future updates
Upload these five web files together to a static host, keeping their relative paths. index.html must be the entry point. Local edits do not automatically update the existing hosted portfolio.

The export intentionally excludes service-specific hosting configuration, Git history, and credentials. You can keep your own version history by initializing a new Git repository in this folder.

## Version 3 additions
Larger and bolder typography, enhanced transitions, regression dataset presets, single-step training, a loss-history chart, and a second interactive neural-network demo.

- experience.js: accessible demo tabs, live 2-3-1 forward propagation, and signal tracing.
- lab.js: regression training, datasets, loss history, filtering, and section markers.
- style.css: Volume 03 overrides appear near the bottom.

The neural network uses fixed illustrative weights, not a trained project model. Both demos run entirely in your browser.
