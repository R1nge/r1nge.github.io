import {downloadZip} from "./client-zip.js";

let gameConfig = {
    ModName: "Default", //load
    ModIconPath: "gura.png", //load
    ContainerImagePath: "container.png", //load
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
    ], //load/save
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
    ], //load/save
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
    ], //AudioData //load
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
    ], //load/save
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
    ], //AudioData
    MainMenuBackgroundPath: "background.png"
}

const modTitleElement = document.querySelector('#mod-title');
const modIconElement = document.querySelector('#mod-icon');
const containerImageElement = document.querySelector('#container-image');

const suikaSkinsImageElement = document.querySelector('#suika-skins-images');
const suikaIconsImageElement = document.querySelector('#suika-icons-images');
const suikaAudiosElement = document.querySelector('#suika-audios');

const downloadButtonElement = document.querySelector('#download');
downloadButtonElement.addEventListener('click', submitDropChances);

const loadModButtonElement = document.querySelector('#load-mod-button');

let modIconFile = null;
let containerImageFile = null;
const suikaSkinsImagesFiles = [];
const suikaIconsFiles = [];
const suikaAudiosFiles = [];
const suikaDropChancesOrdered = [];

await initUsingLocalFiles(gameConfig, "ModExample/");

async function initUsingLocalFiles(config, relativePath) {
    modTitleElement.textContent = config.ModName;
    
    fetch(relativePath + config.ModIconPath)
        .then(response => response.blob())
        .then(blob => {
            reader.readAsDataURL(blob);
            
            reader.onload = readerEvent => {
                const file = { name: "gura.png", lastModified: new Date(), input: readerEvent.target.result };

                modIconFile = file;
                showImageLocalFiles(file.input, modIconElement.id);
            }
            
            
        })
        .catch(error => {
            console.error('Error fetching directory:', error);
        });
    
    fetch(relativePath + config.ContainerImagePath)
        .then(response => {
            containerImageFile = response.url;
            showImageLocalFiles(response.url, containerImageElement.id);
        })
        .catch(error => {
            console.error('Error fetching directory:', error);
        })

    const reader = new FileReader();
    
    for (const path of config.SuikaSkinsImagesPaths) {
        await fetch(relativePath + path)
            .then(response => response.blob())
            .then(blob => {
                reader.readAsDataURL(blob);

                reader.onload = readerEvent => {
                    console.log(readerEvent.target.result);
                    suikaSkinsImagesFiles.push(readerEvent.target.result);
                    addImageLocalFiles(readerEvent.target.result, suikaSkinsImageElement, suikaSkinsImagesFiles);
                }
            })
            .catch(error => {
                console.error('Error fetching directory:', error);
            })
    }
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
    modTitleElement.textContent = gameConfig.ModName;
    
    for (const file of files) {
        if (file.name === parsedConfig.ModIconPath) {
            modIconFile = file;
            showImage(file, modIconElement.id);
        }

        if (file.name === parsedConfig.ContainerImagePath) {
            containerImageFile = file;
            showImage(file, containerImageElement.id);
        }
    }

    const filesObject = {};

    for (const file of files) {
        filesObject[file.name] = file;
    }

    removeAllChildren(suikaSkinsImageElement, suikaSkinsImagesFiles);
    removeAllChildren(suikaIconsImageElement, suikaIconsFiles);
    removeAllChildren(suikaAudiosElement, suikaAudiosFiles);

    loadSuikaSkinsImages(filesObject, parsedConfig);
    loadSuikaIcons(filesObject, parsedConfig);
    loadSuikaAudios(filesObject, parsedConfig);
    loadSuikaDropChances(parsedConfig);
}

function loadSuikaSkinsImages(filesObject, parsedConfig) {
    for (const suikaSkinsImagePath of parsedConfig.SuikaSkinsImagesPaths) {
        const matchedFile = filesObject[suikaSkinsImagePath];
        if (matchedFile) {
            suikaSkinsImagesFiles.push(matchedFile);
        }
    }

    for (const file of suikaSkinsImagesFiles) {
        addImage(file, suikaSkinsImageElement, suikaSkinsImagesFiles);
    }
}

function loadSuikaIcons(filesObject, parsedConfig) {
    for (const suikaIconPath of parsedConfig.SuikaIconsPaths) {
        const matchedFile = filesObject[suikaIconPath];
        if (matchedFile) {
            suikaIconsFiles.push(matchedFile);
        }
    }

    for (const file of suikaIconsFiles) {
        addImage(file, suikaIconsImageElement, suikaIconsFiles);
    }
}

function loadSuikaAudios(filesObject, parsedConfig) {
    for (const suikaAudio of parsedConfig.SuikaAudios) {
        const matchedFile = filesObject[suikaAudio.path];

        let fileAndData = {
            matchedFile, suikaAudio
        }

        if (matchedFile) {
            fileAndData.matchedFile = matchedFile;
            fileAndData.suikaAudio = suikaAudio;
            suikaAudiosFiles.push(fileAndData);
        }
    }

    for (const fileAndData of suikaAudiosFiles) {
        addAudioControl(fileAndData, suikaAudiosElement);
    }
}

function loadSuikaDropChances(filesObject, parsedConfig) {
    for (const suikaDropChance of parsedConfig.SuikaDropChances) {
        suikaDropChancesOrdered.push(suikaDropChance);
    }

    let input = document.getElementsByName('dropChances[]');
    for (let i = 0; i < input.length; i++) {
        let a = input[i];
        a.value = suikaDropChancesOrdered[i];
    }
}

function showImage(imageFile, elementId) {
    const tempPath = URL.createObjectURL(imageFile);
    const img = document.querySelector(`#${elementId}`);
    img.style.display = "block";
    img.src = tempPath;
    img.onclick = () => {
        changeImageSingle(imageFile, img);
    }
}

function showImageLocalFiles(imageFile, elementId) {
    const img = document.querySelector(`#${elementId}`);
    img.style.display = "block";
    img.src = imageFile;
    img.onclick = () => {
        changeImageSingle(imageFile, img);
    }
}

function addImage(imageFile, element, array) {
    const item = document.createElement("img");
    item.className = "image";
    item.src = URL.createObjectURL(imageFile);
    item.onclick = () => {
        changeImageArray(imageFile, element, item, array);
    }
    element.append(item);
}

function addImageLocalFiles(imageFile, element, array) {
    const item = document.createElement("img");
    item.className = "image";
    item.src = imageFile.input;
    item.onclick = () => {
        changeImageArray(imageFile, element, item, array);
    }
    element.append(item);
}

function changeImageSingle(imageFile, item) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {

        //TODO: change icon file
        const newFile = event.target.files[0];
        item.src = URL.createObjectURL(newFile);
    };
    input.click();
}

function changeImageArray(imageFile, element, item, array) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {

        URL.revokeObjectURL(imageFile.src);
        element.removeChild(item);


        const newFile = event.target.files[0];

        const index = array.findIndex((file) => file.name === imageFile.name);
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
    const audioFile = URL.createObjectURL(fileAndData.matchedFile);
    link.href = audioFile;
    audioElement.src = audioFile;
    audioElement.controls = true;
    audioElement.onclick = () => {
        //changeImageArray(imageFile, element, item, array);
    }

    audioElement.volume = fileAndData.suikaAudio.volume;

    audioElement.onvolumechange = () => {
        //alert(item.volume);
    }
    
    //TODO: append change sound button
    element.append(audioElement);
}

async function submitDropChances() {
    let input = document.getElementsByName('dropChances[]');

    for (let i = 0; i < input.length; i++) {
        let a = input[i];
        suikaDropChancesOrdered.push(a.value);
    }

    for (let i = 0; i < suikaDropChancesOrdered.length; i++) {
        gameConfig.SuikaDropChances[i] = suikaDropChancesOrdered[i];
    }

    for (let i = 0; i < suikaSkinsImagesFiles.length; i++) {
        gameConfig.SuikaSkinsImagesPaths[i] = suikaSkinsImagesFiles[i].name;
    }

    await downloadModZip(gameConfig.ModName, gameConfig, modIconFile, containerImageFile, suikaSkinsImagesFiles, suikaIconsFiles, suikaAudiosFiles);
}

async function downloadModZip(modName, configData, modIconImageFile, containerImageFile, suikaSkinsFiles, suikaIconsFiles, suikaAudiosFiles) {
    const configDataString = JSON.stringify(configData);
    
    const configFile = {name: "config.json", lastModified: new Date(), input: configDataString};
    const iconFile = {name: modIconFile.name, lastModified: new Date(), input: modIconImageFile};
    const containerFile = {name: containerImageFile.name, lastModified: new Date(), input: containerImageFile};

    const suikaSkinFiles = [];

    for (let i = 0; i < configData.SuikaSkinsImagesPaths.length; i++) {
        suikaSkinFiles.push({
            name: configData.SuikaSkinsImagesPaths[i],
            lastModified: new Date(),
            input: suikaSkinsFiles[i]
        });
    }

    const suikaIconFiles = [];

    for (let i = 0; i < configData.SuikaIconsPaths.length; i++) {
        suikaIconFiles.push({
            name: configData.SuikaIconsPaths[i],
            lastModified: new Date(),
            input: suikaIconsFiles[i]
        });
    }

    const suikaAudioFiles = [];

    for (let i = 0; i < configData.SuikaAudios.length; i++) {
        suikaAudioFiles.push({
            name: configData.SuikaAudios[i].path,
            lastModified: new Date(),
            input: suikaAudiosFiles[i]
        });
    }

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
    
    //const suikaIconsFiles = [];
    //const suikaAudiosFiles = [];
    //const suikaDropChancesOrdered = [];

    const uniqueFiles = [configFile, ...uniqueFilesOnly([iconFile, containerFile])]; //, ...suikaSkinFiles])]; //, ...suikaIconFiles, ...suikaAudioFiles])];
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