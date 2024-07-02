const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  specialty: {
    type: String,
    required: true
  },
  availability: [{
    date: {
      type: Date,
      required: true
    },
    timeSlots: [{ // Ejemplo: ['09:00-09:30', '10:00-10:30']
      type: String,
      required: true
    }]
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
},
{ collection: 'doctors' });

module.exports = doctorSchema;
