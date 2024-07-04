const fs = require('fs').promises;
const path = require('path');

/**
 * Load models from the filesystem and store them in global.models array.
 *
 * @returns {boolean} - Always true indicating successful execution.
 */
module.exports = async function loadModels() {
    const modelsList = global.modelsList;

    try {
        for (const id in modelsList) {
            const modelName = modelsList[id];
            const modelPath = path.resolve(__dirname, `../../../../models/${modelName}.json`);
            const model = require(modelPath);

            global.models.push({
                name: modelName,
                fields: model
            });
        }

        return true;
    } catch (error) {
        console.error("Error in loadModels:", error);
        return false;
    }
};
