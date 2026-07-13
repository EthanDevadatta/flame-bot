const mongoose = require("mongoose");

const p = new mongoose.Schema({
  guild: String,
  channel: String
});

module.exports = mongoose.model("logging", p);