import {
    getStarterDivas,
    getNewStarterDivas,
    getEnemyDiva,
    getPlayerDiva
} from "./modules/divas.mjs";

import {
    clearElement,
    createDivaCard
} from "./modules/html.mjs";

import {
    getRandomInt
} from "./modules/utils.mjs";

let start_button = document.getElementById("start-button");
start_button.addEventListener("click", function() {
    document.location.href = "/index.html";
});

const diva_container = document.getElementById("diva-container");
const header = document.getElementById("header");
const battle_menu = document.getElementById("battle-menu");

let gameOver = 0;

startBattle();

function startBattle() {
    clearElement(diva_container);
    header.innerText = "Battle!";

    var player_diva = getPlayerDiva();
    var player_diva_card = createDivaCard(player_diva);
    player_diva_card.id = "player-diva";
    diva_container.appendChild(player_diva_card);

    var enemy_diva = getEnemyDiva();
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

    updateScreen(player_diva, enemy_diva);

    saveGame(player_diva, enemy_diva);
}

function saveGame(player_diva, enemy_diva) {
    let player_diva_str = JSON.stringify(player_diva);
    let enemy_diva_str = JSON.stringify(enemy_diva);
    Cookies.set("playerDiva", player_diva_str);
    Cookies.set("enemyDiva", enemy_diva_str);
}

function attack(attacker, attacked) {
    var damage = 10 + (attacker.attack / 100);

    attacked.health = Math.round(attacked.health - damage);
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