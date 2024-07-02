const mongoose = require('mongoose');
const appointmentSchema = require('./appointments_model');

appointmentSchema.statics = {
  create: function (data) {
    const appointment = new this(data);
    return appointment.save();
  },
  findById: function (appointmentId) {
    return this.findOne({ _id: appointmentId }).exec();
  },
  findByDoctorId: function (doctorId) {
    return this.find({ doctor_id: doctorId }).exec();
  },
  findByPatientId: function (patientId) {
    return this.find({ patient_id: patientId }).exec();
  },
  findAll: function () {
    return this.find({}).exec();
  },
  updateById: function (appointmentId, updateData) {
    return this.findOneAndUpdate({ _id: appointmentId }, { $set: updateData }, { new: true }).exec();
  },
  deleteById: function (appointmentId) {
    return this.deleteOne({ _id: appointmentId }).exec();
  }
};

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
