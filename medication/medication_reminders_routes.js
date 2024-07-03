const express = require('express');
const MedicationReminderController = require('./medication_reminders_controller');

module.exports = (router) => {
  router.post('/createMedicationReminder', MedicationReminderController.createMedicationReminder);
  router.post('/getMedicationReminderById', MedicationReminderController.getMedicationReminderById);
  router.get('/getAllMedicationReminders', MedicationReminderController.getAllMedicationReminders);
  router.post('/getMedicationRemindersByPatientId', MedicationReminderController.getMedicationRemindersByPatientId);
  router.put('/updateMedicationReminder', MedicationReminderController.updateMedicationReminder);
  router.delete('/deleteMedicationReminder', MedicationReminderController.deleteMedicationReminder);
};
