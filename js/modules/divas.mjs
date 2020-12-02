import {
    getRandomInt
} from "./utils.mjs";

function getStarterDivas() {
    if (Cookies.get("starterDivas") == null) {
        let starter_divas = JSON.stringify(
            initializeDivasFromArray(starter_divas_base, "pop")
        );
        Cookies.set("starterDivas", starter_divas);
    }

    return JSON.parse(Cookies.get("starterDivas"));
}

function getNewStarterDivas() {
    Cookies.remove("starterDivas");
    return getStarterDivas();
}

function getEnemyDiva() {
    if (Cookies.get("enemyDiva") == null) {
        let enemy_diva = enemy_divas[getRandomInt(0, enemy_divas.length + 1)];
        let enemy_diva_str = JSON.stringify(enemy_diva);
        Cookies.set("enemyDiva", enemy_diva_str);
    }
    return JSON.parse(Cookies.get("enemyDiva"));
}

function getPlayerDiva() {
    return JSON.parse(Cookies.get("playerDiva"));
}

function initializeDivasFromArray(source_array, type) {
    var result = [];

    for (var d in source_array) {
        result.push({
            name: source_array[d],
            type: type,
            attack: getRandomInt(10, 51),
            health: getRandomInt(85, 101),
            image: "/media/singer.svg"
        });
    };

    return result;
}

let starter_divas_base = [
    "Dua Lipa",
    "Camila Cabello",
    "Rebecca Black"
];

let enemy_divas_classic = [
    "Mariah Carey",
    "Whitney Houston",
    "Dolly Parton",
    "Aretha Franklin",
    "Donna Summers",
    "Tina Turner",
    "Stevie Nicks",
    "Celine Dion",
    "Janet Jackson",
    "Cher"
];

let enemy_divas_pop = [
    "Lady Gaga",
    "Ariana Grande",
    "Taylor Swift",
    "Billie Eilish",
    "Nelly Furtado",
    "Kylie Minogue",
    "Katy Perry",
    "Britney Spears",
    "Madonna",
    "Miley Cyrus",
    "Adele",
    "Cristina Aguilera",
    "Gwent Stefani",
    "Jennifer Lopez",
    "Pink",
    "Beyonce"
]

let enemy_divas_rap = [
    "Nicki Minaj",
    "Doja Cat",
    "Megan D Stallion",
    "Iggy Azelia",
    "Lizzo",
    "FKA Twigs",
    "Missy Elliot",
    "Cardi B",
    "Ashnikko"
];

let enemy_divas_indie = [
    "Caroline Polachek",
    "Feist",
    "Tegan and Sarah",
    "Grimes",
    "Bjork",
    "St Vincent",
    "Lana del Rey",
    "Karen O",
    "Emily Haines",
    "Imogen Heap"
];

let enemy_divas = initializeDivasFromArray(enemy_divas_classic, "classic")
    .concat(initializeDivasFromArray(enemy_divas_pop, "pop")
        .concat(initializeDivasFromArray(enemy_divas_indie, "indie")
            .concat(initializeDivasFromArray(enemy_divas_rap, "rap")))
    );

export {
    getStarterDivas,
    getNewStarterDivas,
    getEnemyDiva,
    getPlayerDiva
}