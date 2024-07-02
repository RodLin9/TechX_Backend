const Appointment = require('./appointments_dao');
const Doctor = require('../doctors/doctors_dao');

// Crear una nueva cita
exports.createAppointment = async (req, res, next) => {
  const { doctor_id, patient_id, date, timeSlot } = req.body;

  try {
    // Obtener la especialidad del doctor
    const doctor = await Doctor.findByUserId(doctor_id);
    if (!doctor) {
      return res.status(404).send({ message: 'Doctor no encontrado' });
    }
    const specialty = doctor.specialty;

    // Verificar si el paciente ya tiene una cita a la misma hora
    const existingPatientAppointment = await Appointment.findOne({ patient_id, date, timeSlot });
    if (existingPatientAppointment) {
      return res.status(409).send({ message: 'El paciente ya tiene una cita programada a esta hora.' });
    }

    // Verificar si el doctor ya tiene una cita a la misma hora
    const existingDoctorAppointment = await Appointment.findOne({ doctor_id, date, timeSlot });
    if (existingDoctorAppointment) {
      return res.status(409).send({ message: 'El doctor ya tiene una cita programada a esta hora.' });
    }

    const newAppointment = {
      doctor_id,
      patient_id,
      specialty,
      date,
      timeSlot
    };

    const appointment = await Appointment.create(newAppointment);
    res.status(201).send({ message: 'Cita creada exitosamente', appointment });
  } catch (err) {
    console.error('Error al crear la cita:', err);
    res.status(500).send('Error interno del servidor');
  }
};

// Obtener una cita por ID
exports.getAppointmentById = async (req, res, next) => {
  const { appointmentId } = req.body;

  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).send({ message: 'Cita no encontrada' });
    }
    res.send({ appointment });
  } catch (err) {
    console.error('Error al obtener la cita:', err);
    res.status(500).send('Error del Servidor');
  }
};

// Obtener todas las citas
exports.getAllAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.findAll();
    if (!appointments || appointments.length === 0) {
      return res.status(404).send({ message: 'No se encontraron citas' });
    }
    res.send(appointments);
  } catch (err) {
    console.error('Error al obtener las citas:', err);
    res.status(500).send('Error del Servidor');
  }
};

// Obtener citas por ID de doctor
exports.getAppointmentsByDoctorId = async (req, res, next) => {
  const { doctorId } = req.body;

  try {
    const appointments = await Appointment.findByDoctorId(doctorId);
    if (!appointments || appointments.length === 0) {
      return res.status(404).send({ message: 'No se encontraron citas para el doctor' });
    }
    res.send(appointments);
  } catch (err) {
    console.error('Error al obtener las citas del doctor:', err);
    res.status(500).send('Error del Servidor');
  }
};

// Obtener citas por ID de paciente
exports.getAppointmentsByPatientId = async (req, res, next) => {
  const { patientId } = req.body;

  try {
    const appointments = await Appointment.findByPatientId(patientId);
    if (!appointments || appointments.length === 0) {
      return res.status(404).send({ message: 'No se encontraron citas para el paciente' });
    }
    res.send(appointments);
  } catch (err) {
    console.error('Error al obtener las citas del paciente:', err);
    res.status(500).send('Error del Servidor');
  }
};

// Actualizar una cita
exports.updateAppointment = async (req, res) => {
  const { appointmentId, updateData } = req.body;

  try {
    const updatedAppointment = await Appointment.updateById(appointmentId, updateData);
    if (!updatedAppointment) {
      return res.status(404).send({ message: 'Cita no encontrada' });
    }
    res.json({ message: 'Información de la cita actualizada', updatedAppointment });
  } catch (err) {
    console.error('Error al actualizar la cita:', err);
    res.status(500).send('Error del Servidor');
  }
};

// Eliminar una cita
exports.deleteAppointment = async (req, res) => {
  const { appointmentId } = req.body;

  try {
    const deleteResult = await Appointment.deleteById(appointmentId);
    if (deleteResult.deletedCount === 0) {
      return res.status(404).send({ message: 'Cita no encontrada' });
    }
    res.json({ message: 'Cita eliminada' });
  } catch (err) {
    console.error('Error al eliminar la cita:', err);
    res.status(500).send('Error del Servidor');
  }
};
