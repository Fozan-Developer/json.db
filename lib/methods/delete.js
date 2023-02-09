module.exports = async function delete_module(argument) {
	const { model, id } = argument;

	var findModel = global.models.find(x=> x.name == model);
	if(!findModel) throw new Error("Такой модели не существует");

	var findField = findModel.fields[id];
	if(!findField) return {
		id: null,
		error: "По запросу ничего не найдено"
	};

	eval(delete findModel.fields[id]);

	return true;
};