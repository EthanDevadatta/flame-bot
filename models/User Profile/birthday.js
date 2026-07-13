const mongoose = require("mongoose");

const profile = new mongoose.Schema({
    User: String,
    Birthday: String,
});

module.exports = mongoose.model("user-birthday", profile);