import{downloadZip as e}from"./client-zip.js";let n={ModName:"Default",ModIconPath:"gura.png",ContainerImagePath:"container.png",SuikaSkinsImagesPaths:["yagoo.png","sana.png","ollie.png","aqua.png","ayame.png","fubuki.png","gura.png","hakos.png","mio.png","kobo.png","koyori.png","towa.png"],SuikaIconsPaths:["yagoo.png","sana.png","ollie.png","aqua.png","ayame.png","fubuki.png","gura.png","hakos.png","mio.png","kobo.png","koyori.png","towa.png"],SuikaAudios:[{path:"silence.mp3",volume:1},{path:"silence.mp3",volume:1},{path:"song1.mp3",volume:.1},{path:"song1.mp3",volume:.1},{path:"song1.mp3",volume:.1},{path:"song1.mp3",volume:.1},{path:"silence.mp3",volume:1},{path:"silence.mp3",volume:1},{path:"silence.mp3",volume:1},{path:"silence.mp3",volume:1},{path:"silence.mp3",volume:1},{path:"silence.mp3",volume:1}],SuikaDropChances:[.1,1,1,1,1],TimeBeforeTimerTrigger:1,TimerStartTime:5,InGameBackgroundPath:"background.png",LoadingScreenBackgroundPath:"background.png",LoadingScreenIconPath:"gura.png",PlayerSkinPath:"gura.png",MergeSoundsAudios:[{path:"silence.mp3",volume:1},{path:"sana.ogg",volume:.25},{path:"ollie.ogg",volume:.1},{path:"aqua.ogg",volume:.25},{path:"ayame.ogg",volume:.15},{path:"fubuki.ogg",volume:.5},{path:"gura.ogg",volume:.25},{path:"hakos.ogg",volume:.2},{path:"mio.ogg",volume:.3},{path:"kobo.ogg",volume:.25},{path:"koyori.ogg",volume:.25},{path:"towa.ogg",volume:.25}],MainMenuBackgroundPath:"background.png"};const o=document.querySelector("#mod-title"),t=document.querySelector("#mod-icon"),a=document.querySelector("#container-image"),i=document.querySelector("#in-game-background-image"),l=document.querySelector("#loading-screen-background-image"),c=document.querySelector("#loading-screen-icon-image"),u=document.querySelector("#player-skin-image"),r=document.querySelector("#main-menu-background-image"),s=document.querySelector("#suika-skins-list"),m=document.querySelector("#suika-icons-list"),g=document.querySelector("#suika-audios-list"),d=document.querySelector("#suika-merge-audios"),f=document.querySelector("#time-before-timer-trigger"),p=document.querySelector("#timer-start-time");document.querySelector("#load-mod-button").addEventListener("click",(e=>{const o=document.createElement("input");o.type="file",o.webkitdirectory=!0,o.style.display="none",o.click(),o.onchange=e=>{const o=e.target.files;o&&function(e){for(const o of e)if("config.json"===o.name){const t=new FileReader;t.readAsText(o,"UTF-8"),t.onload=o=>{const t=o.target.result,a=JSON.parse(t);n=a,T(a,e)}}}(o)}}));document.querySelector("#download-mod-button").addEventListener("click",(async function(){!function(){let e=document.getElementsByName("dropChances[]");P.splice(0,P.length);for(let n=0;n<e.length;n++){let o=e[n];P.push(parseFloat(o.value))}}();for(let e=0;e<P.length;e++)n.SuikaDropChances[e]=P[e];const t=[];for(let e=0;e<n.SuikaSkinsImagesPaths.length;e++)t.push(b[e].file),n.SuikaSkinsImagesPaths[e]=b[e].file.name;const a=[];for(let e=0;e<n.SuikaIconsPaths.length;e++)a.push(y[e].file),n.SuikaIconsPaths[e]=y[e].file.name;const i=[];for(let e=0;e<n.SuikaAudios.length;e++)i.push(v[e].file),n.SuikaAudios[e].path=v[e].file.name,n.SuikaAudios[e].volume=v[e].audio.volume;const l=[],c=[];for(let e=0;e<L.length;e++)""!==n.MergeSoundsAudios[e].path&&null!==n.MergeSoundsAudios[e].path&&void 0!==n.MergeSoundsAudios[e].path&&"null"!==n.MergeSoundsAudios[e].path?l.push(L[e].file):(n.MergeSoundsAudios[e].path="silence.mp3",c.push(e));for(let e=0;e<l.length;e++)c.includes(e)||(n.MergeSoundsAudios[e].volume=L[e].audio.volume,n.MergeSoundsAudios[e].path=l[e].name);n.ModName=o.value,n.ModIconPath=k.file.name,n.ContainerImagePath=S.file.name,n.PlayerSkinPath=R.file.name,n.LoadingScreenIconPath=I.file.name,n.LoadingScreenBackgroundPath=I.file.name,n.InGameBackgroundPath=M.file.name,n.MainMenuBackgroundPath=U.file.name,n.TimerStartTime=p.value,n.TimeBeforeTimerTrigger=f.value,await async function(n,o,t,a,i,l){const c=JSON.stringify(o),u={name:"config.json",lastModified:new Date,input:c},r=[u,...(e=>{const n=new Map;return e.filter((e=>!n.has(e.name)&&(n.set(e.name,!0),n)))})([k.file,S.file,...t,...a,...i,...l,I.file,M.file,U.file,R.file])],s=await e(r).blob(),m=document.createElement("a");m.href=URL.createObjectURL(s),m.download=n,m.click(),m.remove(),URL.revokeObjectURL(s)}(n.ModName,n,t,a,i,l)}));const h=new Map;let k={file:null},S={file:null};const b=[],y=[],v=[],P=[],L=[];let M={file:null},w={file:null},I={file:null},R={file:null},U={file:null};async function q(e,n,o,t,a,i){if(o.has(n.path)){let e={file:new File([o.get(n.path)],n.path,{type:"audio"}),audio:n};t.push(e),J(e,a,t,i)}else await C(e+n.path).then((e=>{let l=new File([e.file],n.path,{type:"audio"}),c={file:l,audio:n};t.push(c),o.set(n.path,l),J(c,a,t,i)}))}async function A(e,n,o,t){const a=await C(e+n),i=new File([a.file],n),l={file:i,blob:a.blob};o.has(i.name)||o.set(i.name,l),t.push(l)}function B(e,n,o,t){e.forEach((e=>{for(const n of o)n.file.name===e&&F(n,t,o)}))}async function E(e,n,o,t){let a=await C(e+n);t.file=new File([a.file],n),N(a.file,o,t)}function C(e,n){return fetch(e).then((e=>{const n=e.body.getReader();return new ReadableStream({start:e=>function o(){return n.read().then((({done:n,value:t})=>{if(!n)return e.enqueue(t),o();e.close()}))}()})})).then((e=>new Response(e))).then((e=>e.blob())).then((e=>({blob:URL.createObjectURL(e),file:new File([e],n)}))).catch((e=>console.error(e)))}function T(e,d){o.value=n.ModName;for(const n of d)n.name===e.ModIconPath&&(k.file=n,O(n,t.id,k)),n.name===e.ContainerImagePath&&(S.file=n,O(n,a.id,S)),n.name===e.PlayerSkinPath&&(R.file=n,O(n,u.id,R)),n.name===e.LoadingScreenIconPath&&(I.file=n,O(n,c.id,I)),n.name===e.InGameBackgroundPath&&(M.file=n,O(n,i.id,M)),n.name===e.LoadingScreenBackgroundPath&&(w.file=n,O(n,l.id,w)),n.name===e.MainMenuBackgroundPath&&(U.file=n,O(n,r.id,U));const f={};for(const e of d)f[e.name]=e;x(s,b),x(m,y),x(g,v),function(e,n){for(const o of n.SuikaSkinsImagesPaths){const n=e[o];if(n){const e=URL.createObjectURL(n);b.push({file:n,blob:e})}}for(const e of b)F(e,s,b)}(f,e),function(e,n){for(const o of n.SuikaIconsPaths){const n=e[o];if(n){const e=URL.createObjectURL(n);y.push({file:n,blob:e})}}for(const e of y)F(e,m,y)}(f,e),function(e,n){for(const o of n.SuikaAudios){const n=e[o.path];let t={file:n,audio:o};n&&v.push(t)}for(const e of v)J(e,g)}(f,e),j(e)}function j(e){for(const n of e.SuikaDropChances)P.push(n);let n=document.getElementsByName("dropChances[]");for(let e=0;e<n.length;e++){n[e].value=P[e]}}function O(e,n,o){const t=URL.createObjectURL(e),a=document.querySelector(`#${n}`);a.style.display="block",a.src=t,N(e,a,o)}function N(e,n,o){n.onclick=()=>{!function(e,n,o){const t=document.createElement("input");t.type="file",t.accept=".png, .jpg",t.onchange=e=>{const t=e.target.files[0];n.src=URL.createObjectURL(t),o.file=t},t.click()}(0,n,o)}}function F(e,n,o){const t=document.createElement("li");t.className="grid-item";const a=G();t.appendChild(a),a.alt=name,a.src=e.blob,a.onclick=()=>{D(e.file,n,o)},n.append(t)}function D(e,n,o){const t=document.createElement("input");t.type="file",t.accept=".png, .jpg",t.onchange=t=>{const a=t.target.files[0],i=URL.createObjectURL(a),l=o.findIndex((n=>n.file.name===e.name));-1!==l&&(o[l].file=a,o[l].blob=i),URL.revokeObjectURL(e),function(e,n){const o=e.children;o.length>0&&e.removeChild(o[n])}(n,l),function(e,n,o,t,a){const i=document.createElement("li"),l=G();if(i.appendChild(l),l.src=a,l.onclick=()=>{D(e,n,t)},o===n.children.length)n.appendChild(i);else{const e=n.children[o];n.insertBefore(i,e)}}(a,n,l,o,i)},t.click()}function G(){const e=document.createElement("img");return e.className="image",e}function x(e,n){for(;e.firstChild;)e.removeChild(e.firstChild);n.splice(0,n.length)}function J(e,n,o,t){const a=document.createElement("li"),i=document.createElement("audio-player");a.appendChild(i);const l=document.createElement("a");if(i.changeFileButton.addEventListener("click",(()=>{(function(e){return new Promise(((n,o)=>{const t=document.createElement("input");t.type="file",t.accept=".mp3, .ogg, .wav",t.click(),t.onchange=t=>{const a=t.target.files[0];a?(e.audio.src=URL.createObjectURL(a),e.togglePlayButton(!0),n(a)):o(new Error("No file selected"))}}))})(i).then((e=>{o[t].file=e}))})),null===e||null===e.file)return console.log("Adding an empty audio control element"),l.href=null,i.src=null,i.controls=!0,i.volume=0,void n.append(a);const c=URL.createObjectURL(e.file);l.href=e.file,i.setAttribute("src",c),i.setAttribute("volume",e.audio.volume),i.controls=!0,n.append(a)}await async function(e,P){o.value=e.ModName,E(P,e.ModIconPath,t,k),E(P,e.ContainerImagePath,a,S),E(P,e.LoadingScreenBackgroundPath,l,w),E(P,e.InGameBackgroundPath,i,M),E(P,e.LoadingScreenIconPath,c,I),E(P,e.PlayerSkinPath,u,R),E(P,e.MainMenuBackgroundPath,r,U);for(const n of e.SuikaSkinsImagesPaths)await A(P,n,h,b);B(e.SuikaSkinsImagesPaths,h,b,s);for(const n of e.SuikaIconsPaths)if(h.has(n)){const e=h.get(n);y.push({file:e.file,blob:e.blob})}else await A(P,n,h,y);B(e.SuikaIconsPaths,h,y,m);for(let n=0;n<e.SuikaAudios.length;n++){const o=e.SuikaAudios[n];await q(P,o,h,v,g,n)}for(let n=0;n<e.MergeSoundsAudios.length;n++){const o=e.MergeSoundsAudios[n];if(""!==o.path&&null!==o.path&&"null"!==o.path)await q(P,o,h,L,d,n);else{console.log("skipping audio");const e={file:null,audio:o};L.push(),J(e,d,L,n)}}j(n),f.value=n.TimeBeforeTimerTrigger,p.value=n.TimerStartTime}(n,"ModExample/");