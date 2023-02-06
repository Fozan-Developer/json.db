const fs = require('fs');
const path = require('path');

/**
 * Проверка директории models в корневой папке проекта
**/

const models_dir = require('./models_dir.js');

module.exports = function checkDir(argument) {
	var filePath = path.join(__dirname, '../../../../../models/');

	fs.stat(filePath, function(err) {
    	if (err && err.code === 'ENOENT') {
        	fs.mkdir(filePath, err => {
        	});
    	};
	});
};