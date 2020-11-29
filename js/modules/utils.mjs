function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    //The maximum is exclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min) + min);
}

function setCookie(name, value) {
    document.cookie =
        name +
        "=" +
        escape(value) +
        "; samesite=strict" +
        "; path=/;";
}

function getCookieValue(name) {
    let result = document.cookie.match("(^|[^;]+)\\s*" + name + "\\s*=\\s*([^;]+)");
    return result ? result.pop() : "";
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

function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', '/data/data.json', true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}


export {
    getRandomInt,
    setCookie,
    getCookieValue,
    createDivaCard,
    loadJSON
};