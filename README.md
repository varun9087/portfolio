# Varun S — Portfolio

A static portfolio with Home, About, Services, and a ten-component React demo collection. The visual layout follows the user-selected reference at https://siddz.com/; portfolio details, projects, email, and avatar belong to Varun.

## Develop

- `npm ci`
- `npm run build` — bundles interactive demos, compiles Tailwind, and generates all pages.
- `node scripts/serve.mjs` — preview at http://127.0.0.1:5501.

Deploy the repository as a static site. Generated HTML and bundled assets are committed, so the existing static host does not need a Node build step. Routes use directory index files and relative base paths, including deployments beneath a repository path.

## Edit

- `src/home.html`, `src/about.html`, `src/services.html`: page content.
- `scripts/build.mjs`: shared page shell and generated component routes.
- `src/catalog.json`: component listing and descriptions.
- `src/demos.jsx`: demos, code/preview UI, installation commands, and prop tables.
- `src/components/`: reusable component implementations.
- `style.css`: portfolio and documentation styles.
- `app.js`: theme, email draft, contribution chart, role slider, and tech stack.

Run `npm run build` after editing source pages or components. The build updates registry JSON to match the actual component source.

## Data and integrations

Contact: writevarun2006@gmail.com. The contact form opens a prefilled email draft using `mailto:`; the visitor sends it in their email client. It does not claim delivery or depend on an unconfigured server.

GitHub contributions load from github-contributions-api.jogruber.de for varun9087, with a GitHub link if the service is unavailable. Fonts and technology icons are local. No invented visitor count, music history, booking URL, or social account is displayed. Booking and Spotify require Varun's own account integrations.

## Credits

The ten reusable React components originate from Siddharth Meena's public siddz-ui registry, https://siddz.com/components. Their original source URLs are recorded in THIRD_PARTY.md and linked on each demo page. Local adaptations add accessible toolbar labels and scope the shiny-text CSS. These components are not presented as originally authored by Varun.

Geist and JetBrains Mono are open-source fonts; license notices are in assets/fonts. Technology icons are from Devicon. The avatar is the image supplied by the user. Sentinel AI screenshots were already in this repository.

The older `validation/` reports describe the previous design and are not validation results for this version.
