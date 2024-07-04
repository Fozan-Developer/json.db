const fs = require('fs');
const path = require('path');
const modelsList = require('../utils/models_list');
const saveModels = require('../events/save');
// const backupModule = require('../events/backup');
const errors = require('../events/errors');

/**
 * Function connect - establishes connection and initializes necessary processes.
 * Checks model directory and files,
 * adds new models,
 * sends current model table,
 * sets up save interval.
 *
 * @param {object} argument - Connection configuration arguments.
 * @param {number} argument.save - Save time interval.
 * @param {array} argument.models - List of models.
 * @param {boolean} argument.backup - Backup flag.
 * @returns {boolean} - Successful connection establishment.
 */
module.exports = async function connect(argument) {
    const { save, models, backup } = argument;

    global.models = {};
    global.modelsList = models;

    try {
        // Check each model
        for (let i = 0; i < models.length; i++) {
            const modelName = models[i];

            if (typeof modelName !== "string") {
                throw new Error("Model name must be a string");
            }

            const modelsFile = require(path.join(__dirname, '../../../../../models.json'));
            let modelFields;

            if (!modelsFile[modelName]) {
                modelFields = {};
                modelsFile[modelName] = {};
            } else {
                modelFields = modelsFile[modelName];
            }

            global.models[modelName] = modelFields;
        }

        // Save models
        saveModels(save);

        // Load models list
        await modelsList();

        return true;
    } catch (error) {
        console.error("Error connecting to database:", error);
        throw new Error("Database connection error");
    }
};
