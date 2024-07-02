const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor', required: true
  },
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient', required: true
  },
  specialty: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  timeSlot: {  // Ejemplo: '09:00-09:30'
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { collection: 'appointments' });

module.exports = appointmentSchema;
