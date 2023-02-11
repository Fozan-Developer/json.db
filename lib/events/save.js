const fs = require('fs');
const path = require('path');

async function save_model(argument) {
	const models = global.models;

	const pathFile = await path.join(__dirname, `../../../../../models.json`);
	require('fs').writeFileSync(pathFile, JSON.stringify(models, null, '\t'));
};

module.exports = function save(time) {
	setInterval(async () => {
		await save_model();
	}, time);
};