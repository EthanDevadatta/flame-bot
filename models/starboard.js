const mongoose = require('mongoose');

const starboardModel = mongoose.model(
    'starboard',
    new mongoose.Schema({
        Guild: String,
        starCount: Number,
        starboardChannel: String,
    })
);

module.exports = starboardModel;