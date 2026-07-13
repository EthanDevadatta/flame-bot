const mongoose = require('mongoose');

let Schema = new mongoose.Schema({
  Guild: String,
  Category: String,
  PanelC: String,
  StaffR: String,
  TranscriptC : String,
  PanelN: String
})

module.exports = mongoose.model('ticket', Schema)