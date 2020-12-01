import {
    initializeDivas
} from "./modules/init.mjs";

import {
    setCookie,
    getCookieValue,
    createDivaCard,
    getRandomInt
} from "./modules/utils.mjs";

let all_divas;
let gameOver = 0;
const game_screen = document.getElementById("game-screen");
const diva_container = document.getElementById("diva-container");
const battle_menu = document.getElementById("battle-menu");
const header = document.getElementById("header");

let start_button = document.getElementById("start-button");
start_button.addEventListener("click", function() {
    startNewGame();
});

startNewGame();

function startNewGame() {
    all_divas = initializeDivas();
    clearElement(diva_container);
    clearElement(battle_menu);
    header.innerText = "Choose your starter diva:";

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
    clearElement(diva_container);
    header.innerText = "Battle!";

    var starter_divas = all_divas["starter_divas"];
    var enemy_divas = all_divas["enemy_divas"];

    var player_diva_id = getCookieValue("selectedDiva");
    var player_diva = starter_divas[player_diva_id]
    var player_diva_card = createDivaCard(player_diva);
    player_diva_card.id = "player-diva";
    diva_container.appendChild(player_diva_card);

    var starter_divas = all_divas["enemy_divas"];
    var enemy_diva_id = getRandomInt(0, enemy_divas.length);
    var enemy_diva = enemy_divas[enemy_diva_id];
    var enemy_diva_card = createDivaCard(enemy_diva);
    enemy_diva_card.id = "enemy-diva";
    enemy_diva_card.classList.add("enemy-diva");
    diva_container.appendChild(enemy_diva_card);

    var attack_button = document.createElement("button");
    attack_button.classList.add("attack-button");
    attack_button.innerText = "Attack";
    attack_button.addEventListener("click", function() {
        if (gameOver == 0) {
            playerTurn(player_diva, enemy_diva);
        }
    });
    battle_menu.appendChild(attack_button);
}

function playerTurn(player_diva, enemy_diva) {
    attack(player_diva, enemy_diva);

    if (enemy_diva.health <= 0) {
        endGame(1);
    } else {
        attack(enemy_diva, player_diva);
        if (player_diva.health <= 0) {
            endGame(0);
        }
    }
}

function attack(attacker, attacked) {
    var damage = 10 + (attacker.attack / 100);

    attacked.health = Math.round(attacked.health - damage);

    updateScreen(attacker, attacked);
}

function updateScreen(player_diva, enemy_diva) {
    var player_diva_card = document.getElementById("player-diva");
    var enemy_diva_card = document.getElementById("enemy-diva");

    var player_diva_health = player_diva_card.getElementsByClassName("health-stat");
    player_diva_health[0].innerText = player_diva.health + "/100 hp";

    var enemy_diva_health = enemy_diva_card.getElementsByClassName("health-stat");
    enemy_diva_health[0].innerText = enemy_diva.health + "/100hp";
}

function endGame(isWin) {
    var message;

    message = isWin ? "Player wins" : "Player loses";

    gameOver = 1;

    console.log(message);
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.lastChild);
    }
}