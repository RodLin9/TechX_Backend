const MedicationReminder = require('./medication_reminders_dao');

// Crear un nuevo recordatorio de medicamentos
exports.createMedicationReminder = async (req, res, next) => {
  const { patient_id, medication_name, time } = req.body;

  const newReminder = {
    patient_id,
    medication_name,
    time
  };

  try {
    const reminder = await MedicationReminder.create(newReminder);
    res.status(201).send({ message: 'Recordatorio de medicamento creado exitosamente', reminder });
  } catch (err) {
    console.error('Error al crear el recordatorio de medicamento:', err);
    res.status(500).send('Error interno del servidor');
  }
};

// Obtener un recordatorio de medicamentos por ID
exports.getMedicationReminderById = async (req, res, next) => {
  const { reminderId } = req.body;

  try {
    const reminder = await MedicationReminder.findById(reminderId);
    if (!reminder) {
      return res.status(404).send({ message: 'Recordatorio de medicamento no encontrado' });
    }
    res.send({ reminder });
  } catch (err) {
    console.error('Error al obtener el recordatorio de medicamento:', err);
    res.status(500).send('Error del Servidor');
  }
};

// Obtener todos los recordatorios de medicamentos
exports.getAllMedicationReminders = async (req, res, next) => {
  try {
    const reminders = await MedicationReminder.findAll();
    if (!reminders || reminders.length === 0) {
      return res.status(404).send({ message: 'No se encontraron recordatorios de medicamentos' });
    }
    res.send(reminders);
  } catch (err) {
    console.error('Error al obtener los recordatorios de medicamentos:', err);
    res.status(500).send('Error del Servidor');
  }
};

// Obtener recordatorios de medicamentos por ID de paciente
exports.getMedicationRemindersByPatientId = async (req, res, next) => {
  const { patientId } = req.body;

  try {
    const reminders = await MedicationReminder.findByPatientId(patientId);
    if (!reminders || reminders.length === 0) {
      return res.status(404).send({ message: 'No se encontraron recordatorios de medicamentos para el paciente' });
    }
    res.send(reminders);
  } catch (err) {
    console.error('Error al obtener los recordatorios de medicamentos del paciente:', err);
    res.status(500).send('Error del Servidor');
  }
};

// Actualizar un recordatorio de medicamentos
exports.updateMedicationReminder = async (req, res) => {
  const { reminderId, updateData } = req.body;

  try {
    const updatedReminder = await MedicationReminder.updateById(reminderId, updateData);
    if (!updatedReminder) {
      return res.status(404).send({ message: 'Recordatorio de medicamento no encontrado' });
    }
    res.json({ message: 'Información del recordatorio de medicamento actualizada', updatedReminder });
  } catch (err) {
    console.error('Error al actualizar el recordatorio de medicamento:', err);
    res.status(500).send('Error del Servidor');
  }
};

// Eliminar un recordatorio de medicamentos
exports.deleteMedicationReminder = async (req, res) => {
  const { reminderId } = req.body;

  try {
    const deleteResult = await MedicationReminder.deleteById(reminderId);
    if (deleteResult.deletedCount === 0) {
      return res.status(404).send({ message: 'Recordatorio de medicamento no encontrado' });
    }
    res.json({ message: 'Recordatorio de medicamento eliminado' });
  } catch (err) {
    console.error('Error al eliminar el recordatorio de medicamento:', err);
    res.status(500).send('Error del Servidor');
  }
};
