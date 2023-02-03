const fs = require('fs');
const path = require('path');

var models_dir = require('./models_dir.js')();

function model(argument) {
	const { name, objects } = argument;

	this.name = name;
	this.objects = objects;
};

async function sort_models() {
	fs.readdir(models_dir.main, function(err, items) {
    	console.log(items);
 
    	for (var i=0; i<items.length; i++) {
        	console.log(items[i]);
    	}
	});
};

module.exports = async function models_list(argument) {
	var sort = sort_models();

	// return console.table([users]);
};