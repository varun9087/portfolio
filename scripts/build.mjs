import fs from 'node:fs';
import path from 'node:path';
import {build} from 'esbuild';
import {execFileSync} from 'node:child_process';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {Github,PanelTop,Filter,Monitor,PanelsTopLeft,PartyPopper,CodeXml,TextCursorInput,Sparkles,Search,Command,CheckCircle2} from 'lucide-react';
const iconMarkup = Icon => renderToStaticMarkup(createElement(Icon,{size:20,strokeWidth:1.5,'aria-hidden':true}));
const componentIcons={'floating-toolbar':PanelTop,'filter-selector':Filter,'scroll-progress':Monitor,'floating-tabs':PanelsTopLeft,'confetti-button':PartyPopper,'scramble-text':CodeXml,'animated-text-slider':TextCursorInput,'shiny-text':Sparkles,'search-bar':Search,'command-palette':Command};
await build({entryPoints:['src/demos.jsx'],bundle:true,minify:true,format:'esm',outfile:'assets/demos.js',jsx:'automatic',define:{'process.env.NODE_ENV':'"production"'}});
execFileSync(process.execPath,['node_modules/@tailwindcss/cli/dist/index.mjs','-i','src/components.css','-o','assets/components.css','--minify'],{stdio:'inherit'});
const entries=JSON.parse(fs.readFileSync('src/catalog.json','utf8'));
const header=(active)=>`<header><nav aria-label="Main navigation"><a href="index.html" ${active==='home'?'aria-current="page"':''}>Home</a><a href="about/" ${active==='about'?'aria-current="page"':''}>About</a><a href="components/" ${active==='components'?'aria-current="page"':''}>Components</a></nav><button id="theme" class="icon-button" aria-label="Toggle theme"><svg viewBox="0 0 24 24"><path d="M20 14a8 8 0 0 1-10-10 8 8 0 1 0 10 10Z"/></svg></button></header>`;
const footer=`<footer><span>© <span id="year">2026</span> Varun S.</span><div><a href="about/">About</a><a href="services/">Services</a><a href="components/">Components</a></div><div class="footer-socials"><a href="https://x.com/varun_XJ" aria-label="X (Twitter)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 3h4l12 18h-4L4 3Z"/><path d="m20 3-7 8M4 21l7-8"/></svg></a><a href="mailto:writevarun2006@gmail.com" aria-label="Email Varun"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></svg></a><a href="https://github.com/varun9087" aria-label="GitHub">${iconMarkup(Github)}</a></div></footer>`;
function page(title,body,active='home',depth=1){return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><base href="${'../'.repeat(depth)||'./'}"><meta name="theme-color" content="#ffffff"><title>${title} | Varun S</title><meta name="description" content="Varun S — AI/ML engineer, projects, and interactive UI components."><link rel="icon" href="assets/cat.png"><link rel="preload" href="assets/fonts/geist.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="assets/components.css"><link rel="stylesheet" href="style.css"><script src="app.js" defer></script></head><body><a class="skip" href="#main">Skip to content</a><div class="shell">${header(active)}<main id="main">${body}</main>${footer}</div><div id="toast" role="status"></div></body></html>`;}
function removeLinkArrows(html){return html.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/g,(whole,attrs,content)=>{const clean=content.replace(/[↗↘→←]/g,'').replace(/<span class="hover-arrow"[^>]*><\/span>/g,'');return clean.trim()?'<a'+attrs+'>'+clean+'</a>':''})}
function write(file,contents){fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,file.endsWith('.html')?removeLinkArrows(contents):contents)}
let home=fs.readFileSync('src/home.html','utf8');write('index.html',page('AI/ML Engineer',home,'home',0));
write('about/index.html',page('About',fs.readFileSync('src/about.html','utf8'),'about'));
write('services/index.html',page('Services',fs.readFileSync('src/services.html','utf8')));
write('components/index.html',page('Components',`<div class="collection-intro"><div class="badges"><span>10 COMPONENTS</span><span>OPEN SOURCE</span></div><h1>Components</h1><p>Interactive React components with thoughtful motion and small details. Explore the demos, copy the code, and make them your own.</p><div class="collection-benefits"><span>${iconMarkup(CheckCircle2)} Copy &amp; Paste</span><span>${iconMarkup(CheckCircle2)} Tailwind CSS</span><span>${iconMarkup(CheckCircle2)} Interactive</span></div></div><div class="component-grid">${entries.map((c,i)=>`<a class="component-card" href="components/${c.slug}/"><span class="component-icon">${iconMarkup(componentIcons[c.slug])}</span><div><h2>${c.title}${i<3?'<i></i>':''}</h2><p>${c.description}</p></div></a>`).join('')}</div><div class="library-credit"><img src="assets/cat.png" width="40" height="40" alt="Varun's cat"><strong>varun-ui</strong><span>Curated by Varun S</span></div>`,'components'));
for(const c of entries){
 const source=fs.readFileSync(`src/components/${c.slug}.jsx`,'utf8');
 // Distribute the exact locally built source, including accessibility fixes.
 const registry=JSON.parse(fs.readFileSync(`r/${c.slug}.json`,'utf8'));registry.files[0].content=source;registry.dependencies=['react','framer-motion','canvas-confetti'];write(`r/${c.slug}.json`,JSON.stringify(registry,null,2));
 write(`components/${c.slug}/index.html`,page(c.title,`<a class="back mono" href="components/">← Back to Components</a><h1 class="detail-title">${c.title}</h1><p class="detail-description">${c.description}</p><div id="component-demo" data-component="${c.slug}"></div><script type="module" src="assets/demos.js"></script>`,'components',2));
}
console.log('Built home, about, services, component collection, and 10 component pages.');

// Publish only the site, not source files or node_modules. Use the same explicit
// output directory locally and on Vercel instead of framework auto-detection.
const output = path.resolve('dist');
if (output !== path.join(process.cwd(), 'dist')) throw new Error('Invalid output directory');
fs.rmSync(output, {recursive:true, force:true});
fs.mkdirSync(output, {recursive:true});
for (const entry of ['index.html','sentinel.html','style.css','app.js','about','services','components','assets','r']) {
 fs.cpSync(entry, path.join(output, entry), {recursive:true});
}
console.log('Packaged static deployment in dist/.');
