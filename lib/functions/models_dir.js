const path = require('path');

/**
 * Returns paths to different locations of the models.json file.
 * @returns {Object} Object with path properties.
 */
module.exports = function models_dir() {
    const mainPath = path.resolve(__dirname, '../../../../../models.json');
    const infoPath = path.resolve(__dirname, '../models.json');

    return {
        main: mainPath,
        info: infoPath
    };
};
