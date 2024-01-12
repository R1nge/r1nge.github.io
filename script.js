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

const inGameBackgroundElement = document.querySelector('#in-game-background-image');
const loadingScreenBackgroundElement = document.querySelector('#loading-screen-background-image');
const loadingScreenIconElement = document.querySelector('#loading-screen-icon-image');
const playerSkinElement = document.querySelector('#player-skin-image');
const mainMenuBackgroundElement = document.querySelector('#main-menu-background-image');

const downloadButtonElement = document.querySelector('#download');
downloadButtonElement.addEventListener('click', submitDropChances);

const loadModButtonElement = document.querySelector('#load-mod-button');

let modIconFile = null;
let containerImageFile = null;
const suikaSkinsImagesFiles = [];
const suikaIconsFiles = [];
const suikaAudiosFiles = [];
const suikaDropChancesOrdered = [];

let inGameBackgroundFile = null;
let loadingScreenBackgroundFile = null;
let loadingScreenIconFile = null;
let playerSkinFile = null;
let mainMenuBackgroundFile = null;

await initUsingLocalFiles(gameConfig, "ModExample/");

async function initUsingLocalFiles(config, relativePath) {
    modTitleElement.textContent = config.ModName;

    console.log(fetchLocalImage(relativePath + config.ModIconPath) instanceof Promise);

    //TODO: create file
    
    fetchLocalImage(relativePath + config.ModIconPath).then(blobAndFile => {
        showImageLocalFiles(blobAndFile.blob, modIconElement.id).then(file => {
            modIconFile = new File([file], config.ModIconPath, {type: 'image/png'});
            console.log("RESOLVED MOD ICON")
        });
    });

    fetchLocalImage(relativePath + config.ContainerImagePath).then(blobAndFile => {
        showImageLocalFiles(blobAndFile.blob, containerImageElement.id).then(blob => {
            containerImageFile = new File([blob], config.ContainerImagePath, {type: 'image/png'});
        });
    })

    for (const path of config.SuikaSkinsImagesPaths) {
        await fetchLocalImage(relativePath + path).then(blobAndFile => {
            let image = new File([blobAndFile.file], path, {type: 'image/png'});
            suikaSkinsImagesFiles.push(image);
            console.log(image.name)
            addImageLocalFiles(blobAndFile.blob, image.name, suikaSkinsImageElement, suikaSkinsImagesFiles);
        })
    }

    for (const path of config.SuikaIconsPaths) {
        await fetchLocalImage(relativePath + path).then(blobAndFile => {
            let image = new File([blobAndFile.file], path, {type: 'image/png'});
            suikaIconsFiles.push(image);
            addImageLocalFiles(blobAndFile.blob, image.name, suikaIconsImageElement, suikaIconsFiles);
        })
    }

    //TODO: suika audios

    //

    loadSuikaDropChances(gameConfig);

    //TODO: time before timer trigger
    //
    //TODO: timer start time
    //

    fetchLocalImage(relativePath + config.LoadingScreenBackgroundPath).then(blobAndFile => {
        showImageLocalFiles(blobAndFile.blob, loadingScreenBackgroundElement.id).then(blob => {
            loadingScreenBackgroundFile = new File([blob], config.LoadingScreenBackgroundPath, {type: 'image/png'});
            console.log("DONE LOADING BACKGROUND");
        })
    });

    fetchLocalImage(relativePath + config.InGameBackgroundPath).then(blobAndFile => {
        showImageLocalFiles(blobAndFile.blob, inGameBackgroundElement.id).then(file => {
            inGameBackgroundFile = new File([file], config.InGameBackgroundPath, {type: 'image/png'});
            console.log("DONE LOADING IN GAME BACKGROUND");
        })
    });


    fetchLocalImage(relativePath + config.LoadingScreenIconPath).then(blobAndFile => {
        showImageLocalFiles(blobAndFile.blob, loadingScreenIconElement.id).then(file => {
            loadingScreenIconFile = new File([file], config.LoadingScreenIconPath, {type: 'image/png'});
            console.log("DONE LOADING LOADING SCREEN ICON");
        });
    });

    fetchLocalImage(relativePath + config.PlayerSkinPath).then(blobAndFile => {
        showImageLocalFiles(blobAndFile.blob, playerSkinElement.id).then(file => {
            playerSkinFile = new File([file], config.PlayerSkinPath, {type: 'image/png'});
            console.log("DONE LOADING PLAYER SKIN");
        });
    });

    //TODO: merge sounds audios
    //

    fetchLocalImage(relativePath + config.MainMenuBackgroundPath).then(blobAndFile => {
        showImageLocalFiles(blobAndFile.blob, mainMenuBackgroundElement.id).then(file => {
                mainMenuBackgroundFile = new File([file], config.MainMenuBackgroundPath, {type: 'image/png'});
                console.log("DONE LOADING MAIN MENU BACKGROUND");
            }
        );
    });
}

function fetchLocalImage(relativePath, fileName) {
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
            let file = new File([blob], fileName, {type: 'image/png'});
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

function showImage(imageFile, elementId) {
    const tempPath = URL.createObjectURL(imageFile);
    const img = document.querySelector(`#${elementId}`);
    img.style.display = "block";
    img.src = tempPath;
    img.onclick = () => {
        img.src = changeImageSingle(imageFile, img);
    }
}

function showImageLocalFiles(imageFile, elementId) {
    return new Promise((resolve, reject) => {
        const img = document.querySelector(`#${elementId}`);
        img.style.display = "block";
        img.src = imageFile;
        
        img.onclick = () => {
            return changeImageSingle(imageFile, img)
                .then(file => {
                    //img.src = URL.createObjectURL(file);
                    console.log("RESOLVE SHOW IMAGE LOCAL")
                    return resolve(file); // Resolve the promise with the file
                })
                .catch(error => {
                    reject(error); // Reject the promise with the error
                });
        };

        return resolve(imageFile);
    });
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

function changeImageSingle(imageFile, item) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    return new Promise((resolve, reject) => {
        input.onchange = (event) => {
            const newFile = event.target.files[0];
            item.src = URL.createObjectURL(newFile);
            console.log("RESOLVE CHNAGE IMAGE SINGLE")
            return resolve(newFile);
        };
        input.click();
    });
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
    const audioFile = URL.createObjectURL(fileAndData.matchedFile);
    link.href = audioFile;
    audioElement.src = audioFile;
    audioElement.controls = true;
    //TODO: add change support
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

    for (let i = 0; i < suikaIconsFiles.length; i++) {
        gameConfig.SuikaIconsPaths[i] = suikaIconsFiles[i].name;
    }

    gameConfig.LoadingScreenBackgroundPath = loadingScreenIconFile.name;
    gameConfig.InGameBackgroundPath = inGameBackgroundFile.name;
    gameConfig.MainMenuBackgroundPath = mainMenuBackgroundFile.name;
    gameConfig.PlayerSkinPath = playerSkinFile.name;

    //TODO: create a separate download button
    await downloadModZip(gameConfig.ModName, gameConfig);
}

async function downloadModZip(modName, configData) {
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
    //TODO: suika audios, merge audios

    const uniqueFiles = [configFile, ...uniqueFilesOnly([modIconFile, containerImageFile, ...suikaSkinsImagesFiles, ...suikaIconsFiles, loadingScreenIconFile, inGameBackgroundFile, mainMenuBackgroundFile, playerSkinFile])]; //, ...suikaAudioFiles])];
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