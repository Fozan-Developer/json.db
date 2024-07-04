const create = require('./methods/create');
const find = require('./methods/find');
const findOne = require('./methods/findOne');
const deleteModule = require('./methods/delete');

/**
 * Function methods - executes specific methods based on method name.
 *
 * @param {string} method - Name of the method to execute.
 * @param {object} params - Parameters for the method execution.
 * @returns {Promise<any>} - Result of the method execution.
 * @throws {Error} - If method name is not recognized.
 */
module.exports = async function methods(method, params) {
    switch (method) {
        case "create":
            return await create(params);
        case "find":
            return await find(params);
        case "findOne":
            return await findOne(params);
        case "delete":
            return await deleteModule(params);
        default:
            throw new Error(`Method '${method}' does not exist`);
    }
};
