const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  specialty: {
    type: String,
    required: true
  },
  schedule: {
    type: [String], // Array of strings representing days of the week (e.g., ["Monday", "Wednesday"])
    required: true
  },
  maxAppointments: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Doctor', doctorSchema);
