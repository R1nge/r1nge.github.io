"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gameConfig = {
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
        { path: "silence.mp3", volume: 1 },
        { path: "silence.mp3", volume: 1 },
        { path: "song1.mp3", volume: 0.1 },
        { path: "song1.mp3", volume: 0.1 },
        { path: "song1.mp3", volume: 0.1 },
        { path: "song1.mp3", volume: 0.1 },
        { path: "silence.mp3", volume: 1 },
        { path: "silence.mp3", volume: 1 },
        { path: "silence.mp3", volume: 1 },
        { path: "silence.mp3", volume: 1 },
        { path: "silence.mp3", volume: 1 },
        { path: "silence.mp3", volume: 1 }
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
        { path: "yagoo.ogg", volume: 0.25 },
        { path: "sana.ogg", volume: 0.25 },
        { path: "ollie.ogg", volume: 0.1 },
        { path: "aqua.ogg", volume: 0.25 },
        { path: "ayame.ogg", volume: 0.15 },
        { path: "fubuki.ogg", volume: 0.5 },
        { path: "gura.ogg", volume: 0.25 },
        { path: "hakos.ogg", volume: 0.2 },
        { path: "mio.ogg", volume: 0.3 },
        { path: "kobo.ogg", volume: 0.25 },
        { path: "koyori.ogg", volume: 0.25 },
        { path: "towa.ogg", volume: 0.25 }
    ],
    MainMenuBackgroundPath: "background.png"
};
var modTitleElement = document.querySelector('#mod-title');
var modIconElement = document.querySelector('#mod-icon');
var containerImageElement = document.querySelector('#container-image');
var suikaSkinsImageElement = document.querySelector('#suika-skins-images');
var suikaIconsImageElement = document.querySelector('#suika-icons-images');
var suikaAudiosElement = document.querySelector('#suika-audios');
var downloadButtonElement = document.querySelector('#download');
//downloadButtonElement.addEventListener('click', submitDropChances);
var loadModButtonElement = document.querySelector('#load-mod-button');
var modIconFile = null;
var containerImageFile = null;
var suikaSkinsImagesFiles = [];
var suikaIconsFiles = [];
var suikaAudiosFiles = [];
var suikaDropChancesOrdered = [];
