const mongoose = require('mongoose');
const medicationReminderSchema = require('./medication_reminders_model');

medicationReminderSchema.statics = {
  create: function (data) {
    const reminder = new this(data);
    return reminder.save();
  },
  findById: function (reminderId) {
    return this.findOne({ _id: reminderId }).exec();
  },
  findByPatientId: function (patientId) {
    return this.find({ patient_id: patientId }).exec();
  },
  findAll: function () {
    return this.find({}).exec();
  },
  updateById: function (reminderId, updateData) {
    return this.findOneAndUpdate({ _id: reminderId }, { $set: updateData }, { new: true }).exec();
  },
  deleteById: function (reminderId) {
    return this.deleteOne({ _id: reminderId }).exec();
  }
};

const MedicationReminder = mongoose.model('MedicationReminder', medicationReminderSchema);
module.exports = MedicationReminder;
