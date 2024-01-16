import{downloadZip as e}from"./client-zip.js";let n={ModName:"Default",ModIconPath:"gura.png",ContainerImagePath:"container.png",SuikaSkinsImagesPaths:["yagoo.png","sana.png","ollie.png","aqua.png","ayame.png","fubuki.png","gura.png","hakos.png","mio.png","kobo.png","koyori.png","towa.png"],SuikaIconsPaths:["yagoo.png","sana.png","ollie.png","aqua.png","ayame.png","fubuki.png","gura.png","hakos.png","mio.png","kobo.png","koyori.png","towa.png"],SuikaAudios:[{path:"silence.mp3",volume:1},{path:"silence.mp3",volume:1},{path:"song1.mp3",volume:.1},{path:"song1.mp3",volume:.1},{path:"song1.mp3",volume:.1},{path:"song1.mp3",volume:.1},{path:"silence.mp3",volume:1},{path:"silence.mp3",volume:1},{path:"silence.mp3",volume:1},{path:"silence.mp3",volume:1},{path:"silence.mp3",volume:1},{path:"silence.mp3",volume:1}],SuikaDropChances:[.1,1,1,1,1,1,1,1,1,1,1,1],TimeBeforeTimerTrigger:1,TimerStartTime:5,InGameBackgroundPath:"background.png",LoadingScreenBackgroundPath:"background.png",LoadingScreenIconPath:"gura.png",PlayerSkinPath:"gura.png",MergeSoundsAudios:[{path:"null",volume:0},{path:"sana.ogg",volume:.25},{path:"ollie.ogg",volume:.1},{path:"aqua.ogg",volume:.25},{path:"ayame.ogg",volume:.15},{path:"fubuki.ogg",volume:.5},{path:"gura.ogg",volume:.25},{path:"hakos.ogg",volume:.2},{path:"mio.ogg",volume:.3},{path:"kobo.ogg",volume:.25},{path:"koyori.ogg",volume:.25},{path:"towa.ogg",volume:.25}],MainMenuBackgroundPath:"background.png"};const o=document.querySelector("#mod-title"),t=document.querySelector("#mod-icon"),a=document.querySelector("#container-image"),i=document.querySelector("#suika-skins-images"),l=document.querySelector("#suika-icons-images"),c=document.querySelector("#suika-audios"),u=document.querySelector("#suika-merge-audios");document.querySelector("#download-mod-button").addEventListener("click",(async function(){let e=document.getElementsByName("dropChances[]");d.splice(0,d.length);for(let n=0;n<e.length;n++){let o=e[n];d.push(parseFloat(o.value))}}));const s=document.querySelector("#load-mod-button");document.querySelector("#download-mod-button").addEventListener("click",(async function(){for(let e=0;e<d.length;e++)n.SuikaDropChances[e]=d[e];const t=[];for(let e=0;e<n.SuikaSkinsImagesPaths.length;e++)t.push(f[e].file),n.SuikaSkinsImagesPaths[e]=f[e].file.name;const a=[];for(let e=0;e<n.SuikaIconsPaths.length;e++)a.push(p[e].file),n.SuikaIconsPaths[e]=p[e].file.name;n.ModName=o.value,n.LoadingScreenBackgroundPath=P.file.name,n.InGameBackgroundPath=S.file.name,n.MainMenuBackgroundPath=y.file.name,n.PlayerSkinPath=v.file.name,await async function(n,o,t,a){const i=JSON.stringify(o),l={name:"config.json",lastModified:new Date,input:i},c=[l,...(e=>{const n=new Map;return e.filter((e=>!n.has(e.name)&&(n.set(e.name,!0),n)))})([m.file,h.file,...t,...a,...g,...k,P.file,S.file,y.file,v.file])],u=await e(c).blob(),s=document.createElement("a");s.href=URL.createObjectURL(u),s.download=n,s.click(),s.remove(),URL.revokeObjectURL(u)}(n.ModName,n,t,a)}));const r=new Map;let m={file:null},h={file:null};const f=[],p=[],g=[],d=[],k=[];let S={file:null},b={file:null},P={file:null},v={file:null},y={file:null};function w(e,n){return fetch(e).then((e=>{const n=e.body.getReader();return new ReadableStream({start:e=>function o(){return n.read().then((({done:n,value:t})=>{if(!n)return e.enqueue(t),o();e.close()}))}()})})).then((e=>new Response(e))).then((e=>e.blob())).then((e=>({blob:URL.createObjectURL(e),file:new File([e],n)}))).catch((e=>console.error(e)))}function I(e,u){o.value=n.ModName;for(const n of u)n.name===e.ModIconPath&&(m.file=n,M(n,t.id)),n.name===e.ContainerImagePath&&(h.file=n,M(n,a.id));const s={};for(const e of u)s[e.name]=e;C(i,f),C(l,p),C(c,g),function(e,n){for(const o of n.SuikaSkinsImagesPaths){const n=e[o];n&&f.push(n)}for(const e of f)R(e,i,f)}(s,e),function(e,n){for(const o of n.SuikaIconsPaths){const n=e[o];n&&p.push(n)}for(const e of p)R(e,l,p)}(s,e),function(e,n){for(const o of n.SuikaAudios){const n=e[o.path];let t={file:n,audio:o};n&&(t.file=n,t.audio=o,g.push(t))}for(const e of g)F(e,c)}(s,e),L(e)}function L(e){for(const n of e.SuikaDropChances)d.push(n);let n=document.getElementsByName("dropChances[]");for(let e=0;e<n.length;e++){n[e].value=d[e]}}function M(e,n,o){const t=URL.createObjectURL(e),a=document.querySelector(`#${n}`);a.style.display="block",a.src=t,a.onclick=()=>{!function(e,n,o){const t=document.createElement("input");t.type="file",t.accept=".png, .jpg",t.onchange=e=>{const t=e.target.files[0];n.src=URL.createObjectURL(t),o.file=t},t.click()}(0,a,o)}}function R(e,n,o){const t=document.createElement("li"),a=document.createElement("img");t.appendChild(a),a.className="image",a.src=URL.createObjectURL(e),a.onclick=()=>{U(e,e.name,n,t,o)},n.append(t)}function E(e,n,o,t){const a=document.createElement("li"),i=document.createElement("img");a.appendChild(i),i.className="image",i.src=e,i.alt=n,i.onclick=()=>{U(e,n,o,a,t)},o.append(a)}function U(e,n,o,t,a){const i=document.createElement("input");i.type="file",i.accept=".png, .jpg",i.onchange=t=>{const i=t.target.files[0],l=URL.createObjectURL(i),c=a.findIndex((e=>e.file.name===n));-1!==c&&(a[c].file=i,a[c].blob=l),URL.revokeObjectURL(e),function(e,n){const o=e.children;o.length>0&&e.removeChild(o[n])}(o,c),function(e,n,o,t,a){const i=document.createElement("li"),l=document.createElement("img");if(i.appendChild(l),l.className="image",l.src=a,l.onclick=()=>{U(e,n,l,t)},o===n.children.length)n.appendChild(i);else{const e=n.children[o];n.insertBefore(i,e)}}(i,o,c,a,l)},i.click()}function C(e,n){for(;e.firstChild;)e.removeChild(e.firstChild);n.splice(0,n.length)}function F(e,n){const o=document.createElement("li"),t=document.createElement("audio");o.appendChild(t);const a=document.createElement("a"),i=URL.createObjectURL(e.file);a.href=i,t.src=i,t.controls=!0,t.onclick=()=>{},t.volume=e.audio.volume,t.onvolumechange=()=>{},n.append(o)}await async function(e,t){o.value=e.ModName,w(t+e.ModIconPath).then((n=>{m.file=new File([n.file],e.ModIconPath)})),w(t+e.ContainerImagePath).then((n=>{h.file=new File([n.file],e.ContainerImagePath)}));for(const n of e.SuikaSkinsImagesPaths)await w(t+n).then((e=>{const o=new File([e.file],n),t={file:o,blob:e.blob};r.has(o.name)||r.set(o.name,t),f.push(t)}));e.SuikaSkinsImagesPaths.forEach(((e,n)=>{for(const n of f)n.file.name===e&&E(n.blob,n.file.name,i,f)}));for(const n of e.SuikaIconsPaths)if(r.has(n)){const e=r.get(n),o={file:e.file,blob:e.blob};p.push(o)}else await w(t+n).then((e=>{const o=new File([e.file],n),t={file:o,blob:e.blob};r.has(o.name)||r.set(o.name,t),f.push(t)}));e.SuikaSkinsImagesPaths.forEach(((e,n)=>{for(const n of p)n.file.name===e&&E(n.blob,n.file.name,l,p)}));for(const n of e.SuikaAudios)if(r.has(n.path)){let e=new File([r.get(n.path)],n.path,{type:"audio"});g.push(e),F({file:e,audio:n},c)}else await w(t+n.path).then((e=>{let o=new File([e.file],n.path,{type:"audio"});g.push(o);let t={file:o,audio:n};r.set(n.path,o),F(t,c)}));L(n),w(t+e.LoadingScreenBackgroundPath).then((n=>{b.file=new File([n.file],e.LoadingScreenBackgroundPath)})),w(t+e.InGameBackgroundPath).then((n=>{S.file=new File([n.file],e.InGameBackgroundPath)})),w(t+e.LoadingScreenIconPath).then((n=>{P.file=new File([n.file],e.LoadingScreenIconPath)})),w(t+e.PlayerSkinPath).then((n=>{v.file=new File([n.file],e.PlayerSkinPath)}));for(const n of e.MergeSoundsAudios)if("null"!==n.path&&""!==n.path)if(r.has(n.path)){let e=new File([r.get(n.path)],n.path,{type:"audio"});k.push(e),F({file:e,audio:n},c)}else await w(t+n.path).then((e=>{let o=new File([e.file],n.path,{type:"audio"});k.push(o),F({file:o,audio:n},u)}));else console.log("Skipping "+n.path);w(t+e.MainMenuBackgroundPath).then((n=>{y.file=new File([n.file],e.MainMenuBackgroundPath)}))}(n,"ModExample/"),s.addEventListener("change",(e=>{!function(e){for(const o of e)if("config.json"===o.name){const t=new FileReader;t.readAsText(o,"UTF-8"),t.onload=o=>{const t=o.target.result,a=JSON.parse(t);n=a,I(a,e)}}}(e.target.files)}));