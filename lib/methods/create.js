const generateID = require('../functions/generateID');
const errors = require('../events/errors');

/**
 * Create a new record in a specified model.
 *
 * @param {object} argument - Arguments for creating a record.
 * @param {string} argument.model - Name of the model.
 * @param {object} argument.fields - Fields to be added to the record.
 * @returns {object} - Created record.
 * @throws {Error|TypeError} - Throws error if model or fields are missing or invalid.
 */
module.exports = async function create(argument) {
    const { model, fields } = argument;

    if (!model) {
        return errors("2.1");
    }

    if (!fields) {
        return errors("2.2");
    }

    if (typeof fields !== "object" || Array.isArray(fields)) {
        return errors("2.3");
    }

    if (fields._id) {
        return errors("2.4");
    }

    const findModel = global.models[model];
    if (!findModel) {
        return errors("1.2");
    }

    const field_id = generateID();

    const createField = {
        _id: field_id,
        ...fields
    };

    findModel[field_id] = createField;

    return createField;
};
