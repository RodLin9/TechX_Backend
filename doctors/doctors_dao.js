const mongoose = require('mongoose');
const doctorSchema = require('./doctors_model');

doctorSchema.statics = {
  create: function (data) {
    const doctor = new this(data);
    return doctor.save();
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

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
