const generateID = require('../functions/generateID.js');

/**
 * Create - функция, позволяющая создавать новую запись в определённой модели
 * @model - имя модели
 * @fields - поля для записи
**/

module.exports = function create(argument) {
	const { model, fields } = argument;

	let { getModels } = require('../models.js');

	console.log(global.models);



};
