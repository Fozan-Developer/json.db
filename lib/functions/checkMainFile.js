const fs = require('fs').promises;
const path = require('path');

/**
 * Checks if the models.json file exists and creates it with an empty object if it doesn't.
 */
module.exports = async function checkMainFile() {
    const modelsFile = path.resolve(__dirname, `../../../../../models.json`);

    try {
        // Check if the file exists
        const exists = await fs.access(modelsFile, fs.constants.F_OK)
            .then(() => true)
            .catch(() => false);

        // If the file doesn't exist, create it with an empty object
        if (!exists) {
            await fs.writeFile(modelsFile, JSON.stringify({}, null, '\t'));
            console.log(`Created models.json at ${new Date().toLocaleTimeString()}`);
        } else {
            console.log(`models.json already exists at ${new Date().toLocaleTimeString()}`);
        }
    } catch (error) {
        console.error('Error checking or creating models.json:', error);
    }
};
