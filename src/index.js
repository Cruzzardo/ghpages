import * as deepar from "deepar";
import Carousel from "./carousel.js";

console.log("Deepar version: " + deepar.version);

let deepAR = null;

const effectList = [
    "effects/cocodrilo.deepar",
    "effects/python.deepar",
    "effects/ariat.deepar",
    "effects/avestruz.deepar",
    "effects/viking_helmet.deepar",
    "effects/cocodrilo_recortada.deepar",
    "effects/python_recortada.deepar",
    "effects/ariat_recortada.deepar",
    "effects/avestruz_recortada.deepar",
    "effects/viking_helmet.deepar",
];

let currentEffectListIndex = 0;
let currentEffectIndex = 0; 
window.effect = effectList[currentEffectListIndex];

document.addEventListener('DOMContentLoaded', async function () {
    const previewElement = document.getElementById("ar-screen");
    const loadingProgressBar = document.getElementById("loading-progress-bar");
    loadingProgressBar.style.width = "100%";

    try {
        deepAR = await deepar.initialize({
            licenseKey: "9f07a1d41991878d11104d976516fbed6007a4a2c54782b392f34a94834223d48f2efcf41edd4ff4",
            previewElement,
            effect: effectList[currentEffectListIndex],
            rootPath: "./deepar-resources",
            additionalOptions: {
                cameraConfig: {
                    facingMode: 'environment'
                },
            },
        });
    } catch (error) {
        console.error(error);
        document.getElementById("loading-screen").style.display = "none";
        document.getElementById("permission-denied-screen").style.display = "block";
        return;
    }

    document.getElementById("loading-screen").style.display = "none";
    document.getElementById("ar-screen").style.display = "block";

    const glassesCarousel = new Carousel("carousel");
    glassesCarousel.onChange = async (value) => {
        currentEffectIndex = value; 
        const adjustedValue = currentEffectListIndex * 5 + value; 
        await changeEffect(adjustedValue);
    };
});

async function changeEffect(effectIndex) {
    const loadingSpinner = document.getElementById("loading-spinner");
    const newEffect = effectList[effectIndex % effectList.length];

    if (window.effect !== newEffect) {
        loadingSpinner.style.display = "block";
        await deepAR.switchEffect(newEffect);
        window.effect = newEffect;
    }
    loadingSpinner.style.display = "none";
}

let isButtonOn = false;

// boton con boolean
function toggleButton() {
    isButtonOn = !isButtonOn; 

    if (isButtonOn) {
        document.getElementById("toggle-button").style.backgroundImage = "url('./images/botas.png')";
        currentEffectListIndex = 1; 
    } else {
        document.getElementById("toggle-button").style.backgroundImage = "url('./images/bota_recortada_centrada.png')";
        currentEffectListIndex = 0; 
    }

    const newEffectIndex = (currentEffectListIndex * 5) + currentEffectIndex;

    changeEffect(newEffectIndex);
}

window.toggleButton = toggleButton;

