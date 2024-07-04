const modelsList = require('./utils/models_list');

/**
 * Function utils - executes specific utility based on utility name.
 *
 * @param {string} util - Name of the utility to execute.
 * @returns {Promise<any>} - Result of the utility execution.
 * @throws {Error} - If utility name is not recognized.
 */
module.exports = function utils(util) {
    switch (util) {
        case "models":
            return modelsList();
        default:
            throw new Error(`Utility '${util}' does not exist`);
    }
};
