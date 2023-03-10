const create = require('./methods/create.js');
const find = require('./methods/find.js');
const findOne = require('./methods/findOne.js');
const delete_module = require('./methods/delete.js');

module.exports = async function methods(method, params) {
	if(method != "create" && method != "find" && method != "findOne" && method != "delete") throw new Error("Метода " + method + " не существует");

	if(method == "create") {
		const func = await create(params);

		return func;
	};

	if(method == "find") {
		const func = await find(params);
		return func;
	};

	if(method == "findOne") {
		const func = await findOne(params);
		return func;
	};

	if(method == "delete") {
		const func = await delete_module(params);
		return func;
	};
};