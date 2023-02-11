const fs = require('fs');
const path = require('path');

module.exports = async function checkMainFile(argument) {
	const modelsDIR = path.join(__dirname, `../../../../../models.json`);

	if (fs.existsSync(modelsDIR)) {
		return true;
	} else {
		fs.writeFile(modelsDIR, "{}", function(err, result) {
			return console.log("Модели созданы. Перезапустите проект.");
		});
	};
};