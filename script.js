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

const modDataElement = document.querySelector('.mod-data');
const createModButtonElement = document.querySelector('.load-mod-button');

createModButtonElement.addEventListener('click', function () {
    const input = document.createElement('input');
    input.type = 'file';

    input.onchange = e => {
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');

        reader.onload = readerEvent => {
            const json = readerEvent.target.result;
            console.log(json);
            const parsedGameConfig = JSON.parse(json);
            modDataElement.innerHTML = parsedGameConfig.ModName;
            console.log(parsedGameConfig);
        };
    };

    input.click();
});