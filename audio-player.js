class AudioPlayer extends HTMLElement {
    constructor() {
        super();

        const template = document.getElementById('audio-player-template');
        const templateContent = template.content;

        this.attachShadow({mode: 'open'}).appendChild(
            templateContent.cloneNode(true)
        );

        this.playPauseButton = this.shadowRoot.getElementById('play-pause-button');
        this.volumeBar = this.shadowRoot.getElementById('volume-bar');
        this.changeFileButton = this.shadowRoot.getElementById('change-file-button');
        this.audio = this.shadowRoot.querySelector('audio');

        this.playPauseButton.addEventListener('click', this.togglePlayback.bind(this));
        this.volumeBar.addEventListener('input', this.adjustVolume.bind(this));
    }

    static get observedAttributes() {
        return ['src', 'volume'];
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        if (attrName === 'src') {
            this.audio.src = newVal;
        } else if (attrName === 'volume') {
            this.audio.volume = newVal;
            this.volumeBar.value = newVal * 100;
        }
    };

    togglePlayback() {
        if (this.audio.paused) {
            this.audio.play();
            this.togglePlayButton(false);
        } else {
            this.audio.pause();
            this.togglePlayButton(true);
        }
    }

    togglePlayButton(paused) {
        if (paused) {
            this.playPauseButton.textContent = "Play";
        } else {
            this.playPauseButton.textContent = "Pause";
        }
    }

    adjustVolume() {
        this.audio.volume = this.volumeBar.value / 100;
    }
}

customElements.define('audio-player', AudioPlayer);