const express = require('express');
const AppointmentController = require('./appointments_controller');

module.exports = (router) => {
  router.post('/createAppointment', AppointmentController.createAppointment);
  router.post('/getAppointmentById', AppointmentController.getAppointmentById);
  router.get('/getAllAppointments', AppointmentController.getAllAppointments);
  router.post('/getAppointmentsByDoctorId', AppointmentController.getAppointmentsByDoctorId);
  router.post('/getAppointmentsByPatientId', AppointmentController.getAppointmentsByPatientId);
  router.put('/updateAppointment', AppointmentController.updateAppointment);
  router.delete('/deleteAppointment', AppointmentController.deleteAppointment);
};
