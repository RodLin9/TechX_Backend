const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  medical_info: {
    CODDX: {
      type: String,
      required: true
    },
    DX: {
      type: String,
      required: true
    },
    SEXO: {
      type: String,
      required: true
    },
    Edad: {
      type: Number,
      required: true
    },
    AÑO: {
      type: Number,
      required: true
    },
    MES: {
      type: Number,
      required: true
    },
    CLASIFICACION: {
      type: String,
      required: true
    },
    MUNICIPIO: {
      type: String,
      required: true
    }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = patientSchema;
