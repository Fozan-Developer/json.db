const errors = require('../events/errors.js');

function getFieldsArr(findModel) {
	let res = [];

	for(i in findModel) {
		res.push({
			...findModel[i]
		});
	};

	return res;
};

const filter = (data, query) =>
  	data.filter(entry => {
    	for(const [key, value] of Object.entries(query)) {
    	  if(entry[key] !== value) return false
    	};

    	return true
	});

module.exports = async function find(argument) {
	const { model, fields, total } = argument;

	var findModel = global.models[model];
	if(!findModel) return errors("1.2");
	const fieldsTotal = getFieldsArr(findModel);

	if(!total) {
		let options = {};
		for(i in fields) {
			options[i] = fields[i];
		};

		const findField = filter(fieldsTotal, options);

		if(findField.length == 0) return res = {
			res: false,
			number: 0,
			fields: null
		};

		return {
			res: true,
			number: findField.length,
			fields: findField.length == 1 ? findField[0] : findField
		};
	};

	if(total) {
		return {
			res: true,
			fields: fieldsTotal
		};
	};
};
