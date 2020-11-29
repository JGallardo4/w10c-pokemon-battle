import {
    initializeDivas
} from "./modules/init.mjs"

const all_divas = initializeDivas();

import {
    setCookie,
    getCookieValue,
    createDivaCard,
    getRandomInt
} from "./modules/utils.mjs";

const game_screen = document.getElementById("game-screen");
const diva_container = document.getElementById("diva-container");

let start_button = document.getElementById("start-button");
start_button.addEventListener("click", function() {
    startNewGame();
});

function startNewGame() {
    var starter_divas = all_divas["starter_divas"];

    for (var d in starter_divas) {
        let new_card = addSelectButton(
            createDivaCard(starter_divas[d]),
            d
        );

        diva_container.appendChild(new_card);
    }
}

function addSelectButton(diva_card, id) {
    var button = document.createElement("button");
    button.classList.add("select-diva-button");
    button.innerText = "Select Diva";
    button.addEventListener("click", function() {
        setCookie("selectedDiva", id);
        startBattle();
    });
    diva_card.appendChild(button);
    return diva_card;
}

function startBattle() {
    while (diva_container.firstChild) {
        diva_container.removeChild(diva_container.lastChild);
    }

    var starter_divas = all_divas["starter_divas"];
    var enemy_divas = all_divas["enemy_divas"];

    var player_diva_id = getCookieValue("selectedDiva");
    var player_diva = starter_divas[player_diva_id]
    var player_diva_card = createDivaCard(player_diva);
    diva_container.appendChild(player_diva_card);

    var starter_divas = all_divas["enemy_divas"];
    var enemy_diva_id = getRandomInt(0, enemy_divas.length);
    var enemy_diva = enemy_divas[enemy_diva_id];
    var enemy_diva_card = createDivaCard(enemy_diva);
    diva_container.appendChild(enemy_diva_card);
}