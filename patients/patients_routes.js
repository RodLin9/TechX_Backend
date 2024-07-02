const express = require('express');
const PatientController = require('./patients_controller');

// Rutas para pacientes
module.exports = (router) => {
  router.post('/createPatient', PatientController.createPatient);
  router.post('/getPatientByUserId', PatientController.getPatientByUserId);
  router.get('/getAllPatients', PatientController.getAllPatients);
  router.put('/updatePatient', PatientController.updatePatient);
  router.delete('/deletePatient', PatientController.deletePatient);
};
