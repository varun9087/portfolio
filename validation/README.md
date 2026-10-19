# Portfolio validation — 19 October 2026

Sentinel AI case study content was checked against the public main branch: architecture and security docs, evaluation and RAG services, access dependencies, Python SDK, frontend API client, and dashboard error handling. Screenshots are copied from docs/screenshots in that repository. No public hosted demo URL was found; the page links to the repository's local quick start.

## Mobile Lighthouse
Local static server, Lighthouse default mobile simulation, headless Microsoft Edge. Latest results are in portfolio-lighthouse-mobile.report.html and .json.

- Performance: 93
- Accessibility: 100
- Best practices: 100
- SEO: 100
- Largest contentful paint: 2.6 s
- Total blocking time: 0 ms
- Cumulative layout shift: 0.001

Initial run: performance 82, accessibility 97. Changes reduced mobile neural nodes from 190 to 96, capped drawing at 30 fps, improved text contrast, added image dimensions, and replaced CSS font imports with earlier stylesheet links and preconnections. Animation still stops offscreen and supports reduced motion.

## Browser checks
- Case study rendered at 390 x 844 and 1440 x 1000 viewports without document horizontal overflow.
- Three repository screenshots loaded successfully.
- Case study anchor navigation works; source links target the relevant repository files.
- No JavaScript console errors recorded in the preview browser.
- JavaScript syntax checks and Git whitespace checks passed.

These are local synthetic results, not production hosting measurements. A physical phone, Safari, Firefox, assistive technology, and actual low-powered hardware have not been tested. Automated accessibility scores do not replace manual accessibility evaluation. Sentinel AI's own backend tests were inspected as source context, not executed in this portfolio task.
