const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** @function userSchema */
// Schema in student for model

const userSchema = new Schema({
    user_name:{
        type: String,
        required: true,
        trim: true
    },
    user_lastname:{
        type: String,
        required: true,
        trim: true,
        unique: false
    },
    user_password:{
        type: String,
        required: true,
        trim: true
    },
    user_email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    role: {
      type: String,
      enum: ['patient', 'doctor'],
      required: true
    },
},{timestamps: true});

module.exports = userSchema;
