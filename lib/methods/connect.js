const models_list = require('../utils/models_list.js');
const models_dir = require('../functions/models_dir.js')();
const saveModels = require('../events/save.js');
// const backupModule = require('../events/backup.js');
const loadModels = require('../models.js');

const fs = require('fs');
const path = require('path');

const errors = require('../events/errors.js');

/**
 * Connection - является функцией, которая связывает несколько процессов.
 * Проверка директории, файлов модели
 * Добавление новых моделей
 * Отправка актуальной таблицы моделей
 * Настраивает по заданному времени сохранение
**/

module.exports = async function connect(argument) {
	const { save, models, backup } = argument;
	global.models = {};
	global.modelsList = models;

	for(i in models) {
		var name = models[i];

		if(typeof name != "string") return errors("1.1");
		const pathFile = require('../../../../../models.json');

		let fields;
		if(!pathFile[name]) {
			fields = {};
			pathFile[name] = {};
		};

		if(pathFile[name]) {
			fields = pathFile[name];
		};

		global.models[name] = fields;
	};

	const save_models = saveModels(save);
	// if(backup) { const backup_module = await backupModule(backup); };
	const modelsList = await models_list();

	return true;
};
