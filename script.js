const createModButton = document.querySelector('.load-mod-button');

createModButton.addEventListener('click', function () {
    const input = document.createElement('input');
    input.type = 'file';

    input.onchange = e => {
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.readAsText(file, 'UTF-8');

        reader.onload = readerEvent => {
            const json = readerEvent.target.result;
            const gameConfig = JSON.parse(json);
            console.log(gameConfig);
        }
    }

    input.click();
});


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

const audioData = {
    Path: "",
    Volume: 0
}