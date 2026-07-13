const mongoose = require("mongoose");

const p = new mongoose.Schema({
    User: String,
    key: String
});

module.exports = mongoose.model("premium", p);