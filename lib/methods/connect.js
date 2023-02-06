const models_list = require('../utils/models_list.js');
var models_dir = require('../functions/models_dir.js')();
var saveModels = require('../events/save.js');
const { loadModels } = require('../models.js');

const fs = require('fs');
const path = require('path');

/**
 * Добавление модели в models.json
**/

function addModel(name) {
	let baseModels = require('../models.json');

	baseModels[name] = {
		name: String(name),
		file: `${name}.json`
	};

	const pathFile = path.join(__dirname, `../models.json`);
	return require('fs').writeFileSync(pathFile, JSON.stringify(baseModels, null, '\t'));
};

/** 
 * Models.json нужен для ведения списка моделей
 * Используется для сортировки, таблицы моделей,
 * Все модели, вписанные при подключении в поле models автоматически добавляются в Models.json.
 * Те модели, которые удалили из поля models - удаляются из Models.json
**/

function checkBaseModels(models) {
	let baseModels = require('../models.json');
	const baseModelsFile = path.join(__dirname, `../models.json`);

	for(i in baseModels) {
		const name = baseModels[i].name;
		let findModel = models.find(x=> name == x);
		if(!findModel) { eval(delete baseModels[i] )};
	};

	return require('fs').writeFileSync(baseModelsFile, JSON.stringify(baseModels, null, '\t'));
};

/**
 * Проверка директории models в корневой папке проекта
**/

function checkDir(argument) {
	fs.stat(models_dir.main, function(err) {
    	if (err && err.code === 'ENOENT') {
        	fs.mkdir(models_dir.main, err => {
        	});
    	};
	});
};

/**
 * Проверка наличия файла модели в корневой папке проекта models
 * Если такого файла нет - автоматически создаст со значением {}
 * Если такой файл есть - проигнорирует
**/

function checkModels(models) {
	fs.access(models_dir.info, fs.F_OK, (err) => {
		  if (err) {
		    return fs.writeFile(models_dir.info, "{}", "utf-8", function(err, result) {});
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
};

/** 
 * Connection - является функцией, которая связывает несколько процессов.
 * Проверка директории, файлов модели
 * Добавление новых моделей
 * Отправка актуальной таблицы моделей
 * Настраивает по заданному времени сохранение
**/

module.exports = async function connect(argument) {
	const { save, models } = argument;

	const prom = new Promise((resolve, reject) => {
		setTimeout(() => {
			checkDir(models);

			// check models
			checkBaseModels(models);
			checkModels(models);

			resolve();
		});
	}).then(() => {
		setTimeout(() => {
			loadModels();
			saveModels(save);
			models_list();
		}, 2000);
	});

	return true;
};