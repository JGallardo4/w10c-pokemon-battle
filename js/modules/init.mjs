import {
    starter_divas_base,
    enemy_divas_classic,
    enemy_divas_pop,
    enemy_divas_indie,
    enemy_divas_rap
} from "./base-divas.mjs"
import { getCookieValue } from "./utils.mjs";
import { setCookie } from "./utils.mjs";

import {
    getRandomInt
} from "./utils.mjs"

function initializeDivas() {
    let starter_divas = initializeDivasFromArray(starter_divas_base, "pop");

    let enemy_divas = initializeDivasFromArray(enemy_divas_classic, "classic")
        .concat(initializeDivasFromArray(enemy_divas_pop, "pop")
            .concat(initializeDivasFromArray(enemy_divas_indie, "indie")
                .concat(initializeDivasFromArray(enemy_divas_rap, "rap")))
        );

    return {
        starter_divas: starter_divas,
        enemy_divas: enemy_divas
    };
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

export { initializeDivas };