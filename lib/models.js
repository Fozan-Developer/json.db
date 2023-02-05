const modelsList = require('./models.json');

global.models = [];

async function loadModels(argument) {
	for(id in modelsList) {
		var name = modelsList[id].name;
		const model = require(`../../../../models/${modelsList[id].file}`);

		global.models.push({
			name: name,
			fields: model
		});
	};
};

function getModels(argument) {
	return global.models;
};


module.exports = { loadModels, getModels };