const errors = require('../events/errors');

/**
 * Find one record in a specified model based on query parameters.
 *
 * @param {object} argument - Arguments for finding one record.
 * @param {string} argument.model - Name of the model.
 * @param {object} argument.fields - Fields to filter the record.
 * @returns {object|boolean} - Found record or false if not found.
 * @throws {Error} - Throws error if model is not found.
 */
module.exports = async function findOne(argument) {
    const { model, fields } = argument;

    const findModel = global.models[model];
    if (!findModel) {
        return errors("1.2");
    }

    const findField = Object.entries(fields).reduce((acc, [key, value]) => {
        return acc.filter(entry => entry[key] === value);
    }, Object.values(findModel));

    if (findField.length === 0) {
        return false;
    }

    return findModel[findField[0]._id];
};
