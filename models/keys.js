const mongoose = require('mongoose');

module.exports = mongoose.model(
    'keys',
    new mongoose.Schema({
        client: String,
        keys: Array
    }));