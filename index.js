/**
	Json.DB by Mr_Fozan
**/

const checkMainFile = require('./lib/functions/checkMainFile.js')();
const connect = require('./lib/methods/connect.js');
const methods_module = require('./lib/methods.js');
const utils_module = require('./lib/utils.js');
// const utils_module = require('./lib/functions/models_dir.js');

class json_db {
	constructor(argument) {
		const { save, models, backup } = argument;
		if(!save || typeof save != "number") throw new TypeError("Не указано время, или значение не является числом");
		if(!models || models.length == 0) throw new Error("Не указано поле models или в нём нет ни одной модели");

		(async () => {
		this.save = save;
		this.models = models;
		this.backup = backup;

		const connection = await connect({save: this.save, models: this.models, backup: this.backup});
		return true;
		})();
	};

    async methods(methodName, params = {}) {
    	if(!methodName) throw new TypeError("Не указано название метода.");
    	
    	const method = await methods_module(methodName, params);	
    	return method;
    };

    async utils(methodName, params = {}) {
    	if(!methodName) throw new TypeError("Не указано название утилиты.");
		const util = await utils_module(methodName);

    	return util;
    };
};

module.exports = json_db;