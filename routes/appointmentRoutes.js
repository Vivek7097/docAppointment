const express = require("express");
const Appointment = require('../models/Appointment');
const Doctor = require("../models/Doctor");
const Router = express.Router();

Router.post('/api/appointments', async (req, res) => {
    try {
      const { name, patientName, appointmentDate } = req.body;
  
      // Find the doctor by name to get their ObjectId
      const doctor = await Doctor.findOne({ name });
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }
  
      // Check doctor's availability on the specified date
      const isAvailable = await isDoctorAvailable(doctor, appointmentDate);
      if (!isAvailable) {
        return res.status(400).json({ message: "Doctor is not available on the specified date or no available slots" });
      }
  
      // Create the appointment
      const appointment = new Appointment({
        doctor: doctor.name,
        patient: patientName,
        date: appointmentDate
      });
  
      await appointment.save();
      res.status(201).json(appointment);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Function to check doctor's availability on a given date
  async function isDoctorAvailable(doctor, appointmentDate) {
    // Check if the doctor is available on the specified day
    const currentDay = new Date(appointmentDate).toLocaleString('en-US', { weekday: 'long' });
    if (!doctor.schedule.includes(currentDay)) {
      return false; // Doctor is not available on the specified day
    }
  
    // Check if there are available slots for the specified date
    const appointmentsForDate = await Appointment.find({
      doctor: doctor._id,
      date: appointmentDate
    });
    const maxAppointmentsPerSlot = doctor.maxAppointments;
    const bookedAppointmentsCount = appointmentsForDate.length;
  
    return bookedAppointmentsCount < maxAppointmentsPerSlot;
  }
  
  

  module.exports = Router;