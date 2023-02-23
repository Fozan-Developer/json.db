const models = require('./utils/models_list.js');

module.exports = function utils(util) {
	if(util != "models") throw new Error("Такой утилиты не существует");

	if(util == "models") { return models() };
};
