const express = require("express");
const Doctor = require('../models/Doctor');
const Router = express.Router();
const Appointment = require('../models/Appointment')
const {mongoose} = require("mongoose")


Router.get('/api/doctors', async (req, res) => {
    // available list of doctor
    try {
      const doctors = await Doctor.find();
      res.json(doctors);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  Router.get('/api/doctors/:name', async (req, res) => {
    try {
      const doctorName = req.body.name;
  
      // Finding doctor by name
      const doctor = await Doctor.findOne({ name: doctorName });
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }
  
      res.json(doctor);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  
  
Router.post('/api/RegisterDoc', async (req, res) => {
    // Adding new doctor
    try {
      const { name, specialty, schedule, maxAppointments } = req.body;
    //   if (!name || !specialty || !schedule || !maxAppointments){
    //     res.status(401).json({message: "All the details are required"});
    //   }
      const doctor = new Doctor({
        name,
        specialty,
        schedule,
        maxAppointments
      });
      await doctor.save();
      res.status(201).json(doctor);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  module.exports = Router;