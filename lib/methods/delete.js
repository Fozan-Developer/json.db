const errors = require('../events/errors.js');

module.exports = async function delete_module(argument) {
	const { model, _id } = argument;

	if(!model) return errors("2.1");
	if(!_id) return errors("2.5");

	var findModel = global.models[model];
	if(!findModel) return errors("1.2");

	var findField = findModel[_id];
	if(!findField) return {
		res: false,
		error: "По запросу ничего не найдено"
	};

	eval(delete findModel[_id]);

	return {
		res: true,
		deleted: _id
	};
};
