import {
    starter_divas_base,
    enemy_divas_classic,
    enemy_divas_pop,
    enemy_divas_indie,
    enemy_divas_rap
} from "./base-divas.mjs"

import {
    getRandomInt
} from "./utils.mjs"

let starter_divas = initializeDivas(starter_divas_base, "pop");

let enemy_divas = initializeDivas(enemy_divas_classic, "classic")
    .concat(initializeDivas(enemy_divas_pop, "pop")
        .concat(initializeDivas(enemy_divas_indie, "indie")
            .concat(initializeDivas(enemy_divas_rap, "rap")))
    );

function initializeDivas(source_array, type) {
    var result = [];

    for (var d in source_array) {
        result.push({
            diva: source_array[d],
            type: type,
            attack: getRandomInt(10, 50)
        });
    };

    return result;
}

export {
    starter_divas,
    enemy_divas
};