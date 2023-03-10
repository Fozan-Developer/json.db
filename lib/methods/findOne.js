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

module.exports = async function findOne(argument) {
	const { model, fields } = argument;

	var findModel = global.models[model];
	if(!findModel) return errors("1.2");
	const fieldsTotal = getFieldsArr(findModel);

	let options = {};
	for(i in fields) {
		options[i] = fields[i];
	};

	const findField = filter(fieldsTotal, options);

	if(findField.length == 0) return false;
	if(findField.length > 0) return findModel[findField[0]._id];
};