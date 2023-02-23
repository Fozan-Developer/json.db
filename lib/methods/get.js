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

module.exports = async function get(argument) {
	const { model, id, total } = argument;

	var findModel = global.models[model];
	if(!findModel) throw new Error("Такой модели не существует");
	const fields = getFieldsArr(findModel);

	if(!total) {
		let options = {};
		for(i in argument) {
			if(i != "model") {
				options[i] = argument[i];
			};
		};

		const findField = filter(fields, options);

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
			fields: fields
		};
	};
};