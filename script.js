
//TODO: make audio player more stylish
//TODO: add roundish percent fields?

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
        {"path": "silence.mp3", "volume": 1},
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

const timeBeforeTimerTriggerElement = document.querySelector('#time-before-timer-trigger');
const timerStartTimeElement = document.querySelector('#timer-start-time');

const loadModButtonElement = document.querySelector('#load-mod-button');
loadModButtonElement.addEventListener('click', (event) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.webkitdirectory = true;
    fileInput.style.display = 'none';
    fileInput.click();
    fileInput.onchange = (event) => {
        const files = event.target.files;
        if (files) {
            readFiles(files);
        }
    }
});

const downloadModButtonElement = document.querySelector('#download-mod-button');
downloadModButtonElement.addEventListener('click', downloadMod);

const loadedFiles = new Map();

let modIconFile = {file: null};
let containerImageFile = {file: null};
const suikaSkinsImagesFileAndBlob = [];
const suikaIconsImagesFileAndBlob = [];
const suikaAudiosFileAndData = [];
const suikaDropChancesOrdered = [];
const suikaMergeAudiosFileAndData = [];

let inGameBackgroundFile = {file: null};
let loadingScreenBackgroundFile = {file: null};
let loadingScreenIconFile = {file: null};
let playerSkinFile = {file: null};
let mainMenuBackgroundFile = {file: null};

await initUsingLocalFiles(gameConfig, "ModExample/");

async function initUsingLocalFiles(config, relativePath) {
    modTitleElement.value = config.ModName;

    fetchAndSetFile(relativePath, config.ModIconPath, modIconElement, modIconFile);
    fetchAndSetFile(relativePath, config.ContainerImagePath, containerImageElement, containerImageFile);
    fetchAndSetFile(relativePath, config.LoadingScreenBackgroundPath, loadingScreenBackgroundElement, loadingScreenBackgroundFile);
    fetchAndSetFile(relativePath, config.InGameBackgroundPath, inGameBackgroundElement, inGameBackgroundFile);
    fetchAndSetFile(relativePath, config.LoadingScreenIconPath, loadingScreenIconElement, loadingScreenIconFile);
    fetchAndSetFile(relativePath, config.PlayerSkinPath, playerSkinElement, playerSkinFile);
    fetchAndSetFile(relativePath, config.MainMenuBackgroundPath, mainMenuBackgroundElement, mainMenuBackgroundFile);

    const audioControls = [];

    for (let i = 0; i < config.SuikaAudios.length; i++) {
        const audioControl = addAudioControl(suikaAudiosElement, suikaAudiosFileAndData, i);
        audioControls.push(audioControl);
    }

    const mergeAudioControls = [];

    for (let i = 0; i < config.MergeSoundsAudios.length; i++) {
        const audioControl = addAudioControl(suikaMergeAudioElement, suikaMergeAudiosFileAndData, i);
        mergeAudioControls.push(audioControl);
    }

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
            await fetchAndStoreFile(relativePath, path, loadedFiles, suikaIconsImagesFileAndBlob);
        }
    }
    addImagesFromPaths(config.SuikaIconsPaths, loadedFiles, suikaIconsImagesFileAndBlob, suikaIconsImageElement);

    for (let i = 0; i < config.SuikaAudios.length; i++) {
        const audioData = config.SuikaAudios[i];
        await createFileAndData(audioControls[i], relativePath, audioData, loadedFiles, suikaAudiosFileAndData);
    }

    for (let i = 0; i < config.MergeSoundsAudios.length; i++) {
        const audioData = config.MergeSoundsAudios[i];
        await createFileAndData(mergeAudioControls[i], relativePath, audioData, loadedFiles, suikaMergeAudiosFileAndData);
    }

    loadSuikaDropChances(gameConfig);

    timeBeforeTimerTriggerElement.value = gameConfig.TimeBeforeTimerTrigger;
    timerStartTimeElement.value = gameConfig.TimerStartTime;
}

async function createFileAndData(audioElement, relativePath, audioData, loadedFiles, fileArray) {
    if (loadedFiles.has(audioData.path)) {
        let file = new File([loadedFiles.get(audioData.path)], audioData.path, {type: 'audio'});

        let fileAndData = {
            file: file,
            audio: audioData
        };

        fileArray.push(fileAndData);

        setAudioControlData(audioElement, fileAndData);
    } else {
        await fetchLocalFile(relativePath + audioData.path).then(blobAndFile => {
            let file = new File([blobAndFile.file], audioData.path, {type: 'audio'})

            let fileAndData = {
                file: file,
                audio: audioData
            };

            fileArray.push(fileAndData);

            loadedFiles.set(audioData.path, file);

            setAudioControlData(audioElement, fileAndData);
        });
    }
}

async function fetchAndStoreFile(relativePath, path, loadedFiles, filesAndBlobs) {
    const blobAndFile = await fetchLocalFile(relativePath + path);
    const file = new File([blobAndFile.file], path);
    const fileAndBlob = {file: file, blob: blobAndFile.blob};

    if (!loadedFiles.has(file.name)) {
        loadedFiles.set(file.name, fileAndBlob);
    }

    filesAndBlobs.push(fileAndBlob);
}

function addImagesFromPaths(paths, loadedFiles, suikaImagesFileAndBlob, imageElement) {
    paths.forEach((path) => {
        for (const fileAndBlob of suikaImagesFileAndBlob) {
            if (fileAndBlob.file.name === path) {
                addImage(fileAndBlob, imageElement, suikaImagesFileAndBlob);
            }
        }
    });
}

async function fetchAndSetFile(relativePath, filePath, element, fileObject) {
    let blobAndFile = await fetchLocalFile(relativePath + filePath);
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
            showImage(file, modIconElement.id, modIconFile);
        }

        if (file.name === parsedConfig.ContainerImagePath) {
            containerImageFile.file = file;
            showImage(file, containerImageElement.id, containerImageFile);
        }

        if (file.name === parsedConfig.PlayerSkinPath) {
            playerSkinFile.file = file;
            showImage(file, playerSkinElement.id, playerSkinFile);
        }

        if (file.name === parsedConfig.LoadingScreenIconPath) {
            loadingScreenIconFile.file = file;
            showImage(file, loadingScreenIconElement.id, loadingScreenIconFile);
        }

        if (file.name === parsedConfig.InGameBackgroundPath) {
            inGameBackgroundFile.file = file;
            showImage(file, inGameBackgroundElement.id, inGameBackgroundFile);
        }

        if (file.name === parsedConfig.LoadingScreenBackgroundPath) {
            loadingScreenBackgroundFile.file = file;
            showImage(file, loadingScreenBackgroundElement.id, loadingScreenBackgroundFile);
        }

        if (file.name === parsedConfig.MainMenuBackgroundPath) {
            mainMenuBackgroundFile.file = file;
            showImage(file, mainMenuBackgroundElement.id, mainMenuBackgroundFile);
        }
    }

    const filesObject = {};

    for (const file of files) {
        filesObject[file.name] = file;
    }

    removeAllChildren(suikaSkinsImageElement, suikaSkinsImagesFileAndBlob);
    removeAllChildren(suikaIconsImageElement, suikaIconsImagesFileAndBlob);
    removeAllChildren(suikaAudiosElement, suikaAudiosFileAndData);
    removeAllChildren(suikaMergeAudioElement, suikaMergeAudiosFileAndData);

    loadSuikaSkinsImages(filesObject, parsedConfig);
    loadSuikaIcons(filesObject, parsedConfig);
    loadSuikaAudios(filesObject, parsedConfig);
    loadSuikaMergeAudios(filesObject, parsedConfig);
    loadSuikaDropChances(parsedConfig);
    loadTimeBeforeTrigger(parsedConfig);
    loadTimerStartTime(parsedConfig);
}

function loadSuikaSkinsImages(filesObject, parsedConfig) {
    for (const suikaSkinsImagePath of parsedConfig.SuikaSkinsImagesPaths) {
        const file = filesObject[suikaSkinsImagePath];
        if (file) {
            const blob = URL.createObjectURL(file);
            suikaSkinsImagesFileAndBlob.push({file: file, blob: blob});
        }
    }

    for (const fileAndBlob of suikaSkinsImagesFileAndBlob) {
        addImage(fileAndBlob, suikaSkinsImageElement, suikaSkinsImagesFileAndBlob);
    }
}

function loadSuikaIcons(filesObject, parsedConfig) {
    for (const suikaIconPath of parsedConfig.SuikaIconsPaths) {
        const file = filesObject[suikaIconPath];
        if (file) {
            const blob = URL.createObjectURL(file);
            suikaIconsImagesFileAndBlob.push({file: file, blob: blob});
        }
    }

    for (const fileAndBlob of suikaIconsImagesFileAndBlob) {
        addImage(fileAndBlob, suikaIconsImageElement, suikaIconsImagesFileAndBlob);
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
            suikaAudiosFileAndData.push(fileAndData);
        }
    }

    for (let i = 0; i < suikaAudiosFileAndData.length; i++) {
        const audioElement = addAudioControl(suikaAudiosElement, suikaAudiosFileAndData, i);
        setAudioControlData(audioElement, suikaAudiosFileAndData[i]);
    }
}

function loadSuikaMergeAudios(filesObject, parsedConfig) {
    for (const suikaMergeAudio of parsedConfig.MergeSoundsAudios) {
        const file = filesObject[suikaMergeAudio.path];

        let fileAndData = {
            file: file,
            audio: suikaMergeAudio
        }

        if (file) {
            suikaMergeAudiosFileAndData.push(fileAndData);
        }
    }

    for (let i = 0; i < suikaMergeAudiosFileAndData.length; i++) {
        const audioElement = addAudioControl(suikaMergeAudioElement, suikaMergeAudiosFileAndData, i);
        setAudioControlData(audioElement, suikaMergeAudiosFileAndData[i]);
    }
}

function loadSuikaDropChances(parsedConfig) {
    suikaDropChancesOrdered.splice(0, suikaDropChancesOrdered.length);

    for (const suikaDropChance of parsedConfig.SuikaDropChances) {
        suikaDropChancesOrdered.push(suikaDropChance);
    }

    let input = document.getElementsByName('dropChances[]');
    for (let i = 0; i < input.length; i++) {
        let a = input[i];
        a.value = suikaDropChancesOrdered[i];
    }
}

function loadTimeBeforeTrigger(parsedConfig) {
    timeBeforeTimerTriggerElement.value = parsedConfig.TimeBeforeTimerTrigger;
}

function loadTimerStartTime(parsedConfig) {
    timerStartTimeElement.value = parsedConfig.TimerStartTime;
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

function addImage(imageFileAndBlob, element, array) {
    const li = document.createElement("li");
    li.className = "grid-item";
    const item = createImageElement();
    li.appendChild(item);
    item.alt = name;
    item.src = imageFileAndBlob.blob;

    item.onclick = () => {
        changeImageArray(imageFileAndBlob.file, element, array);
    }
    element.append(li);
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

function changeImageArray(imageFile, element, array) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.png, .jpg';
    input.onchange = (event) => {

        const newFile = event.target.files[0];
        const blob = URL.createObjectURL(newFile);

        const index = array.findIndex(data => data['file'].name === imageFile.name);

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
        changeImageArray(imageFile, element, array);
    }

    if (index === element.children.length) {
        element.appendChild(li);
    } else {
        const referenceNode = element.children[index];
        element.insertBefore(li, referenceNode);
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

function addAudioControl(element, array, index) {
    const li = document.createElement("li");
    const audioElement = document.createElement("audio-player");
    li.appendChild(audioElement);

    audioElement.changeFileButton.addEventListener('click', () => {
        openFileDialogAudio(audioElement).then(file => {
            array[index].file = file;
            setAudioControlData(audioElement, array[index])
        });
    });

    element.append(li);

    return audioElement;
}

function setAudioControlData(audioElement, fileAndData) {
    if (fileAndData === null || fileAndData.file === null) {
        console.log("Audio data not found");
        audioElement.src = null;
        audioElement.controls = true;
        audioElement.volume = 0;
    }

    const audioFile = URL.createObjectURL(fileAndData.file);
    //TODO: is there even a reason for a link element?
    const link = document.createElement("a");
    link.href = fileAndData.file;
    audioElement.setAttribute('src', audioFile);
    audioElement.setAttribute('volume', fileAndData.audio.volume);

    audioElement.volumeBar.addEventListener('input', () => {
        fileAndData.audio.volume = audioElement.volumeBar.value / 100;
    })

    audioElement.controls = true;
}

function submitDropChances() {
    let input = document.getElementsByName('dropChances[]');

    suikaDropChancesOrdered.splice(0, suikaDropChancesOrdered.length);

    for (let i = 0; i < input.length; i++) {
        let a = input[i];
        suikaDropChancesOrdered.push(parseFloat(a.value));
    }
}

function openFileDialogAudio(audioElement) {
    return new Promise((resolve, reject) => {
        const inputFile = document.createElement('input');
        inputFile.type = 'file';
        inputFile.accept = '.mp3, .ogg, .wav';
        inputFile.click();

        inputFile.onchange = (event) => {
            const file = event.target.files[0];
            if (file) {
                audioElement.audio.src = URL.createObjectURL(file);
                audioElement.togglePlayButton(true);
                resolve(file);
            } else {
                reject(new Error('No file selected'));
            }
        };
    });
}

async function downloadMod() {

    submitDropChances();

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

    const audioFiles = [];

    for (let i = 0; i < gameConfig.SuikaAudios.length; i++) {
        audioFiles.push(suikaAudiosFileAndData[i].file);
        gameConfig.SuikaAudios[i].path = suikaAudiosFileAndData[i].file.name;
        gameConfig.SuikaAudios[i].volume = suikaAudiosFileAndData[i].audio.volume;
    }

    const mergeFiles = [];
    const missingIndexes = [];

    for (let i = 0; i < suikaMergeAudiosFileAndData.length; i++) {
        if (gameConfig.MergeSoundsAudios[i].path === "" || gameConfig.MergeSoundsAudios[i].path === null || gameConfig.MergeSoundsAudios[i].path === undefined || gameConfig.MergeSoundsAudios[i].path === "null") {
            gameConfig.MergeSoundsAudios[i].path = "silence.mp3";
            missingIndexes.push(i);
            continue;
        }
        mergeFiles.push(suikaMergeAudiosFileAndData[i].file);
    }

    for (let i = 0; i < mergeFiles.length; i++) {
        if (missingIndexes.includes(i)) continue;
        gameConfig.MergeSoundsAudios[i].volume = suikaMergeAudiosFileAndData[i].audio.volume;
        gameConfig.MergeSoundsAudios[i].path = mergeFiles[i].name;
    }

    gameConfig.ModName = modTitleElement.value;

    gameConfig.ModIconPath = modIconFile.file.name;
    gameConfig.ContainerImagePath = containerImageFile.file.name;
    gameConfig.PlayerSkinPath = playerSkinFile.file.name;
    gameConfig.LoadingScreenIconPath = loadingScreenIconFile.file.name;

    gameConfig.LoadingScreenBackgroundPath = loadingScreenBackgroundFile.file.name;
    gameConfig.InGameBackgroundPath = inGameBackgroundFile.file.name;
    gameConfig.MainMenuBackgroundPath = mainMenuBackgroundFile.file.name;

    gameConfig.TimerStartTime = timerStartTimeElement.value;
    gameConfig.TimeBeforeTimerTrigger = timeBeforeTimerTriggerElement.value;

    await downloadModZip(gameConfig.ModName, gameConfig, suikaSkinsFiles, suikaIconsFiles, audioFiles, mergeFiles);
}

async function downloadModZip(modName, configData, suikaSkinsFiles, suikaIconsFiles, suikaAudioFiles, suikaMergeAudioFiles) {
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

    const uniqueFiles = [configFile, ...uniqueFilesOnly([modIconFile.file, containerImageFile.file, ...suikaSkinsFiles, ...suikaIconsFiles, ...suikaAudioFiles, ...suikaMergeAudioFiles, loadingScreenIconFile.file, inGameBackgroundFile.file, mainMenuBackgroundFile.file, playerSkinFile.file])];
    const blob = await downloadZip(uniqueFiles).blob();

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = modName;
    link.click();
    link.remove();
    URL.revokeObjectURL(blob);
}