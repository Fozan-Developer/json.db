const errors = require('../events/errors');

/**
 * Delete a record from a specified model based on _id.
 *
 * @param {object} argument - Arguments for deleting a record.
 * @param {string} argument.model - Name of the model.
 * @param {string} argument._id - ID of the record to delete.
 * @returns {object} - Result of the deletion operation.
 * @throws {Error} - Throws error if model or _id are missing.
 */
module.exports = async function delete_module(argument) {
    const { model, _id } = argument;

    if (!model) {
        return errors("2.1");
    }

    if (!_id) {
        return errors("2.5");
    }

    const findModel = global.models[model];
    if (!findModel) {
        return errors("1.2");
    }

    const findField = findModel[_id];
    if (!findField) {
        return {
            res: false,
            error: "No record found for the given query"
        };
    }

    delete findModel[_id];

    return {
        res: true,
        deleted: _id
    };
};
