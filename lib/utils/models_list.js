const fs = require('fs');
const path = require('path');

var models_dir = require('../functions/models_dir.js')();

function Bases(name, objects, size) {
	this.name = name;
	this.objects = objects;
};

async function sort_models() {
	let models = require('../models.json');

	let res = {};

	let i = 0; 
	for (id in models) {
		i++;
		var model = models[id];
		var name = model.name;

		const file = require(`../../../../../models/${model.file}`);

		let count = 0;
		for(ii in file) { count += 1 };
		res[i] = new Bases(name, count);
   	};

	return res;
};

module.exports = async function models_list(argument) {
	var sort = await sort_models();

	console.table(sort, ["name", "objects"]);
	return true;
};