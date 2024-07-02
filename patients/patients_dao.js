const mongoose = require('mongoose');
const patientSchema = require('./patients_model'); // Importar el esquema

// Definir métodos estáticos en el modelo de pacientes
patientSchema.statics = {
  create: function (data) {
    const patient = new this(data);
    return patient.save();
  },
  findByUserId: function (userId) {
    return this.findOne({ user_id: userId }).exec();
  },
  findAll: function () {
    return this.find({}).exec();
  },
  updateByUserId: function (userId, updateData) {
    return this.findOneAndUpdate({ user_id: userId }, { $set: updateData }, { new: true }).exec();
  },
  deleteByUserId: function (userId) {
    return this.deleteOne({ user_id: userId }).exec();
  }
};

// Crear el modelo de pacientes a partir del esquema de pacientes
const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
