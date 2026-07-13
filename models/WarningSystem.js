const mongoose = require('mongoose');

module.exports = mongoose.model(
    "warningsystem",
    new mongoose.Schema({
        userId: String,
        guildId: String,
        moderatorId: String,
        reason: String,
        timestamp: String,
    })
);