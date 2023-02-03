const fs = require('fs');
const path = require('path');

var models_dir = require('./models_dir.js')();

function Bases(name, objects) {
	this.name = name;
	this.objects = objects;
};

async function sort_models() {
	const models = require('../models.json');

	let res = {};

	fs.readdir(models_dir.main, function(err, items) {
    	// console.log(items);
	});

	let i = 0; 
	for (id in models) {
		i++;
		var name = models[id].name;

		const pathFile = await path.join(__dirname, `../../../../models/${name}.json`);
		await fs.access(pathFile, fs.F_OK, (err) => {
		  	if (!err) {
		  		const file = require(`../../../../models/${name}.json`);
		  		let objectsCount = 0;
		  		for(i in file) { objectsCount += 1 };

		 		res[i] = new Bases(name, objectsCount);
		  	};
		});

   	};

	return res;
};

module.exports = async function models_list(argument) {
	var sort = await sort_models();

	return console.table(sort, ["name", "objects"]);
};