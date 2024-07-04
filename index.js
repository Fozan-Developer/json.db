const connect = require('./lib/methods/connect');
const methods = require('./lib/methods');
const utils = require('./lib/utils');
const errors = require('./lib/events/errors');

class JsonDB {
    constructor({ save, models, backup }) {
        if (!save || typeof save !== "number") {
            throw new Error("Invalid save parameter");
        }
        if (!models || models.length === 0) {
            throw new Error("Invalid models parameter");
        }

        this.saveInterval = save;
        this.models = models;
        this.backupEnabled = backup;

        this.connected = false;
        this.initialize();
    }

    async initialize() {
        try {
            await connect(this.saveInterval, this.models, this.backupEnabled);
            this.connected = true;
            console.log("JsonDB connected successfully");
        } catch (error) {
            console.error("Failed to connect JsonDB:", error);
            throw new Error("JsonDB connection error");
        }
    }

    async callMethod(methodName, params = {}) {
        if (!methodName) {
            throw new Error("Missing method name");
        }

        try {
            const result = await methods.execute(methodName, params);
            return result;
        } catch (error) {
            console.error(`Error executing method '${methodName}':`, error);
            throw new Error(`Method '${methodName}' execution error`);
        }
    }

    callUtility(utilityName, params = {}) {
        if (!utilityName) {
            throw new Error("Missing utility name");
        }

        try {
            const result = utils.execute(utilityName, params);
            return result;
        } catch (error) {
            console.error(`Error executing utility '${utilityName}':`, error);
            throw new Error(`Utility '${utilityName}' execution error`);
        }
    }
}

module.exports = JsonDB;
