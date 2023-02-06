const create = require('./methods/create.js');

function methods(argument) {
	return [
		{
			name: "create",
			funct: create(argument)
		}
	];
};

module.exports = async function method(method, params) {
	var findMethod = methods(params).find(x=> x.name == method);
	if(!findMethod) throw new Error("Метода " + method + " не существует");

	return findMethod.funct;
};