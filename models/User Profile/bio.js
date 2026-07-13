const mongoose = require("mongoose");

const profile = new mongoose.Schema({
    User: String,
    Bio: String,
});

module.exports = mongoose.model("user-bio", profile);