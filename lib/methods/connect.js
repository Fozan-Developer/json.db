const models_list = require('../utils/models_list.js');
const models_dir = require('../functions/models_dir.js')();
const saveModels = require('../events/save.js');
// const backupModule = require('../events/backup.js');
const loadModels = require('../models.js');

const fs = require('fs');
const path = require('path');

/**
 * Добавление модели в models.json
**/

async function addModel(name) {
	let baseModels = require('../models.json');

	baseModels[name] = {
		name: String(name),
		file: `${name}.json`
	};

	const pathFile = path.join(__dirname, `../models.json`);
	require('fs').writeFileSync(pathFile, JSON.stringify(baseModels, null, '\t'));

	return true;
};

/**
 * Models.json нужен для ведения списка моделей
 * Используется для сортировки, таблицы моделей,
 * Все модели, вписанные при подключении в поле models автоматически добавляются в Models.json.
 * Те модели, которые удалили из поля models - удаляются из Models.json
**/

async function checkBaseModels(models) {
	let baseModels = require('../models.json');
	const baseModelsFile = path.join(__dirname, `../models.json`);

	for(i in baseModels) {
		const name = baseModels[i].name;
		let findModel = models.find(x=> name == x);
		if(!findModel) { eval(delete baseModels[i] )};
	};

	require('fs').writeFileSync(baseModelsFile, JSON.stringify(baseModels, null, '\t'));
	return true;
};

/**
 * Проверка директории models в корневой папке проекта
**/

async function checkDir(argument) {
	fs.stat(models_dir.main, function(err) {
    	if (err && err.code === 'ENOENT') {
        	fs.mkdir(models_dir.main, err => {
        	});
    	};
	});

	return true;
};

/**
 * Проверка наличия файла модели в корневой папке проекта models
 * Если такого файла нет - автоматически создаст со значением {}
 * Если такой файл есть - проигнорирует
**/

async function checkModels(models) {
	fs.stat(models_dir.main, function(err) {
    	if (err && err.code === 'ENOENT') {
        	fs.mkdir(models_dir.main, err => {
        	});
    	};
	});

	for(i in models) {
		var name = models[i];
		if(typeof name != "string") throw new TypeError('The model name must be "string" only');
		const pathFile = path.join(__dirname, `../../../../../models/${name}.json`);

		if(!models[name]) addModel(name);

		fs.access(pathFile, fs.F_OK, (err) => {
		  if (err) {
		    return fs.writeFile(pathFile, "{}", function(err, result) {});
		  };
		});
	};

	return true;
};

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

		if(typeof name != "string") throw new TypeError('The model name must be "string" only');
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
