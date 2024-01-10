import {downloadZip} from "./client-zip.js";

const audioData = {
    path: "",
    volume: 0
}

let gameConfig = {
    ModName: "", //load
    ModIconPath: "", //load
    ContainerImagePath: "", //load
    SuikaSkinsImagesPaths: [], //save/load
    SuikaIconsPaths: [], //load
    SuikaAudios: [], //AudioData //load
    SuikaDropChances: [], //load
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


const suikaSkinsOrdered = [];
const suikaIconsOrdered = [];
const suikaAudiosDataOrdered = [];
const suikaDropChancesOrdered = [];

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
                        showImage(file, modIconElement.id, gameConfig.ModIconPath);
                    }

                    if (file.name === parsedConfig.ContainerImagePath) {
                        showImage(file, containerImageElement.id, gameConfig.ContainerImagePath);
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
                        console.log(fileAndData);
                        suikaAudiosDataOrdered.push(fileAndData);
                    }
                }

                for (const fileAndData of suikaAudiosDataOrdered) {
                    addAudioControl(fileAndData, suikaAudiosElement);
                }
            }
        }
    }
}

function showImage(imageFile, elementId, valueToAssign) {
    const tempPath = URL.createObjectURL(imageFile);
    const img = document.querySelector(`#${elementId}`);
    img.style.display = "block";
    img.src = tempPath;
    valueToAssign = tempPath;
    img.onclick = () => {
        changeImageSingle(imageFile, img, img);
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

function changeImageSingle(imageFile, element, item) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {
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
    let k = "The respective values are :";
    let input = document.getElementsByName('dropChances[]');


    for (let i = 0; i < input.length; i++) {
        let a = input[i];
        suikaDropChancesOrdered.push(a.value);
        k = k + "array[" + i + "].value= " + a.value + " ";
    }


    for (let i = 0; i < suikaSkinsOrdered.length; i++) {
        gameConfig.SuikaSkinsImagesPaths[i] = suikaSkinsOrdered[i].name;
    }

    //TODO: save json
    await downloadModZip(gameConfig.ModName, gameConfig);

    alert(k);
}

async function downloadModZip(filename, dataObjToWrite) {
    const configData = JSON.stringify(dataObjToWrite);
    
    const configFile = {name: "config.json", lastModified: new Date(), input: configData}
    const blob = await downloadZip([configFile]).blob();
    
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    link.remove();

    URL.revokeObjectURL(blob);
}

loadModButtonElement.addEventListener('change', (event) => {
    readFiles(event.target.files);
});