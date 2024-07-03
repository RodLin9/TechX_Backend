const mongoose = require('mongoose');

const medicationReminderSchema = new mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  medication_name: {
    type: String,
    required: true
  },
  time: {  // Ejemplo: '09:00'
    type: String,
    required: true
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { collection: 'medication_reminders' });


module.exports = medicationReminderSchema;
