const audioData = {
    Path: "",
    Volume: 0
}

const gameConfig = {
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

const suikaSkinsOrdered = [];

function readFiles(files) {
    for (const file of files) {
        if (file.name === "config.json") {
            const reader = new FileReader();
            reader.readAsText(file, 'UTF-8');

            reader.onload = readerEvent => {
                const configJson = readerEvent.target.result;
                const parsedConfig = JSON.parse(configJson);

                modTitleElement.textContent = parsedConfig.ModName;

                removeImages(suikaSkinsImageElement, suikaSkinsOrdered);

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

                for (const suikaSkinsImagePath of parsedConfig.SuikaSkinsImagesPaths) {
                    const matchedFile = filesObject[suikaSkinsImagePath];
                    if (matchedFile) {
                        suikaSkinsOrdered.push(matchedFile);
                    }
                }

                for (const file of suikaSkinsOrdered) {
                    addImage(file, suikaSkinsImageElement, suikaSkinsOrdered);
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

function addImage(imageFile, element, array) {
    const item = document.createElement("img");
    item.className = "image";
    item.src = URL.createObjectURL(imageFile);
    item.onclick = () => {
        changeImage(imageFile, element, item, array);
    }
    element.append(item);
}

function changeImage(imageFile, element, item, array) {
    URL.revokeObjectURL(imageFile.src);
    element.removeChild(item);

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {
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
        changeImage(imageFile, element, item, array);
    }

    if (index === element.children.length) {
        element.appendChild(item);
    } else {
        const referenceNode = element.children[index];
        element.insertBefore(item, referenceNode);
    }
}

function removeImages(element, array) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    
    array.splice(0, array.length);
}

loadModButtonElement.addEventListener('change', (event) => {
    readFiles(event.target.files);
});