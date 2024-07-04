const errors = require('../events/errors');

function getFieldsArr(findModel) {
    return Object.values(findModel);
}

const filter = (data, query) =>
    data.filter(entry =>
        Object.entries(query).every(([key, value]) => entry[key] === value)
    );

/**
 * Find records in a specified model based on query parameters.
 *
 * @param {object} argument - Arguments for finding records.
 * @param {string} argument.model - Name of the model.
 * @param {object} argument.fields - Fields to filter the records.
 * @param {boolean} argument.total - Flag to indicate if total records should be returned.
 * @returns {object} - Found records or count based on 'total' flag.
 * @throws {Error} - Throws error if model is not found.
 */
module.exports = async function find(argument) {
    const { model, fields, total } = argument;

    const findModel = global.models[model];
    if (!findModel) {
        return errors("1.2");
    }

    const fieldsTotal = getFieldsArr(findModel);

    if (!total) {
        const findField = filter(fieldsTotal, fields);

        return {
            res: true,
            number: findField.length,
            fields: findField.length === 1 ? findField[0] : findField
        };
    }

    return {
        res: true,
        fields: fieldsTotal
    };
};
