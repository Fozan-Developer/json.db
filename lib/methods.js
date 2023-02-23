const create = require('./methods/create.js');
const get = require('./methods/get.js');
const delete_module = require('./methods/delete.js');

module.exports = async function methods(method, params) {
	if(method != "create" && method != "get" && method != "delete") throw new Error("Метода " + method + " не существует");

	if(method == "create") {
		const func = await create(params);

		return func;
	};

	if(method == "get") {
		const func = await get(params);
		return func;
	};

	if(method == "delete") {
		const func = await delete_module(params);
		return func;
	};
};