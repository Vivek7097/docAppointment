// models/appointment.js

const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctor: {
    type: String,
    required: true
  },
  patient: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
