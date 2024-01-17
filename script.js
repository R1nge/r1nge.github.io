
//TODO: create a component for audio control, buttons(?)
//TODO: add an ability to change audios
//TODO: allow only mp3, ogg

//TODO: Interactive elements like buttons and links should be large enough (48x48px) (download button, dropChancesInput)

//TODO: load/save trigger start delay, timer start time

//TODO: refactor
//TODO: extract new methods

//TODO: change suika mod sounds to a smaller file

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
        1
    ],
    TimeBeforeTimerTrigger: 1,
    TimerStartTime: 5,
    InGameBackgroundPath: "background.png",
    LoadingScreenBackgroundPath: "background.png",
    LoadingScreenIconPath: "gura.png",
    PlayerSkinPath: "gura.png",
    MergeSoundsAudios: [
        {"path": "null", "volume": 0},
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

const inGameBackgroundElement = document.querySelector('#in-game-background-image');
const loadingScreenBackgroundElement = document.querySelector('#loading-screen-background-image');
const loadingScreenIconElement = document.querySelector('#loading-screen-icon-image');
const playerSkinElement = document.querySelector('#player-skin-image');
const mainMenuBackgroundElement = document.querySelector('#main-menu-background-image');

const suikaSkinsImageElement = document.querySelector('#suika-skins-list');
const suikaIconsImageElement = document.querySelector('#suika-icons-list');
const suikaAudiosElement = document.querySelector('#suika-audios-list');

const suikaMergeAudioElement = document.querySelector('#suika-merge-audios');

//TODO: fix
const dropChancesButton = document.querySelector('#download-mod-button');
dropChancesButton.addEventListener('click', submitDropChances);

const loadModButtonElement = document.querySelector('#load-mod-button').children[0];
const downloadModButtonElement = document.querySelector('#download-mod-button');
downloadModButtonElement.addEventListener('click', downloadMod);


const loadedFiles = new Map();

let modIconFile = {file: null};
let containerImageFile = {file: null};
const suikaSkinsImagesFileAndBlob = [];
const suikaIconsImagesFileAndBlob = [];
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

    await fetchAndSetFile(relativePath, config.ModIconPath, modIconElement, modIconFile);
    await fetchAndSetFile(relativePath, config.ContainerImagePath, containerImageElement, containerImageFile);
    await fetchAndSetFile(relativePath, config.LoadingScreenBackgroundPath, loadingScreenBackgroundElement, loadingScreenBackgroundFile);
    await fetchAndSetFile(relativePath, config.InGameBackgroundPath, inGameBackgroundElement, inGameBackgroundFile);
    await fetchAndSetFile(relativePath, config.LoadingScreenIconPath, loadingScreenIconElement, loadingScreenIconFile);
    await fetchAndSetFile(relativePath, config.PlayerSkinPath, playerSkinElement, playerSkinFile);
    await fetchAndSetFile(relativePath, config.MainMenuBackgroundPath, mainMenuBackgroundElement, mainMenuBackgroundFile);

    for (const path of config.SuikaSkinsImagesPaths) {
        await fetchAndStoreFile(relativePath, path, loadedFiles, suikaSkinsImagesFileAndBlob);
    }

    addImagesFromPaths(config.SuikaSkinsImagesPaths, loadedFiles, suikaSkinsImagesFileAndBlob, suikaSkinsImageElement);

    for (const path of config.SuikaIconsPaths) {
        if (loadedFiles.has(path)) {
            const fileAndBlob = loadedFiles.get(path);
            suikaIconsImagesFileAndBlob.push({
                file: fileAndBlob.file,
                blob: fileAndBlob.blob
            });
        } else {
            await fetchAndStoreFile(relativePath, path, loadedFiles, suikaSkinsImagesFileAndBlob);
        }
    }

    addImagesFromPaths(config.SuikaIconsPaths, loadedFiles, suikaIconsImagesFileAndBlob, suikaIconsImageElement);

    
    
    for (const audioData of config.SuikaAudios) {
        if (loadedFiles.has(audioData.path)) {
            let file = new File([loadedFiles.get(audioData.path)], audioData.path, {type: 'audio'});
            suikaAudiosFiles.push(file);

            let fileAndData = {
                file: file,
                audio: audioData
            };

            addAudioControl(fileAndData, suikaAudiosElement);
        } else {
            await fetchLocalFile(relativePath + audioData.path).then(blobAndFile => {
                let file = new File([blobAndFile.file], audioData.path, {type: 'audio'})
                suikaAudiosFiles.push(file);

                let fileAndData = {
                    file: file,
                    audio: audioData
                };

                loadedFiles.set(audioData.path, file);

                addAudioControl(fileAndData, suikaAudiosElement);
            });
        }
    }

    loadSuikaDropChances(gameConfig);

//TODO: time before timer trigger
//
//TODO: timer start time
//

   

    for (const audioData of config.MergeSoundsAudios) {
        if (audioData.path === "null" || audioData.path === "") {
            console.log("Skipping " + audioData.path);
            continue;
        }

        if (loadedFiles.has(audioData.path)) {
            let file = new File([loadedFiles.get(audioData.path)], audioData.path, {type: 'audio'});
            suikaMergeAudioFiles.push(file);

            let fileAndData = {
                file: file,
                audio: audioData
            };

            addAudioControl(fileAndData, suikaAudiosElement);
        } else {
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
    }
}

async function fetchAndStoreFile(relativePath, path, loadedFiles, suikaSkinsImagesFileAndBlob) {
    const blobAndFile = await fetchLocalFile(relativePath + path);
    const file = new File([blobAndFile.file], path);
    const fileAndBlob = {file: file, blob: blobAndFile.blob};

    if (!loadedFiles.has(file.name)) {
        loadedFiles.set(file.name, fileAndBlob);
    }

    suikaSkinsImagesFileAndBlob.push(fileAndBlob);
}

function addImagesFromPaths(paths, loadedFiles, suikaImagesFileAndBlob, imageElement) {
    paths.forEach((path) => {
        for (const fileAndBlob of suikaImagesFileAndBlob) {
            if (fileAndBlob.file.name === path) {
                addImage(fileAndBlob.blob, fileAndBlob.file.name, imageElement, suikaImagesFileAndBlob, true);
            }
        }
    });
}

async function fetchAndSetFile(relativePath, filePath, element, fileObject) {
    const blobAndFile = await fetchLocalFile(relativePath + filePath);
    fileObject.file = new File([blobAndFile.file], filePath);
    addChangeImageSingleEvent(blobAndFile.file, element, fileObject);
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

    removeAllChildren(suikaSkinsImageElement, suikaSkinsImagesFileAndBlob);
    removeAllChildren(suikaIconsImageElement, suikaIconsImagesFileAndBlob);
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
            suikaSkinsImagesFileAndBlob.push(file);
        }
    }

    for (const file of suikaSkinsImagesFileAndBlob) {
        addImage(file, file.name, suikaSkinsImageElement, suikaSkinsImagesFileAndBlob, false);
    }
}

function loadSuikaIcons(filesObject, parsedConfig) {
    for (const suikaIconPath of parsedConfig.SuikaIconsPaths) {
        const file = filesObject[suikaIconPath];
        if (file) {
            suikaIconsImagesFileAndBlob.push(file);
        }
    }

    for (const file of suikaIconsImagesFileAndBlob) {
        addImage(file, file.name, suikaIconsImageElement, suikaIconsImagesFileAndBlob, false);
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
    addChangeImageSingleEvent(imageFile, img, reference);
}

function addChangeImageSingleEvent(imageFile, img, reference) {
    img.onclick = () => {
        changeImageSingle(imageFile, img, reference);
    }
}

function addImage(imageFile, name, element, array, isLocal) {
    const li = document.createElement("li");
    const item = createImageElement();
    li.appendChild(item);
    item.alt = name;
    if (isLocal) {
        item.src = imageFile;
    } else {
        item.src = URL.createObjectURL(imageFile);
    }

    item.onclick = () => {
        changeImageArray(imageFile, imageFile.name, element, item, array);
    }
    element.append(item);
}

function changeImageSingle(imageFile, item, reference) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.png, .jpg';

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
    input.accept = '.png, .jpg';
    input.onchange = (event) => {

        const newFile = event.target.files[0];
        const blob = URL.createObjectURL(newFile);

        const index = array.findIndex(data => data['file'].name === name);

        if (index !== -1) {
            array[index].file = newFile;
            array[index].blob = blob;
        }

        URL.revokeObjectURL(imageFile);

        removeSpecificNode(element, index);

        addImageAtIndex(newFile, element, index, array, blob);
    };
    input.click();
}

function addImageAtIndex(imageFile, element, index, array, blob) {
    const li = document.createElement("li");
    const item = createImageElement();
    li.appendChild(item);
    item.src = blob;
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

function createImageElement() {
    const item = document.createElement("img");
    item.className = "image";
    return item;
}

function removeSpecificNode(element, index) {
    const children = element.children;
    if (children.length > 0) {
        element.removeChild(children[index]);
    }
}

function removeAllChildren(element, array) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }

    array.splice(0, array.length);
}

function addAudioControl(fileAndData, element) {
    const li = document.createElement("li");
    const audioElement = document.createElement("audio");
    li.appendChild(audioElement);
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
    element.append(li);
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

    for (let i = 0; i < gameConfig.SuikaSkinsImagesPaths.length; i++) {
        suikaSkinsFiles.push(suikaSkinsImagesFileAndBlob[i].file);
        gameConfig.SuikaSkinsImagesPaths[i] = suikaSkinsImagesFileAndBlob[i].file.name;
    }

    const suikaIconsFiles = [];

    for (let i = 0; i < gameConfig.SuikaIconsPaths.length; i++) {
        suikaIconsFiles.push(suikaIconsImagesFileAndBlob[i].file);
        gameConfig.SuikaIconsPaths[i] = suikaIconsImagesFileAndBlob[i].file.name;
    }

    gameConfig.ModName = modTitleElement.value;
    gameConfig.LoadingScreenBackgroundPath = loadingScreenIconFile.file.name;
    gameConfig.InGameBackgroundPath = inGameBackgroundFile.file.name;
    gameConfig.MainMenuBackgroundPath = mainMenuBackgroundFile.file.name;
    gameConfig.PlayerSkinPath = playerSkinFile.file.name;

    await downloadModZip(gameConfig.ModName, gameConfig, suikaSkinsFiles, suikaIconsFiles);
}

async function downloadModZip(modName, configData, suikaSkinsFiles, suikaIconsFiles) {
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

class CustomMusicPlayer extends HTMLAudioElement {
    constructor() {
        super();
    }
}