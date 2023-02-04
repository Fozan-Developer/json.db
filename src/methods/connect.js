const models_list = require('../functions/models_list.js');
const fs = require('fs');
const path = require('path');

var models_dir = require('../functions/models_dir.js')();
var saveDB = require('../events/saveDB.js');

async function addModel(name) {
	let baseModels = require('../models.json');

	baseModels[name] = {
		name: name,
		file: `${name}.json`
	};

	const pathFile = await path.join(__dirname, `../models.json`);
	require('fs').writeFileSync(pathFile, JSON.stringify(baseModels, null, '\t'));
};

async function checkBaseModels(models) {
	let baseModels = require('../models.json');
	const baseModelsFile = await path.join(__dirname, `../models.json`);

	for(i in baseModels) {
		const name = baseModels[i].name;
		let findModel = models.find(x=> name == x);
		if(!findModel) { eval(delete baseModels[i] )};
	};

	console.log(baseModels);
	return require('fs').writeFileSync(baseModelsFile, JSON.stringify(baseModels, null, '\t'));
};

async function checkDir(argument) {
	await fs.stat(models_dir.main, async function(err) {
    	if (err && err.code === 'ENOENT') {
        	await fs.mkdir(models_dir.main, err => {
        	});
    	};
	});
};

async function checkModels(models) {
	await fs.access(models_dir.info, fs.F_OK, (err) => {
		  if (err) {
		    return fs.writeFile(models_dir.info, "{}", "utf-8", function(err, result) {});
		  };
		});

	for(i in models) {
		var name = models[i];
		const pathFile = await path.join(__dirname, `../../../../models/${name}.json`);

		if(!models[name]) await addModel(name);

		await fs.access(pathFile, fs.F_OK, (err) => {
		  if (err) {
		  	// console.log(err);
		    return fs.writeFile(pathFile, "{}", function(err, result) {});
		  };
		});
	};
};

module.exports = async function connect(argument) {
	const { saveTime, models } = argument;

	// var attachment = fs.readFileSync(filePath);

	// check directory models
	await checkDir(models);

	// check models
	await checkBaseModels(models);
	await checkModels(models);

	// screen models list
	setTimeout(async () => {
		await models_list();
	}, 10000);

	await saveDB(saveTime);
};