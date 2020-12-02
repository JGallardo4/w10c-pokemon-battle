import {
    getStarterDivas,
    getNewStarterDivas,
    getEnemyDiva
} from "./divas.mjs";

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.lastChild);
    }
}

function createDivaSelection(starter_divas, diva_container) {
    clearElement(diva_container);

    for (var d in starter_divas) {
        let new_card = addSelectButton(
            createDivaCard(starter_divas[d]),
            d
        );

        diva_container.appendChild(new_card);
    }

    function addSelectButton(diva_card, id) {
        var button = document.createElement("button");
        button.classList.add("select-diva-button");
        button.innerText = "Select Diva";
        button.addEventListener("click", function() {
            let player_diva = JSON.stringify(getStarterDivas()[id]);
            Cookies.set("playerDiva", player_diva);
            Cookies.remove("enemyDiva");
            document.location.href = "pages/battle.html";
        });
        diva_card.appendChild(button);
        return diva_card;
    }
}

function createDivaCard(diva) {
    var new_card = document.createElement("div");
    new_card.classList.add("diva-card");
    new_card.id = diva.name;

    var name = document.createElement("h2");
    name.innerText = diva.name;
    name.classList = "diva-name"
    new_card.appendChild(name);

    var image_container = document.createElement("div");
    image_container.classList.add("diva-image-container");
    var new_image = document.createElement("object");
    new_image.type = "image/svg+xml";
    new_image.data = diva.image;
    new_image.classList.add("diva-image");
    new_image.innerText = "Your browser does not support SVGs";
    image_container.appendChild(new_image);
    new_card.appendChild(image_container);

    var stats = document.createElement("div");
    stats.classList.add("diva-stats");
    var attack = document.createElement("p");
    attack.classList.add("attack-stat");
    attack.innerText = "Attack: " + diva.attack;
    stats.appendChild(attack);
    var health = document.createElement("p");
    health.classList.add("health-stat");
    health.innerText = diva.health + "/100hp"
    stats.appendChild(health);
    new_card.appendChild(stats);

    return new_card;
}

export {
    clearElement,
    createDivaSelection,
    createDivaCard
};