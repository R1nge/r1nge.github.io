import {downloadZip} from "./client-zip.js";

type AudioData = {
    path: string,
    volume: number
}

type GameConfig = {
    ModName: string,
    ModIconPath: string,
    ContainerImagePath: string,
    SuikaSkinsImagesPaths: string[],
    SuikaIconsPaths: string[],
    SuikaAudios: AudioData[],
    SuikaDropChances: number[],
    TimeBeforeTimerTrigger: number,
    TimerStartTime: number,
    InGameBackgroundPath: string,
    LoadingScreenBackgroundPath: string,
    LoadingScreenIconPath: string,
    PlayerSkinPath: string,
    MergeSoundsAudios: AudioData[],
    MainMenuBackgroundPath: string
}

let gameConfig: GameConfig = {
    ModName: "Default",
    ModIconPath: "gura.png",
    ContainerImagePath: "container.png",
    SuikaSkinsImagesPaths: [
        "yagoo.png",
        "sana.png",
        "ollie.png",
        "aqua.png",
        "ayame.png",
        "fubuki.png",
        "gura.png",
        "hakos.png",
        "mio.png",
        "kobo.png",
        "koyori.png",
        "towa.png"
    ],
    SuikaIconsPaths: [
        "yagoo.png",
        "sana.png",
        "ollie.png",
        "aqua.png",
        "ayame.png",
        "fubuki.png",
        "gura.png",
        "hakos.png",
        "mio.png",
        "kobo.png",
        "koyori.png",
        "towa.png"
    ],
    SuikaAudios: [
        {path: "silence.mp3", volume: 1},
        {path: "silence.mp3", volume: 1},
        {path: "song1.mp3", volume: 0.1},
        {path: "song1.mp3", volume: 0.1},
        {path: "song1.mp3", volume: 0.1},
        {path: "song1.mp3", volume: 0.1},
        {path: "silence.mp3", volume: 1},
        {path: "silence.mp3", volume: 1},
        {path: "silence.mp3", volume: 1},
        {path: "silence.mp3", volume: 1},
        {path: "silence.mp3", volume: 1},
        {path: "silence.mp3", volume: 1}
    ],
    SuikaDropChances: [
        0.1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1
    ],
    TimeBeforeTimerTrigger: 1,
    TimerStartTime: 5,
    InGameBackgroundPath: "background.png",
    LoadingScreenBackgroundPath: "background.png",
    LoadingScreenIconPath: "gura.png",
    PlayerSkinPath: "gura.png",
    MergeSoundsAudios: [
        {path: "yagoo.ogg", volume: 0.25},
        {path: "sana.ogg", volume: 0.25},
        {path: "ollie.ogg", volume: 0.1},
        {path: "aqua.ogg", volume: 0.25},
        {path: "ayame.ogg", volume: 0.15},
        {path: "fubuki.ogg", volume: 0.5},
        {path: "gura.ogg", volume: 0.25},
        {path: "hakos.ogg", volume: 0.2},
        {path: "mio.ogg", volume: 0.3},
        {path: "kobo.ogg", volume: 0.25},
        {path: "koyori.ogg", volume: 0.25},
        {path: "towa.ogg", volume: 0.25}
    ],
    MainMenuBackgroundPath: "background.png"
}

const modTitleElement = document.querySelector('#mod-title');
const modIconElement = document.querySelector('#mod-icon');
const containerImageElement = document.querySelector('#container-image');

const suikaSkinsImageElement = document.querySelector('#suika-skins-images');
const suikaIconsImageElement = document.querySelector('#suika-icons-images');
const suikaAudiosElement = document.querySelector('#suika-audios');

const downloadButtonElement = document.querySelector('#download');
//downloadButtonElement.addEventListener('click', submitDropChances);

const loadModButtonElement = document.querySelector('#load-mod-button');

let modIconFile = null;
let containerImageFile = null;
const suikaSkinsImagesFiles: string[] = [];
const suikaIconsFiles: string[] = [];
const suikaAudiosFiles: string[] = [];
const suikaDropChancesOrdered: number[] = [];

function readFiles(files : FileList) {
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.name === "config.json") {
            const reader = new FileReader();
            reader.readAsText(file, 'UTF-8');
            reader.onload = readerEvent => {
                //May return an array buffer instead of a string
                const configJson = readerEvent.target.result as string;
                const parsedConfig = JSON.parse(configJson);
                gameConfig = parsedConfig;
                //init(parsedConfig, files);
            }
        }
    }
}


loadModButtonElement.addEventListener('change', (event) => {
    const inputElement = event.target as HTMLInputElement;
    readFiles(inputElement.files);
});