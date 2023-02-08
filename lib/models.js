const modelsList = require('./models.json');

global.models = [];

function loadModels(argument) {
	for(id in modelsList) {
		var name = modelsList[id].name;
		const model = require(`../../../../models/${modelsList[id].file}`);

		global.models.push({
			name: name,
			fields: model
		});
	};

	return true;
};

function getModels(argument) {
	return global.models;
};


module.exports = { loadModels, getModels };