﻿class t extends HTMLElement{constructor(){super();const t=document.getElementById("audio-player-template").content;this.attachShadow({mode:"open"}).appendChild(t.cloneNode(!0)),this.playPauseButton=this.shadowRoot.getElementById("play-pause-button"),this.volumeBar=this.shadowRoot.getElementById("volume-bar"),this.changeFileButton=this.shadowRoot.getElementById("change-file-button"),this.audio=this.shadowRoot.querySelector("audio"),this.playPauseButton.addEventListener("click",this.togglePlayback.bind(this)),this.volumeBar.addEventListener("input",this.adjustVolume.bind(this)),this.changeFileButton.addEventListener("click",this.openFileDialog.bind(this))}static get observedAttributes(){return["src","volume"]}attributeChangedCallback(t,e,o){"src"===t?(console.log("Changed src to "+o),this.audio.src=o):"volume"===t&&(console.log("Changed volume to "+o),this.audio.volume=o,this.volumeBar.value=100*o)}connectedCallback(){console.log("Custom element added to page.")}togglePlayback(){this.audio.paused?(this.audio.play(),this.togglePlayButton(!1)):(this.audio.pause(),this.togglePlayButton(!0)),console.log("Toggle playback")}togglePlayButton(t){this.playPauseButton.textContent=t?"Play":"Pause"}adjustVolume(){this.audio.volume=this.volumeBar.value/100,console.log("Adjusted volume"+this.volumeBar.value)}openFileDialog(){return new Promise(((t,e)=>{const o=document.createElement("input");o.type="file",o.accept=".mp3, .ogg, .wav",o.click(),o.onchange=o=>{const a=o.target.files[0];a?(this.audio.src=URL.createObjectURL(a),this.togglePlayButton(!0),t(a)):e("No file selected")}}))}}customElements.define("audio-player",t);