const create = require('./methods/create.js');
const get = require('./methods/get.js');

module.exports = async function methods(method, params) {
	if(method != "create" && method != "get") throw new Error("Метода " + method + " не существует");

	if(method == "create") {
		const func = await create(params);

		return func
	};

	if(method == "get") {
		const func = await get(params);
		return func;
	};
};