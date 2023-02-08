module.exports = async function get(argument) {
	const { model, id } = argument;
	// console.log(global.models);

	var findModel = global.models.find(x=> x.name == model);
	if(!findModel) throw new Error("Такой модели не существует");

	var findField = findModel.fields[id];
	if(!findField) return {
		id: null,
		error: "По запросу ничего не найдено"
	};

	return findField;
};