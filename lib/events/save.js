const fs = require('fs').promises;
const path = require('path');

async function save_model() {
    const models = global.models;
    const pathFile = path.resolve(__dirname, `../../../../../models.json`);
    
    try {
        await fs.writeFile(pathFile, JSON.stringify(models, null, '\t'));
        console.log(`Models saved successfully at ${new Date().toLocaleTimeString()}`);
    } catch (error) {
        console.error('Error saving models:', error);
    }
}

module.exports = function save(time) {
    setInterval(async () => {
        await save_model();
    }, time);
};
