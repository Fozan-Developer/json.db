const fs = require('fs');
const path = require('path');

async function save_model(argument) {
	const models = require('../models.js'); // базы данных
	const modelsDB = require('../models.json'); // список баз данных

	for(id in modelsDB) {
		var model = global.models.find(x=> x.name == modelsDB[id].name);

		const pathFile = await path.join(__dirname, `../../../../../models/${modelsDB[id].file}`);
		require('fs').writeFileSync(pathFile, JSON.stringify(model.fields, null, '\t'));
	};
};

module.exports = async function save(time) {
	setInterval(async () => {
		await save_model();
	}, time);
};