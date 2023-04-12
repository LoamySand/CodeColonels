const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.registration_request = require("./registration_request.model");

db.ROLES = ["provider", "admin", "root"];

module.exports = db;