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
        this.changeFileButton.addEventListener('click', this.openFileDialog.bind(this));
    }

    static get observedAttributes() {
        return ['src', 'volume'];
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        if (attrName === 'src') {
            console.log('Changed src to ' + newVal);
            this.audio.src = newVal;
        } else if (attrName === 'volume') {
            console.log('Changed volume to ' + newVal);
            this.audio.volume = newVal;
            this.volumeBar.value = newVal * 100;
        }
    };

    connectedCallback() {
        console.log("Custom element added to page.");
    }

    togglePlayback() {
        if (this.audio.paused) {
            this.audio.play();
            this.togglePlayButton(false);
        } else {
            this.audio.pause();
            this.togglePlayButton(true);
        }
        console.log("Toggle playback");
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
        console.log("Adjusted volume" + this.volumeBar.value);
    }

    openFileDialog() {
        return new Promise((resolve, reject) => {
            const inputFile = document.createElement('input');
            inputFile.type = 'file';
            inputFile.accept = '.mp3, .ogg, .wav';
            inputFile.click();

            inputFile.onchange = (event) => {
                const file = event.target.files[0];
                if (file) {
                    this.audio.src = URL.createObjectURL(file);
                    this.togglePlayButton(true);
                    resolve(file);
                } else {
                    reject('No file selected');
                }
            };
        });
    }
}

customElements.define('audio-player', AudioPlayer);