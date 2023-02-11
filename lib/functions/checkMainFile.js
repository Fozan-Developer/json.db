const fs = require('fs');
const path = require('path');

module.exports = function checkMainFile(argument) {
	const modelsDIR = path.join(__dirname, `../../../../../models.json`);

	var text = {};

	if(fs.existsSync(modelsDIR) == false) return require('fs').writeFileSync(modelsDIR, JSON.stringify(text, null, '\t'));
};