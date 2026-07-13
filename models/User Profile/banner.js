const mongoose = require("mongoose");

const profile = new mongoose.Schema({
    User: String,
    Banner: String,
});

module.exports = mongoose.model("user-banner", profile);