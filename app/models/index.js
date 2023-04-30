const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

db.user = require("./user.model");
db.history = require("./history.model");
db.watchlist = require("./watchlist.model");
db.jobs = require("./jobs.model");
db.dropdown = require("./dropdown.model");

module.exports = db;
