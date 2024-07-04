const fs = require('fs').promises;
const path = require('path');

const models_dir = require('../functions/models_dir')();

function Bases(name, objects) {
    this.name = name;
    this.objects = objects;
}

async function sort_models() {
    const models = global.modelsList;
    const modelsFile = require(`../../../../../models.json`);

    const res = {};

    let i = 0;
    for (const id in models) {
        i++;
        const model = models[id];

        const file = modelsFile[model];

        let count = 0;
        for (const ii in file) {
            count += 1;
        }
        res[i] = new Bases(model, count);
    }

    return res;
}

/**
 * Retrieve and sort models based on their objects count.
 *
 * @returns {boolean} - Always true indicating successful execution.
 */
module.exports = async function models_list() {
    try {
        const sortedModels = await sort_models();

        console.table(sortedModels, ["name", "objects"]);
        return true;
    } catch (error) {
        console.error("Error in models_list:", error);
        return false;
    }
};
