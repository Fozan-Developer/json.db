global.models = [];

module.exports = async function loadModels(argument) {
	const modelsList = global.modelsList;

	for(id in modelsList) {
		var name = modelsList[id];
		const model = require(`../../../../models/${modelsList[id]}.json`);

		global.models.push({
			name: name,
			fields: model
		});
	};

	return true;
};