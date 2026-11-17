const themeButton = document.querySelector('#theme');
let savedTheme;
try { savedTheme = localStorage.getItem('varun-theme'); } catch {}
function setTheme(dark) {
  document.body.classList.toggle('dark', dark);
  themeButton.textContent = dark ? '☀' : '☾';
  themeButton.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  document.querySelector('meta[name="theme-color"]').content = dark ? '#141414' : '#ffffff';
}
setTheme(savedTheme === 'dark');
themeButton.addEventListener('click', () => {
  const dark = !document.body.classList.contains('dark');
  setTheme(dark);
  try { localStorage.setItem('varun-theme', dark ? 'dark' : 'light'); } catch {}
});
const technologies = [['Python','python'],['JavaScript','javascript'],['TypeScript','typescript'],['React','react'],['TensorFlow','tensorflow'],['Keras','keras'],['NumPy','numpy'],['Pandas','pandas'],['Scikit-learn','scikitlearn'],['FastAPI','fastapi'],['PostgreSQL','postgresql'],['Docker','docker'],['Git','git'],['GitHub','github'],['Streamlit','streamlit']];
const stack = document.querySelector('#tech-stack');
for (const [name, icon] of technologies) {
  const item = document.createElement('span'); item.className = 'tech';
  const image = document.createElement('img'); image.src = `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/${icon}/${icon}-original.svg`; image.alt = ''; image.loading = 'lazy'; image.width = 16; image.height = 16;
  image.addEventListener('error', () => image.remove(), {once:true});
  item.append(image, document.createTextNode(name)); stack.append(item);
}
document.querySelector('#copy').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try { await navigator.clipboard.writeText(location.href.split('#')[0]); status.textContent = 'Link copied'; }
  catch { status.textContent = 'Copy the link from your address bar'; }
  setTimeout(() => { status.textContent = ''; }, 4000);
});
const chart = document.querySelector('.activity img');
chart.addEventListener('error', () => { chart.hidden = true; }, {once:true});
document.querySelector('#year').textContent = new Date().getFullYear();
const roles = ['AI / ML Engineer', 'Curious Builder', 'First-Principles Thinker'];
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let index = 0;
  setInterval(() => { if (!document.hidden) document.querySelector('#role').textContent = roles[++index % roles.length]; }, 4000);
}
const sections = [...document.querySelectorAll('#home, #projects, #about')];
if ('IntersectionObserver' in window) new IntersectionObserver(entries => {
  for (const entry of entries) if (entry.isIntersecting) document.querySelectorAll('nav a').forEach(link => link.classList.toggle('active', link.hash === '#' + entry.target.id));
}, {rootMargin:'-10% 0px -55% 0px'}).observe(sections[0]);
