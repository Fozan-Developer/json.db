const models_list = require('../functions/models_list.js');
const fs = require('fs');
const path = require('path');

var models_dir = require('../functions/models_dir.js')();

async function checkDir(argument) {
	fs.stat(models_dir.main, function(err) {
    	if (err && err.code === 'ENOENT') {
        	fs.mkdir(models_dir.main, err => {
        	});
    	};
	});
};

async function checkModels(models) {
	fs.access(models_dir.info, fs.F_OK, (err) => {
		  if (err) {
		    return fs.writeFile(models_dir.info, "{}", "utf-8", function(err, result) {});
		  };
		});

	for(i in models) {
		var name = models[i];
		console.log(name);
		var pathFile = path.join(__dirname, `../../../../models/${name}.json`);

		await fs.access(pathFile, fs.F_OK, (err) => {
		  if (err) {
		    return fs.writeFile(pathFile, "{}", "utf-8", function(err, result) {});
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
	await checkModels(models);

	// screen models list
	setTimeout(async () => {
		await models_list();
	}, 1000);
};