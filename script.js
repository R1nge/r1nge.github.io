//TODO: load async then sort
//TODO: load/save trigger start delay, timer start time
//TODO: add an ability to change audios

import {downloadZip} from "./client-zip.js";

let gameConfig = {
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
        {"path": "silence.mp3", "volume": 1},
        {"path": "silence.mp3", "volume": 1},
        {"path": "song1.mp3", "volume": 0.1},
        {"path": "song1.mp3", "volume": 0.1},
        {"path": "song1.mp3", "volume": 0.1},
        {"path": "song1.mp3", "volume": 0.1},
        {"path": "silence.mp3", "volume": 1},
        {"path": "silence.mp3", "volume": 1},
        {"path": "silence.mp3", "volume": 1},
        {"path": "silence.mp3", "volume": 1},
        {"path": "silence.mp3", "volume": 1},
        {"path": "silence.mp3", "volume": 1}
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
        {"path": "yagoo.ogg", "volume": 0.25},
        {"path": "sana.ogg", "volume": 0.25},
        {"path": "ollie.ogg", "volume": 0.1},
        {"path": "aqua.ogg", "volume": 0.25},
        {"path": "ayame.ogg", "volume": 0.15},
        {"path": "fubuki.ogg", "volume": 0.5},
        {"path": "gura.ogg", "volume": 0.25},
        {"path": "hakos.ogg", "volume": 0.2},
        {"path": "mio.ogg", "volume": 0.3},
        {"path": "kobo.ogg", "volume": 0.25},
        {"path": "koyori.ogg", "volume": 0.25},
        {"path": "towa.ogg", "volume": 0.25}
    ],
    MainMenuBackgroundPath: "background.png"
}

const modTitleElement = document.querySelector('#mod-title');
const modIconElement = document.querySelector('#mod-icon');
const containerImageElement = document.querySelector('#container-image');

const suikaSkinsImageElement = document.querySelector('#suika-skins-images');
const suikaIconsImageElement = document.querySelector('#suika-icons-images');
const suikaAudiosElement = document.querySelector('#suika-audios');

const suikaMergeAudioElement = document.querySelector('#suika-merge-audios');

const inGameBackgroundElement = document.querySelector('#in-game-background-image');
const loadingScreenBackgroundElement = document.querySelector('#loading-screen-background-image');
const loadingScreenIconElement = document.querySelector('#loading-screen-icon-image');
const playerSkinElement = document.querySelector('#player-skin-image');
const mainMenuBackgroundElement = document.querySelector('#main-menu-background-image');

const dropChancesButton = document.querySelector('#download-mod-button');
dropChancesButton.addEventListener('click', submitDropChances);

const loadModButtonElement = document.querySelector('#load-mod-button');
const downloadModButtonElement = document.querySelector('#download-mod-button');
downloadModButtonElement.addEventListener('click', downloadMod);


let modIconFile = {file: null};
let containerImageFile = {file: null};
const SuikaSkinsImagesFileAndBlob = [];
const suikaIconsFiles = [];
const suikaAudiosFiles = [];
const suikaDropChancesOrdered = [];
const suikaMergeAudioFiles = [];

let inGameBackgroundFile = {file: null};
let loadingScreenBackgroundFile = {file: null};
let loadingScreenIconFile = {file: null};
let playerSkinFile = {file: null};
let mainMenuBackgroundFile = {file: null};

await initUsingLocalFiles(gameConfig, "ModExample/");

async function initUsingLocalFiles(config, relativePath) {
    modTitleElement.value = config.ModName;

    fetchLocalFile(relativePath + config.ModIconPath).then(blobAndFile => {
        showImageLocalFiles(blobAndFile.blob, modIconElement.id, modIconFile);
        modIconFile.file = new File([blobAndFile.file], config.ModIconPath);
    });

    fetchLocalFile(relativePath + config.ContainerImagePath).then(blobAndFile => {
        showImageLocalFiles(blobAndFile.blob, containerImageElement.id, containerImageFile);
        containerImageFile.file = new File([blobAndFile.file], config.ContainerImagePath);
    });

    
    const suikaSkinsFetchPromises = config.SuikaSkinsImagesPaths.map(path => {
        return fetchLocalFile(relativePath + path)
            .then(blobAndFile => {
                const file = new File([blobAndFile.file], path);

                const fileAndBlob = {file: file, blob: blobAndFile.blob};

                SuikaSkinsImagesFileAndBlob.push(fileAndBlob);
            });
    });

    Promise.all(suikaSkinsFetchPromises)
        .then(() => {
            config.SuikaSkinsImagesPaths.forEach((path, index) => {
                for (const fileAndBlob of SuikaSkinsImagesFileAndBlob) {
                    if (fileAndBlob.file.name === path) {
                        addImageLocalFiles(fileAndBlob.blob, fileAndBlob.file.name, suikaSkinsImageElement, SuikaSkinsImagesFileAndBlob);
                    }
                }
            });
        });

    const suikaIconsFetchPromises = config.SuikaIconsPaths.map(path => {
        return fetchLocalFile(relativePath + path)
            .then(blobAndFile => {
                const file = new File([blobAndFile.file], path);

                const fileAndBlob = {file: file, blob: blobAndFile.blob};

                suikaIconsFiles.push(fileAndBlob);
            });
    });

    Promise.all(suikaIconsFetchPromises)
        .then(() => {
            config.SuikaSkinsImagesPaths.forEach((path, index) => {
                for (const fileAndBlob of suikaIconsFiles) {
                    if (fileAndBlob.file.name === path) {
                        addImageLocalFiles(fileAndBlob.blob, fileAndBlob.file.name, suikaIconsImageElement, suikaIconsFiles);
                    }
                }
            });
        });

    for (const audioData of config.SuikaAudios) {
        await fetchLocalFile(relativePath + audioData.path).then(blobAndFile => {
            let file = new File([blobAndFile.file], audioData.path, {type: 'audio'})
            suikaAudiosFiles.push(file);

            let fileAndData = {
                file: file,
                audio: audioData
            };

            addAudioControl(fileAndData, suikaAudiosElement);
        });
    }

    loadSuikaDropChances(gameConfig);

    //TODO: time before timer trigger
    //
    //TODO: timer start time
    //

    fetchLocalFile(relativePath + config.LoadingScreenBackgroundPath).then(blobAndFile => {
        showImageLocalFiles(blobAndFile.blob, loadingScreenBackgroundElement.id, loadingScreenBackgroundFile);
        loadingScreenBackgroundFile.file = new File([blobAndFile.file], config.LoadingScreenBackgroundPath);
    });

    fetchLocalFile(relativePath + config.InGameBackgroundPath).then(blobAndFile => {
        showImageLocalFiles(blobAndFile.blob, inGameBackgroundElement.id, inGameBackgroundFile);
        inGameBackgroundFile.file = new File([blobAndFile.file], config.InGameBackgroundPath);
    });

    fetchLocalFile(relativePath + config.LoadingScreenIconPath).then(blobAndFile => {
        showImageLocalFiles(blobAndFile.blob, loadingScreenIconElement.id, loadingScreenIconFile);
        loadingScreenIconFile.file = new File([blobAndFile.file], config.LoadingScreenIconPath);
    });

    fetchLocalFile(relativePath + config.PlayerSkinPath).then(blobAndFile => {
        showImageLocalFiles(blobAndFile.blob, playerSkinElement.id, playerSkinFile);
        playerSkinFile.file = new File([blobAndFile.file], config.PlayerSkinPath);
    });

    for (const audioData of config.MergeSoundsAudios) {
        await fetchLocalFile(relativePath + audioData.path).then(blobAndFile => {
            let file = new File([blobAndFile.file], audioData.path, {type: 'audio'})
            suikaMergeAudioFiles.push(file);

            let fileAndData = {
                file: file,
                audio: audioData
            };

            addAudioControl(fileAndData, suikaMergeAudioElement);
        });
    }

    fetchLocalFile(relativePath + config.MainMenuBackgroundPath).then(blobAndFile => {
        showImageLocalFiles(blobAndFile.blob, mainMenuBackgroundElement.id, mainMenuBackgroundFile);
        mainMenuBackgroundFile.file = new File([blobAndFile.file], config.MainMenuBackgroundPath);
    });
}

function fetchLocalFile(relativePath, fileName) {
    return fetch(relativePath)
        .then((response) => {
            const reader = response.body.getReader();
            return new ReadableStream({
                start(controller) {
                    return pump();

                    function pump() {
                        return reader.read().then(({done, value}) => {
                            // When no more data needs to be consumed, close the stream
                            if (done) {
                                controller.close();
                                return;
                            }
                            // Enqueue the next data chunk into our target stream
                            controller.enqueue(value);
                            return pump();
                        });
                    }
                },
            });
        })
        .then((stream) => new Response(stream))
        .then((response) => response.blob())
        .then((blob) => {
            let blobURL = URL.createObjectURL(blob);
            let file = new File([blob], fileName);
            return {blob: blobURL, file: file};
        })
        .catch((err) => console.error(err));
}

function readFiles(files) {
    for (const file of files) {
        if (file.name === "config.json") {
            const reader = new FileReader();
            reader.readAsText(file, 'UTF-8');

            reader.onload = readerEvent => {
                //May return an array buffer instead of a string?
                const configJson = readerEvent.target.result;
                const parsedConfig = JSON.parse(configJson);
                gameConfig = parsedConfig;
                init(parsedConfig, files);
            }
        }
    }
}

function init(parsedConfig, files) {
    modTitleElement.value = gameConfig.ModName;

    for (const file of files) {
        if (file.name === parsedConfig.ModIconPath) {
            modIconFile.file = file;
            showImage(file, modIconElement.id);
        }

        if (file.name === parsedConfig.ContainerImagePath) {
            containerImageFile.file = file;
            showImage(file, containerImageElement.id);
        }
    }

    const filesObject = {};

    for (const file of files) {
        filesObject[file.name] = file;
    }

    removeAllChildren(suikaSkinsImageElement, SuikaSkinsImagesFileAndBlob);
    removeAllChildren(suikaIconsImageElement, suikaIconsFiles);
    removeAllChildren(suikaAudiosElement, suikaAudiosFiles);

    loadSuikaSkinsImages(filesObject, parsedConfig);
    loadSuikaIcons(filesObject, parsedConfig);
    loadSuikaAudios(filesObject, parsedConfig);
    loadSuikaDropChances(parsedConfig);
}

function loadSuikaSkinsImages(filesObject, parsedConfig) {
    for (const suikaSkinsImagePath of parsedConfig.SuikaSkinsImagesPaths) {
        const file = filesObject[suikaSkinsImagePath];
        if (file) {
            SuikaSkinsImagesFileAndBlob.push(file);
        }
    }

    for (const file of SuikaSkinsImagesFileAndBlob) {
        addImage(file, suikaSkinsImageElement, SuikaSkinsImagesFileAndBlob);
    }
}

function loadSuikaIcons(filesObject, parsedConfig) {
    for (const suikaIconPath of parsedConfig.SuikaIconsPaths) {
        const file = filesObject[suikaIconPath];
        if (file) {
            suikaIconsFiles.push(file);
        }
    }

    for (const file of suikaIconsFiles) {
        addImage(file, suikaIconsImageElement, suikaIconsFiles);
    }
}

function loadSuikaAudios(filesObject, parsedConfig) {
    for (const suikaAudio of parsedConfig.SuikaAudios) {
        const file = filesObject[suikaAudio.path];

        let fileAndData = {
            file: file,
            audio: suikaAudio
        }

        if (file) {
            fileAndData.file = file;
            fileAndData.audio = suikaAudio;
            suikaAudiosFiles.push(fileAndData);
        }
    }

    for (const fileAndData of suikaAudiosFiles) {
        addAudioControl(fileAndData, suikaAudiosElement);
    }
}

function loadSuikaDropChances(parsedConfig) {
    for (const suikaDropChance of parsedConfig.SuikaDropChances) {
        suikaDropChancesOrdered.push(suikaDropChance);
    }

    let input = document.getElementsByName('dropChances[]');
    for (let i = 0; i < input.length; i++) {
        let a = input[i];
        a.value = suikaDropChancesOrdered[i];
    }
}

function showImage(imageFile, elementId, reference) {
    const tempPath = URL.createObjectURL(imageFile);
    const img = document.querySelector(`#${elementId}`);
    img.style.display = "block";
    img.src = tempPath;
    img.onclick = () => {
        changeImageSingle(imageFile, img, reference);
    }
}

function showImageLocalFiles(imageFile, elementId, reference) {
    const img = document.querySelector(`#${elementId}`);
    img.style.display = "block";
    img.src = imageFile;

    img.onclick = () => {
        changeImageSingle(imageFile, img, reference);
    };
}

function addImage(imageFile, element, array) {
    const item = document.createElement("img");
    item.className = "image";
    item.src = URL.createObjectURL(imageFile);
    item.onclick = () => {
        changeImageArray(imageFile, imageFile.name, element, item, array);
    }
    element.append(item);
}

function addImageLocalFiles(imageFile, name, element, array) {
    const item = document.createElement("img");
    item.className = "image";
    item.src = imageFile;
    item.onclick = () => {
        changeImageArray(imageFile, name, element, item, array);
    }
    element.append(item);
}

function changeImageSingle(imageFile, item, reference) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (event) => {
        const newFile = event.target.files[0];
        item.src = URL.createObjectURL(newFile);
        reference.file = newFile;
    };
    input.click();
}

function changeImageArray(imageFile, name, element, item, array) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {

        URL.revokeObjectURL(imageFile);
        element.removeChild(item);

        const newFile = event.target.files[0];

        const index = array.findIndex((file) => file.name === name);
        if (index !== -1) {
            array[index] = newFile;
        }

        addImageAtIndex(newFile, element, index, array);
    };
    input.click();
}

function addImageAtIndex(imageFile, element, index, array) {
    const item = document.createElement("img");
    item.className = "image";
    item.src = URL.createObjectURL(imageFile);
    item.onclick = () => {
        changeImageArray(imageFile, element, item, array);
    }

    if (index === element.children.length) {
        element.appendChild(item);
    } else {
        const referenceNode = element.children[index];
        element.insertBefore(item, referenceNode);
    }
}

function removeAllChildren(element, array) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    array.splice(0, array.length);
}

function addAudioControl(fileAndData, element) {
    const audioElement = document.createElement("audio");
    const link = document.createElement("a");
    const audioFile = URL.createObjectURL(fileAndData.file);
    link.href = audioFile;
    audioElement.src = audioFile;
    audioElement.controls = true;
    //TODO: add change support
    audioElement.onclick = () => {
        //changeImageArray(imageFile, element, item, array);
    }

    audioElement.volume = fileAndData.audio.volume;

    audioElement.onvolumechange = () => {
        //alert(item.volume);
    }

    //TODO: append change sound button
    element.append(audioElement);
}

async function submitDropChances() {
    let input = document.getElementsByName('dropChances[]');

    suikaDropChancesOrdered.splice(0, suikaDropChancesOrdered.length);

    for (let i = 0; i < input.length; i++) {
        let a = input[i];
        suikaDropChancesOrdered.push(parseFloat(a.value));
    }
}

async function downloadMod() {

    for (let i = 0; i < suikaDropChancesOrdered.length; i++) {
        gameConfig.SuikaDropChances[i] = suikaDropChancesOrdered[i];
    }

    const suikaSkinsFiles = [];

    for (let i = 0; i < SuikaSkinsImagesFileAndBlob.length; i++) {
        suikaSkinsFiles.push(SuikaSkinsImagesFileAndBlob[i].file);
        gameConfig.SuikaSkinsImagesPaths[i] = SuikaSkinsImagesFileAndBlob[i].file.name;
    }

    for (let i = 0; i < suikaIconsFiles.length; i++) {
        gameConfig.SuikaIconsPaths[i] = suikaIconsFiles[i].name;
    }

    gameConfig.ModName = modTitleElement.value;
    gameConfig.LoadingScreenBackgroundPath = loadingScreenIconFile.file.name;
    gameConfig.InGameBackgroundPath = inGameBackgroundFile.file.name;
    gameConfig.MainMenuBackgroundPath = mainMenuBackgroundFile.file.name;
    gameConfig.PlayerSkinPath = playerSkinFile.file.name;

    await downloadModZip(gameConfig.ModName, gameConfig, suikaSkinsFiles);
}

async function downloadModZip(modName, configData, suikaSkinsFiles) {
    const configDataString = JSON.stringify(configData);

    const configFile = {name: "config.json", lastModified: new Date(), input: configDataString};

    const uniqueFilesOnly = (files) => {
        const seen = new Map();
        return files.filter(file => {
            if (seen.has(file.name)) {
                return false;
            }
            seen.set(file.name, true);
            return seen;
        });
    }

    const uniqueFiles = [configFile, ...uniqueFilesOnly([modIconFile.file, containerImageFile.file, ...suikaSkinsFiles, ...suikaIconsFiles, ...suikaAudiosFiles, ...suikaMergeAudioFiles, loadingScreenIconFile.file, inGameBackgroundFile.file, mainMenuBackgroundFile.file, playerSkinFile.file])];
    const blob = await downloadZip(uniqueFiles).blob();

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = modName;
    link.click();
    link.remove();

    URL.revokeObjectURL(blob);
}

loadModButtonElement.addEventListener('change', (event) => {
    readFiles(event.target.files);
});