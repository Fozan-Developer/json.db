/**
	Json.DB by Mr_Fozan
**/

const methods = require('./lib/methods.js');
const utils = require('./lib/utils.js');
const connect = require('./lib/methods/connect.js');

class json_db {
	constructor(argument) {
		const { save, models } = argument;
		if(!save || typeof save != "number") throw new TypeError("Не указано время, или значение не является числом");
		if(!models || models.length == 0) throw new Error("Не указано поле models или в нём нет ни одной модели");
		// constructor({save: save, models: models});

		this.save = save;
		this.models = models;
		this.active = false;

		connect({save: this.save, models: this.models}).then(x=> this.active = true);
	};

    async methods(methodName, params = {}) {
    	setTimeout(async () => {
    		await methods(methodName, params);
    	}, this.active == true ? 0 : 3000);
    };


}

module.exports = json_db;