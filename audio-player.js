﻿class t extends HTMLElement{constructor(){super();const t=document.getElementById("audio-player-template").content;this.attachShadow({mode:"open"}).appendChild(t.cloneNode(!0)),this.playPauseButton=this.shadowRoot.getElementById("play-pause-button"),this.volumeBar=this.shadowRoot.getElementById("volume-bar"),this.volumeBarPercent=this.shadowRoot.getElementById("volume-bar-percent"),this.changeFileButton=this.shadowRoot.getElementById("change-file-button"),this.audio=this.shadowRoot.querySelector("audio"),this.playPauseButton.addEventListener("click",this.togglePlayback.bind(this)),this.volumeBar.addEventListener("input",this.adjustVolume.bind(this))}static get observedAttributes(){return["src","volume"]}attributeChangedCallback(t,e,o){"src"===t?this.audio.src=o:"volume"===t&&(this.audio.volume=o,this.volumeBar.value=100*o,this.adjustVolume())}togglePlayback(){this.audio.paused?(this.audio.play(),this.togglePlayButton(!1)):(this.audio.pause(),this.togglePlayButton(!0))}togglePlayButton(t){this.playPauseButton.textContent=t?"Play":"Pause"}adjustVolume(){this.audio.volume=this.volumeBar.value/100,this.volumeBarPercent.textContent=`${this.volumeBar.value}%`}}customElements.define("audio-player",t);