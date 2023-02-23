module.exports = async function delete_module(argument) {
	const { model, _id } = argument;

	if(!model) throw new Error("Вы не указали поле model");
	if(!_id) throw new Error("Вы не указали поле _id");

	var findModel = global.models[model];
	if(!findModel) throw new Error("Такой модели не существует");

	var findField = findModel[_id];
	if(!findField) return {
		res: false,
		error: "По запросу ничего не найдено"
	};

	eval(delete findModel[_id]);

	return {
		res: true,
		deleted: _id
	};
};