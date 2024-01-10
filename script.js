const audioDataPrototype = {
    Path: "",
    Volume: 0
}

const gameConfigPrototype = {
    ModName: "",
    ModIconPath: "",
    ContainerImagePath: "",
    SuikaSkinsImagesPaths: [],
    SuikaIconsPaths: [],
    SuikaAudios: [], //AudioData
    SuikaDropChances: [],
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
const loadModButtonElement = document.querySelector('#load-mod-button');

function readFiles(files) {
    for (const file of files) {
        if (file.name === "config.json") {
            const reader = new FileReader();
            reader.readAsText(file, 'UTF-8');

            reader.onload = readerEvent => {
                const configJson = readerEvent.target.result;
                const parsedConfig = JSON.parse(configJson);
                applyParsedData(parsedConfig);

                removeImages(suikaSkinsImageElement);

                console.log(parsedConfig.ModIconPath);

                for (const file of files) {
                    if (file.name === parsedConfig.ModIconPath) {
                        showImage(file, modIconElement.id);
                    }

                    if (file.name === parsedConfig.ContainerImagePath) {
                        showImage(file, containerImageElement.id);
                    }
                }

                const filesObject = {};

                for (const file of files) {
                    filesObject[file.name] = file;
                }

                const orderedFiles = [];

                for (const suikaSkinsImagePath of parsedConfig.SuikaSkinsImagesPaths) {
                    const matchedFile = filesObject[suikaSkinsImagePath];
                    if (matchedFile) {
                        orderedFiles.push(matchedFile);
                    }
                }

                for (const file of orderedFiles) {
                    addImage(file, suikaSkinsImageElement);
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
}

function addImage(imageFile, element) {
    let item = document.createElement("img");
    item.className = "image";
    item.src = URL.createObjectURL(imageFile);
    element.append(item);
}

function removeImages(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function applyParsedData(parsedGameConfig) {
    modTitleElement.textContent = parsedGameConfig.ModName;
}

loadModButtonElement.addEventListener('change', (event) => {
    readFiles(event.target.files);
});