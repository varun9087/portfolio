# Reference audit — 2026-11-17

Reference: https://siddz.com/ and its About, Services, and Components routes.

- Shared shell: local Geist / JetBrains Mono, grid, sticky navigation, persistent theme, responsive layout.
- Home: personalized profile and metadata, rotating role, social tooltips, live GitHub contribution grid, technology tooltips, actual projects and experience, two-column contact panel, rotating quote.
- Footer: reference desktop grouping, divider, spacing, navigation, social tooltips, and centered mobile stacking.
- About: personalized story, working approach, interests, and contact links.
- Services: directory and all 23 reference route names, with breadcrumbs, scope, technologies, deliverables, projects, related links, and contact actions.
- Components: all 10 registry demos, preview/code, fullscreen, installation choices, copying, usage, and props.
- Requested differences: Varun's identity, cat, projects, Chennai, he/him, email and X; no decorative link arrows or visible siddz-ui credit; Apple Music profile instead of Spotify; scheduling through email.
- Contact form opens an email draft. It does not deliver server-side.
- Apple Music is the supplied profile link, not live playback data.
- Visitor ordinal backend is implemented but requires Redis configuration. No fabricated count is shown.

Validation: 37 generated pages and local links checked; production build and JavaScript syntax checks pass; mocked server tests cover disabled configuration, malformed requests, upstream failure, and valid count responses. Browser visual comparison was unavailable for this pass; this is not a claim of pixel-perfect or complete live-service parity.
