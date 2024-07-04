const errors = {
    "1.1": {
        text: "Model name must be a string",
        type: "TypeError"
    },
    "1.2": {
        text: "Model does not exist",
        type: "Error"
    },
    "1.3": {
        text: "Save time is not specified or is not a number",
        type: "Error"
    },
    "1.4": {
        text: "Models field is not specified or contains no models",
        type: "Error"
    },
    "1.5": {
        text: "Method name is not specified",
        type: "Error"
    },
    "1.6": {
        text: "Utility name is not specified",
        type: "Error"
    },
    "2.1": {
        text: "Model field is not specified",
        type: "Error"
    },
    "2.2": {
        text: "Fields field is not specified",
        type: "Error"
    },
    "2.3": {
        text: "Fields field must be an object",
        type: "TypeError"
    },
    "2.4": {
        text: "Cannot specify _id field in fields",
        type: "Error"
    },
    "2.5": {
        text: "You did not specify the _id field",
        type: "Error"
    }
};

/**
 * Function error - throws an error based on the error number.
 *
 * @param {string} number - Error number to identify the error.
 * @throws {Error|TypeError} - Throws error based on the type specified in errors.
 */
module.exports = function error(number) {
    const errorInfo = errors[number];

    if (!errorInfo) {
        throw new Error(`Unknown error number: ${number}`);
    }

    if (errorInfo.type === "Error") {
        throw new Error(errorInfo.text);
    }

    if (errorInfo.type === "TypeError") {
        throw new TypeError(errorInfo.text);
    }
};
