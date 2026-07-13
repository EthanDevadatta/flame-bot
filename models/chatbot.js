const mongoose = require("mongoose");

const reqString = {
    type: String,
    required: true
}

const chatbot = new mongoose.Schema({
    guild: reqString,
    channel: reqString
});

module.exports = mongoose.model("chatbot", chatbot);