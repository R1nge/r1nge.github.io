import{downloadZip as e}from"./client-zip.js";let n={ModName:"Default",ModIconPath:"gura.png",ContainerImagePath:"container.png",SuikaSkinsImagesPaths:["yagoo.png","sana.png","ollie.png","aqua.png","ayame.png","fubuki.png","gura.png","hakos.png","mio.png","kobo.png","koyori.png","towa.png"],SuikaIconsPaths:["yagoo.png","sana.png","ollie.png","aqua.png","ayame.png","fubuki.png","gura.png","hakos.png","mio.png","kobo.png","koyori.png","towa.png"],SuikaAudios:[{path:"silence.mp3",volume:1},{path:"silence.mp3",volume:1},{path:"song1.mp3",volume:.1},{path:"song1.mp3",volume:.1},{path:"song1.mp3",volume:.1},{path:"song1.mp3",volume:.1},{path:"silence.mp3",volume:1},{path:"silence.mp3",volume:1},{path:"silence.mp3",volume:1},{path:"silence.mp3",volume:1},{path:"silence.mp3",volume:1},{path:"silence.mp3",volume:1}],SuikaDropChances:[.1,1,1,1,1],TimeBeforeTimerTrigger:1,TimerStartTime:5,InGameBackgroundPath:"background.png",LoadingScreenBackgroundPath:"background.png",LoadingScreenIconPath:"gura.png",PlayerSkinPath:"gura.png",MergeSoundsAudios:[{path:"silence.mp3",volume:1},{path:"sana.ogg",volume:.25},{path:"ollie.ogg",volume:.1},{path:"aqua.ogg",volume:.25},{path:"ayame.ogg",volume:.15},{path:"fubuki.ogg",volume:.5},{path:"gura.ogg",volume:.25},{path:"hakos.ogg",volume:.2},{path:"mio.ogg",volume:.3},{path:"kobo.ogg",volume:.25},{path:"koyori.ogg",volume:.25},{path:"towa.ogg",volume:.25}],MainMenuBackgroundPath:"background.png"};const o=document.querySelector("#mod-title"),t=document.querySelector("#mod-icon"),a=document.querySelector("#container-image"),i=document.querySelector("#in-game-background-image"),l=document.querySelector("#loading-screen-background-image"),u=document.querySelector("#loading-screen-icon-image"),c=document.querySelector("#player-skin-image"),s=document.querySelector("#main-menu-background-image"),r=document.querySelector("#suika-skins-list"),m=document.querySelector("#suika-icons-list"),g=document.querySelector("#suika-audios-list"),d=document.querySelector("#suika-merge-audios"),f=document.querySelector("#time-before-timer-trigger"),p=document.querySelector("#timer-start-time");document.querySelector("#load-mod-button").children[0].addEventListener("change",(e=>{!function(e){for(const o of e)if("config.json"===o.name){const t=new FileReader;t.readAsText(o,"UTF-8"),t.onload=o=>{const t=o.target.result,a=JSON.parse(t);n=a,B(a,e)}}}(e.target.files)}));document.querySelector("#download-mod-button").addEventListener("click",(async function(){!function(){let e=document.getElementsByName("dropChances[]");P.splice(0,P.length);for(let n=0;n<e.length;n++){let o=e[n];P.push(parseFloat(o.value))}}();for(let e=0;e<P.length;e++)n.SuikaDropChances[e]=P[e];const t=[];for(let e=0;e<n.SuikaSkinsImagesPaths.length;e++)t.push(b[e].file),n.SuikaSkinsImagesPaths[e]=b[e].file.name;const a=[];for(let e=0;e<n.SuikaIconsPaths.length;e++)a.push(v[e].file),n.SuikaIconsPaths[e]=v[e].file.name;const i=[];for(let e=0;e<n.SuikaAudios.length;e++)i.push(y[e].file),n.SuikaAudios[e].path=y[e].file.name,n.SuikaAudios[e].volume=y[e].audio.volume;const l=[],u=[];for(let e=0;e<w.length;e++)""!==n.MergeSoundsAudios[e].path&&null!==n.MergeSoundsAudios[e].path&&void 0!==n.MergeSoundsAudios[e].path&&"null"!==n.MergeSoundsAudios[e].path?l.push(w[e].file):(n.MergeSoundsAudios[e].path="silence.mp3",u.push(e));for(let e=0;e<l.length;e++)u.includes(e)||(n.MergeSoundsAudios[e].volume=w[e].audio.volume,n.MergeSoundsAudios[e].path=l[e].name);n.ModName=o.value,n.LoadingScreenBackgroundPath=I.file.name,n.InGameBackgroundPath=L.file.name,n.MainMenuBackgroundPath=q.file.name,n.PlayerSkinPath=R.file.name,n.TimerStartTime=p.value,n.TimeBeforeTimerTrigger=f.value,await async function(n,o,t,a,i,l){const u=JSON.stringify(o),c={name:"config.json",lastModified:new Date,input:u},s=[c,...(e=>{const n=new Map;return e.filter((e=>!n.has(e.name)&&(n.set(e.name,!0),n)))})([k.file,S.file,...t,...a,...i,...l,I.file,L.file,q.file,R.file])],r=await e(s).blob(),m=document.createElement("a");m.href=URL.createObjectURL(r),m.download=n,m.click(),m.remove(),URL.revokeObjectURL(r)}(n.ModName,n,t,a,i,l)}));const h=new Map;let k={file:null},S={file:null};const b=[],v=[],y=[],P=[],w=[];let L={file:null},M={file:null},I={file:null},R={file:null},q={file:null};async function U(e,n,o,t,a){if(o.has(n.path)){let e={file:new File([o.get(n.path)],n.path,{type:"audio"}),audio:n};t.push(e),J(e,a)}else await j(e+n.path).then((e=>{let i=new File([e.file],n.path,{type:"audio"}),l={file:i,audio:n};t.push(l),o.set(n.path,i),J(l,a)}))}async function A(e,n,o,t){const a=await j(e+n),i=new File([a.file],n),l={file:i,blob:a.blob};o.has(i.name)||o.set(i.name,l),t.push(l)}function T(e,n,o,t){e.forEach((e=>{for(const n of o)n.file.name===e&&F(n,t,o,!0)}))}async function C(e,n,o,t){const a=await j(e+n);t.file=new File([a.file],n),N(a.file,o,t)}function j(e,n){return fetch(e).then((e=>{const n=e.body.getReader();return new ReadableStream({start:e=>function o(){return n.read().then((({done:n,value:t})=>{if(!n)return e.enqueue(t),o();e.close()}))}()})})).then((e=>new Response(e))).then((e=>e.blob())).then((e=>({blob:URL.createObjectURL(e),file:new File([e],n)}))).catch((e=>console.error(e)))}function B(e,i){o.value=n.ModName;for(const n of i)n.name===e.ModIconPath&&(k.file=n,O(n,t.id)),n.name===e.ContainerImagePath&&(S.file=n,O(n,a.id));const l={};for(const e of i)l[e.name]=e;G(r,b),G(m,v),G(g,y),function(e,n){for(const o of n.SuikaSkinsImagesPaths){const n=e[o];if(n){const e=URL.createObjectURL(n);b.push({file:n,blob:e})}}for(const e of b)F(e,r,b,!1)}(l,e),function(e,n){for(const o of n.SuikaIconsPaths){const n=e[o];if(n){const e=URL.createObjectURL(n);v.push({file:n,blob:e})}}for(const e of v)F(e,m,v,!1)}(l,e),function(e,n){for(const o of n.SuikaAudios){const n=e[o.path];let t={file:n,audio:o};n&&y.push(t)}for(const e of y)J(e,g)}(l,e),E(e)}function E(e){for(const n of e.SuikaDropChances)P.push(n);let n=document.getElementsByName("dropChances[]");for(let e=0;e<n.length;e++){n[e].value=P[e]}}function O(e,n,o){const t=URL.createObjectURL(e),a=document.querySelector(`#${n}`);a.style.display="block",a.src=t,N(e,a,o)}function N(e,n,o){n.onclick=()=>{!function(e,n,o){const t=document.createElement("input");t.type="file",t.accept=".png, .jpg",t.onchange=e=>{const t=e.target.files[0];n.src=URL.createObjectURL(t),o.file=t},t.click()}(0,n,o)}}function F(e,n,o,t){const a=document.createElement("li"),i=x();a.appendChild(i),i.alt=name,i.src=e.blob,i.onclick=()=>{D(e.file,n,o)},n.append(i)}function D(e,n,o){const t=document.createElement("input");t.type="file",t.accept=".png, .jpg",t.onchange=t=>{const a=t.target.files[0],i=URL.createObjectURL(a),l=o.findIndex((n=>n.file.name===e.name));-1!==l&&(o[l].file=a,o[l].blob=i),URL.revokeObjectURL(e),function(e,n){const o=e.children;o.length>0&&e.removeChild(o[n])}(n,l),function(e,n,o,t,a){const i=document.createElement("li"),l=x();if(i.appendChild(l),l.src=a,l.onclick=()=>{D(e,n,t)},o===n.children.length)n.appendChild(l);else{const e=n.children[o];n.insertBefore(l,e)}}(a,n,l,o,i)},t.click()}function x(){const e=document.createElement("img");return e.className="image",e}function G(e,n){for(;e.firstChild;)e.removeChild(e.firstChild);n.splice(0,n.length)}function J(e,n){const o=document.createElement("li"),t=document.createElement("audio-player");o.appendChild(t);const a=document.createElement("a");if(null===e||null===e.file)return console.log("Adding an empty audio control element"),a.href=null,t.src=null,t.controls=!0,t.volume=0,void n.append(o);const i=URL.createObjectURL(e.file);a.href=e.file,t.setAttribute("src",i),t.setAttribute("volume",e.audio.volume),t.controls=!0,n.append(o)}await async function(e,P){o.value=e.ModName,await C(P,e.ModIconPath,t,k),await C(P,e.ContainerImagePath,a,S),await C(P,e.LoadingScreenBackgroundPath,l,M),await C(P,e.InGameBackgroundPath,i,L),await C(P,e.LoadingScreenIconPath,u,I),await C(P,e.PlayerSkinPath,c,R),await C(P,e.MainMenuBackgroundPath,s,q);for(const n of e.SuikaSkinsImagesPaths)await A(P,n,h,b);T(e.SuikaSkinsImagesPaths,h,b,r);for(const n of e.SuikaIconsPaths)if(h.has(n)){const e=h.get(n);v.push({file:e.file,blob:e.blob})}else await A(P,n,h,v);T(e.SuikaIconsPaths,h,v,m);for(const n of e.SuikaAudios)await U(P,n,h,y,g);for(const n of e.MergeSoundsAudios)if(""!==n.path&&null!==n.path&&"null"!==n.path)await U(P,n,h,w,d);else{console.log("skipping audio");const e={file:null,audio:n};w.push(),J(e,d)}E(n),f.value=n.TimeBeforeTimerTrigger,p.value=n.TimerStartTime}(n,"ModExample/");