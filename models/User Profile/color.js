const mongoose = require("mongoose");

const profile = new mongoose.Schema({
    User: String,
    Color: String,
});

module.exports = mongoose.model("user-color", profile);