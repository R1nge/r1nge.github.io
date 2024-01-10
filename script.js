import {downloadZip} from "./client-zip.js";

const audioData = {
    path: "",
    volume: 0
}

let gameConfig = {
    ModName: "", //load/save
    ModIconPath: "", //load
    ContainerImagePath: "", //load
    SuikaSkinsImagesPaths: [], //load/save
    SuikaIconsPaths: [], //load/save
    SuikaAudios: [], //AudioData //load/save
    SuikaDropChances: [], //load/save
    TimeBeforeTimerTrigger: 0,
    TimerStartTime: 0,
    InGameBackgroundPath: "",
    LoadingScreenBackgroundPath: "",
    LoadingScreenIconPath: "",
    PlayerSkinPath: "",
    MergeSoundsAudios: [], //AudioData
    MainMenuBackgroundPath: ""
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

//Config data
const suikaSkinsOrdered = [];
const suikaIconsOrdered = [];
const suikaAudiosDataOrdered = [];
const suikaDropChancesOrdered = [];

//Files
let modIconFile = null;
let containerImageFile = null;
const suikaSkinsImagesFiles = [];
const suikaIconsFiles = [];
const suikaAudiosFiles = [];


function readFiles(files) {
    for (const file of files) {
        if (file.name === "config.json") {
            const reader = new FileReader();
            reader.readAsText(file, 'UTF-8');

            reader.onload = readerEvent => {
                const configJson = readerEvent.target.result;
                const parsedConfig = JSON.parse(configJson);
                gameConfig = parsedConfig;

                modTitleElement.textContent = gameConfig.ModName;

                removeAllChildren(suikaSkinsImageElement, suikaSkinsOrdered);
                removeAllChildren(suikaIconsImageElement, suikaIconsOrdered);
                removeAllChildren(suikaAudiosElement, suikaAudiosDataOrdered);

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

                // SuikaSkinsImages

                for (const suikaSkinsImagePath of parsedConfig.SuikaSkinsImagesPaths) {
                    const matchedFile = filesObject[suikaSkinsImagePath];
                    if (matchedFile) {
                        suikaSkinsImagesFiles.push(matchedFile);
                        suikaSkinsOrdered.push(matchedFile);
                    }
                }

                for (const file of suikaSkinsOrdered) {
                    addImage(file, suikaSkinsImageElement, suikaSkinsOrdered);
                }

                //SuikaIcons

                for (const suikaIconPath of parsedConfig.SuikaIconsPaths) {
                    const matchedFile = filesObject[suikaIconPath];
                    if (matchedFile) {
                        suikaIconsFiles.push(matchedFile);
                        suikaIconsOrdered.push(matchedFile);
                    }
                }

                for (const file of suikaIconsOrdered) {
                    addImage(file, suikaIconsImageElement, suikaIconsOrdered);
                }

                //SuikaAudiosPaths and SuikaAudiosVolumes

                for (const suikaAudio of parsedConfig.SuikaAudios) {
                    const matchedFile = filesObject[suikaAudio.path];

                    let fileAndData = {
                        matchedFile, suikaAudio
                    }

                    if (matchedFile) {
                        fileAndData.matchedFile = matchedFile;
                        fileAndData.suikaAudio = suikaAudio;
                        suikaAudiosFiles.push(matchedFile);
                        suikaAudiosDataOrdered.push(fileAndData);
                    }
                }

                for (const fileAndData of suikaAudiosDataOrdered) {
                    addAudioControl(fileAndData, suikaAudiosElement);
                }
                
                //SuikaDropChances

                for (const suikaDropChance of parsedConfig.SuikaDropChances) {
                    suikaDropChancesOrdered.push(suikaDropChance);
                }

                let input = document.getElementsByName('dropChances[]');
                for (let i = 0; i < input.length; i++) {
                    let a = input[i];
                    a.value = suikaDropChancesOrdered[i];
                }
            }
        }
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

function addImage(imageFile, element, array) {
    const item = document.createElement("img");
    item.className = "image";
    item.src = URL.createObjectURL(imageFile);
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
    const item = document.createElement("audio");
    item.src = URL.createObjectURL(fileAndData.matchedFile);
    item.controls = true;
    item.onclick = () => {
        //changeImageArray(imageFile, element, item, array);
    }

    item.volume = fileAndData.suikaAudio.volume;

    item.onvolumechange = () => {
        //alert(item.volume);
    }

    element.append(item);
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

    for (let i = 0; i < suikaSkinsOrdered.length; i++) {
        gameConfig.SuikaSkinsImagesPaths[i] = suikaSkinsOrdered[i].name;
    }

    await downloadModZip(gameConfig.ModName, gameConfig, modIconFile, containerImageFile, suikaSkinsImagesFiles, suikaIconsFiles, suikaAudiosFiles);
}

async function downloadModZip(modName, configData, modIconImage, containerImage, suikaSkinsFiles, suikaIconsFiles, suikaAudiosFiles) {
    const configDataString = JSON.stringify(configData, null, 2);

    const configFile = {name: "config.json", lastModified: new Date(), input: configDataString};
    const iconFile = {name: modIconImage.name, lastModified: new Date(), input: modIconImage};
    const containerFile = {name: containerImage.name, lastModified: new Date(), input: containerImage};

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

    const uniqueFiles = [configFile, ...uniqueFilesOnly([iconFile, containerFile, ...suikaSkinFiles, ...suikaIconFiles, ...suikaAudioFiles])];
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