const express = require('express');
const DoctorController = require('./doctors_controller');

module.exports = (router) => {
  router.post('/createDoctor', DoctorController.createDoctor);
  router.post('/getDoctorByUserId', DoctorController.getDoctorByUserId);
  router.get('/getAllDoctors', DoctorController.getAllDoctors);
  router.put('/updateDoctor', DoctorController.updateDoctor);
  router.delete('/deleteDoctor', DoctorController.deleteDoctor);
};
