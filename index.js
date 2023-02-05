/**
	Json.DB by Mr_Fozan
**/

const methods = require('./lib/methods.js');
const utils = require('./lib/utils.js');
const connect = require('./lib/methods/connect.js');

module.exports = {
	connect,
	methods,
	utils
};