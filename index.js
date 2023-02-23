/**
	Json.DB by Mr_Fozan
**/

const checkMainFile = require('./lib/functions/checkMainFile.js')();
const connect = require('./lib/methods/connect.js');
const methods_module = require('./lib/methods.js');
const utils_module = require('./lib/utils.js');
const errors = require('./lib/events/errors.js');

class json_db {
	constructor(argument) {
		const { save, models, backup } = argument;
		if(!save || typeof save != "number") return errors("1.3");
		if(!models || models.length == 0) return errors("1.4");

		(async () => {
		this.save = save;
		this.models = models;
		this.backup = backup;

		const connection = await connect({save: this.save, models: this.models, backup: this.backup});
		return true;
		})();
	};

    async methods(methodName, params = {}) {
    	if(!methodName) return errors("1.5");

    	const method = await methods_module(methodName, params);
    	return method;
    };

    async utils(methodName, params = {}) {
    	if(!methodName) return errors("1.6");
		const util = await utils_module(methodName);

    	return util;
    };
};

module.exports = json_db;
