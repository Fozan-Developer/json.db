const generateID = require('../functions/generateID.js');
const errors = require('../events/errors.js');
/**
 * Create - функция, позволяющая создавать новую запись в определённой модели
 * @model - имя модели
 * @fields - поля для записи
**/

module.exports = async function create(argument) {
	const { model, fields } = argument;
	if(!model) return errors("2.1");
	if(!fields) return errors("2.2");
	if(typeof fields != "object" || Array.isArray(fields) == true) return errors("2.3");
	for(i in fields) { if(i == "_id") return errors("2.4"); };

	var findModel = global.models[model];
	if(!findModel) errors("1.2");

	var field_id = generateID();

	const create_field = findModel[field_id] = {
		_id: field_id,
		...fields
	};

	return create_field;
};
