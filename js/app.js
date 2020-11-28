import { enemy_divas_indie } from './modules/base-divas.mjs';
import {
    starter_divas,
    enemy_divas
} from './modules/initializations.mjs';

const game_screen = document.getElementById("game-screen");

function startNewGame() {
    showSelectionScreen();
}

function showSelectionScreen() {
    initializeStarters();
}

function initializeStarters() {
    for (var d in starter_divas) {
        game_screen.appendChild(createCard(starter_divas[d]));
    }
}

function createCard(diva) {
    var new_card = document.createElement("div");
    new_card.classList.add("diva-card");
    new_card.id = diva.name;

    var new_image = document.createElement("object");
    new_image.type = "image/svg+xml";
    new_image.data = diva.image;
    new_image.innerText = "Your browser does not support SVGs";

    new_card.appendChild(new_image);

    return new_card;
}

startNewGame();