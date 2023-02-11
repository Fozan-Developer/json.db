const fs = require('fs');
const path = require('path');

module.exports = function models_dir() {
	return {
		main: path.join(__dirname, '../../../../../models.json'),
		info: path.join(__dirname, '../models.json')
	}
};