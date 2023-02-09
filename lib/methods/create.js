const generateID = require('../functions/generateID.js');

/**
 * Create - функция, позволяющая создавать новую запись в определённой модели
 * @model - имя модели
 * @fields - поля для записи
**/

module.exports = async function create(argument) {
	const { model, fields } = argument;
	if(!model) throw new Error("Вы не указали поле model");
	if(!fields) throw new Error("Вы не указали поле fields");
	if(typeof fields != "object" || Array.isArray(fields) == true) throw new Error("Поле fields должно быть объектом");
	
	var findModel = global.models.find(x=> x.name == model);
	if(!findModel) throw new Error("Такой модели не существует");

	var field_id = generateID();

	const create_field = findModel.fields[field_id] = {
		id: field_id,
		...fields
	};

	return create_field;
};
