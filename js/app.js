import {
    getStarterDivas,
    getNewStarterDivas,
} from "./modules/divas.mjs";

import {
    createDivaSelection,
} from "./modules/html.mjs";

const diva_container = document.getElementById("diva-container");
const game_screen = document.getElementById("game-screen");

let start_button = document.getElementById("start-button");
start_button.addEventListener("click", function() {
    startNewGame();
});

loadGame();

function loadGame() {
    createDivaSelection(getStarterDivas(), diva_container);
}

function startNewGame() {
    createDivaSelection(getNewStarterDivas(), diva_container);
}