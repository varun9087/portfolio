import {services} from '../src/services.mjs';
import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';
const catalog=JSON.parse(fs.readFileSync('src/catalog.json'));
const pages=['index.html','about/index.html','services/index.html','components/index.html',...catalog.map(c=>`components/${c.slug}/index.html`)];
pages.push(...services.map(s=>`services/${s.slug}/index.html`));
const output=path.resolve('dist');
assert(fs.existsSync(path.join(output,'index.html')), 'Run npm run build before checking deployment output');
for(const file of [...pages,'sentinel.html','assets/demos.js','assets/components.css','assets/cat.png']) {
 assert(fs.existsSync(path.join(output,file)), `Missing deployment file: ${file}`);
 assert.equal(fs.readFileSync(path.join(output,file),'utf8'),fs.readFileSync(file,'utf8'),`Stale deployment file: ${file}`);
}
for(const file of ['package.json','node_modules','src','.git']) assert(!fs.existsSync(path.join(output,file)), `Private build files leaked into dist: ${file}`);
for(const file of pages){const html=fs.readFileSync(file,'utf8');assert(html.includes('Varun S'),file+' missing identity');const base=html.match(/<base href="([^"]+)"/)[1];for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)){const url=m[1];if(/^(https?:|mailto:|data:|#)/.test(url)||url===base)continue;let resolved=path.resolve(path.dirname(file),base,url.split('#')[0]);if(fs.existsSync(resolved)&&fs.statSync(resolved).isDirectory())resolved=path.join(resolved,'index.html');assert(fs.existsSync(resolved),`${file}: broken local link ${url}`)}assert(!html.includes('siddz.dev@gmail.com'),'Reference email leaked');}
for(const c of catalog){const registry=JSON.parse(fs.readFileSync(`r/${c.slug}.json`));assert.equal(registry.files[0].content,fs.readFileSync(`src/components/${c.slug}.jsx`,'utf8'))}
console.log(`Validated ${pages.length} pages, local links, identity, and 10 registry sources.`);
