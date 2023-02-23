function getFieldsArr(findModel) {
	let res = [];

	for(i in findModel) {
		res.push({
			...findModel[i]
		});
	};

	return res;
};

module.exports = async function get(argument) {
	const { model, id, total } = argument;

	var findModel = global.models[model];
	if(!findModel) throw new Error("Такой модели не существует");
	const fields = getFieldsArr(findModel);

	if(!total) {
		let options = [];
		for(i in argument) {
			if(i != "model") {
				options[i] = argument[i];
			};
		};

		console.log(options);		

		var findField = fields.filter(item => {
			const itemOpt = item;
			return options.every(t => itemOpt.includes(t));
		});

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