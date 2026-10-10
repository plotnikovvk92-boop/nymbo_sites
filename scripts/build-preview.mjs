import {readFile,writeFile,readdir} from 'node:fs/promises';
const root=new URL('../',import.meta.url);
const data=async(file,type)=>`data:${type};base64,${(await readFile(new URL(file,root))).toString('base64')}`;
let css=await readFile(new URL('public/style.css',root),'utf8');
for(const file of (await readdir(new URL('public/assets/',root))).filter(f=>f.endsWith('.woff2'))){css=css.replaceAll('/assets/'+file,await data('public/assets/'+file,'font/woff2'));}
const images={};for(const file of (await readdir(new URL('public/assets/',root))).filter(f=>f.endsWith('.webp'))){images[file.slice(0,-5)]=await data('public/assets/'+file,'image/webp');}
const model=(await readFile(new URL('public/model.js',root),'utf8')).replace(/^export /gm,'');
let app=await readFile(new URL('public/app.js',root),'utf8');
app=app.replace(/^import .*?;\n/,'').replace('src="/assets/${name}.webp"','src="${inlineAssets[name]}"');
let html=await readFile(new URL('public/index.html',root),'utf8');
html=html.replace('<link rel="stylesheet" href="/style.css">',`<style>${css}</style>`).replace('<script type="module" src="/app.js"></script>','');
html=html.replace('</body>',`<script type="module">const inlineAssets=${JSON.stringify(images)};\n${model}\n${app}\n</script></body>`);
await writeFile(new URL('index.html',root),html);
console.log('Created standalone index.html with embedded dish photos and fonts');
