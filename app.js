const $ = (selector) => document.querySelector(selector);
const themeButton = $('#theme');
let savedTheme; try {savedTheme=localStorage.getItem('varun-theme')} catch {}
function setTheme(dark){document.documentElement.classList.toggle('dark',dark);document.body.classList.toggle('dark',dark);themeButton?.setAttribute('aria-label',dark?'Switch to light theme':'Switch to dark theme');document.querySelector('meta[name="theme-color"]')?.setAttribute('content',dark?'#0a0a0a':'#ffffff');}
setTheme(savedTheme==='dark');
themeButton?.addEventListener('click',()=>{const dark=!document.documentElement.classList.contains('dark');setTheme(dark);try{localStorage.setItem('varun-theme',dark?'dark':'light')}catch{}});
let toastTimer;function toast(message){const el=$('#toast');if(!el)return;el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),3500)}
$('#copy')?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText('writevarun2006@gmail.com');toast('Email copied to clipboard')}catch{toast('writevarun2006@gmail.com')}});
$('#contact-form')?.addEventListener('submit',event=>{event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;const data=new FormData(form);const body=`Hi Varun,\n\n${data.get('message')}\n\n${data.get('name')}\n${data.get('email')}`;location.href=`mailto:writevarun2006@gmail.com?subject=${encodeURIComponent('Portfolio inquiry from '+data.get('name'))}&body=${encodeURIComponent(body)}`;$('#form-status').textContent='Email draft opened. Please send it from your email app.'});
const technologies=[['Python','python'],['JavaScript','javascript'],['TypeScript','typescript'],['React','react'],['TensorFlow','tensorflow'],['Keras','keras'],['NumPy','numpy'],['Pandas','pandas'],['Scikit-learn','scikitlearn'],['FastAPI','fastapi'],['PostgreSQL','postgresql'],['Docker','docker'],['Git','git'],['GitHub','github'],['Streamlit','streamlit']];
const stack=$('#tech-stack');if(stack)for(const [name,icon]of technologies){const item=document.createElement('span');item.className='tech';item.tabIndex=0;item.dataset.tooltip=name;item.setAttribute('aria-label',name);const image=document.createElement('img');image.src=`assets/icons/${icon}.svg`;image.alt=name;image.width=24;image.height=24;image.loading='lazy';image.addEventListener('error',()=>{item.textContent=name},{once:true});item.append(image);stack.append(item)}
if($('#year'))$('#year').textContent=new Date().getFullYear();
const role=$('#role');const reduced=matchMedia('(prefers-reduced-motion: reduce)');if(role&&!reduced.matches){const roles=['AI / ML Engineer','Curious Builder','Software Tinkerer','Detail Oriented','Product Builder'];let index=0;setInterval(()=>{if(document.hidden)return;role.classList.add('role-exit');setTimeout(()=>{role.textContent=roles[++index%roles.length];role.classList.remove('role-exit');role.classList.add('role-enter');setTimeout(()=>role.classList.remove('role-enter'),500)},250)},3500)}
async function contributions(){const target=$('#contribution-chart');if(!target)return;try{const response=await fetch('https://github-contributions-api.jogruber.de/v4/varun9087?y=last',{signal:AbortSignal.timeout(8000)});if(!response.ok)throw Error('unavailable');const data=await response.json();if(!Array.isArray(data.contributions))throw Error('invalid');const days=data.contributions.slice(-371);const ns='http://www.w3.org/2000/svg';const svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox','0 0 768 126');svg.setAttribute('role','img');svg.setAttribute('aria-label','GitHub contributions during the past year');const offset=new Date(days[0].date+'T00:00:00').getDay();const columns=Math.ceil((days.length+offset)/7);const step=768/columns;let lastMonth=-1;days.forEach((day,i)=>{const col=Math.floor((i+offset)/7),row=(i+offset)%7;const date=new Date(day.date+'T00:00:00');if(row===0&&date.getMonth()!==lastMonth){const label=document.createElementNS(ns,'text');label.setAttribute('x',col*step);label.setAttribute('y',10);label.textContent=date.toLocaleString('en',{month:'short'}).toUpperCase();svg.append(label);lastMonth=date.getMonth()}const rect=document.createElementNS(ns,'rect');rect.setAttribute('x',col*step);rect.setAttribute('y',23+row*14.5);rect.setAttribute('width',Math.max(1,step-3.5));rect.setAttribute('height',11);rect.setAttribute('class','level-'+Math.max(0,Math.min(4,Number(day.level)||0)));const title=document.createElementNS(ns,'title');title.textContent=`${day.count} contributions on ${day.date}`;rect.append(title);svg.append(rect)});const link=document.createElement('a');link.href='https://github.com/varun9087';link.append(svg);target.replaceChildren(link);$('#contribution-total').textContent=days.reduce((sum,d)=>sum+d.count,0).toLocaleString()+' CONTRIBUTIONS · PAST YEAR'}catch{$('#contribution-total').textContent='VIEW ACTIVITY ON GITHUB'}}contributions();

// Rotate quote/author pairs together, avoiding the last quote shown in this browser.
const visitQuote = $('#visit-quote');
if (visitQuote) {
  const thoughts = [
    {text: "I'm not afraid of storms, for I'm learning how to sail my ship.", author: 'Louisa May Alcott'},
    {text: 'Well done is better than well said.', author: 'Benjamin Franklin'},
    {text: 'Nothing will come of nothing: speak again.', author: 'William Shakespeare'}
  ];
  let previous = -1;
  try { const saved = localStorage.getItem('varun-last-quote'); if (saved !== null) previous = Number(saved); } catch {}
  const choices = thoughts.map((_, index) => index).filter(index => index !== previous);
  const selected = choices[Math.floor(Math.random() * choices.length)];
  visitQuote.textContent = thoughts[selected].text;
  const author = $('#quote-author');
  if (author) author.textContent = '— ' + thoughts[selected].author;
  try { localStorage.setItem('varun-last-quote', String(selected)); } catch {}
}

async function visitorOrdinal(){
 const panel=$('.visit-note');if(!panel)return;
 try{
  const endpoint='/api/integrations';
  const status=await fetch(endpoint,{signal:AbortSignal.timeout(5000)});
  if(!status.ok||!(await status.json()).visitors)return;
  let visitorId=localStorage.getItem('varun-visitor-id');
  if(!visitorId){visitorId=crypto.randomUUID();localStorage.setItem('varun-visitor-id',visitorId)}
  const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({visitorId}),signal:AbortSignal.timeout(10000)});
  if(!response.ok)return;const {ordinal}=await response.json();if(!Number.isSafeInteger(ordinal)||ordinal<1)return;
  const suffix=ordinal%100>=11&&ordinal%100<=13?'th':({1:'st',2:'nd',3:'rd'}[ordinal%10]||'th');
  const line=document.createElement('span'),number=document.createElement('strong'),sup=document.createElement('sup');
  number.textContent=ordinal.toLocaleString();sup.textContent=suffix;
  line.append('You are the ',number,sup,' visitor');panel.replaceChildren(line);
 }catch{/* Keep the welcome message when storage or the service is unavailable. */}
}
visitorOrdinal();
