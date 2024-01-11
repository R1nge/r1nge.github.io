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
    ]
};
var modTitleElement = document.querySelector('#mod-title');
var message = "Hello, World!";
console.log(gameConfig.ModName);
