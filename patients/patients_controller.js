const Patient = require('./patients_dao');

// Crear un nuevo paciente
exports.createPatient = async (req, res, next) => {
  const { user_id, medical_info } = req.body;

  const newPatient = {
    user_id,
    medical_info
  };

  try {
    const patient = await Patient.create(newPatient);
    res.status(201).send({ message: 'Paciente creado exitosamente', patient });
  } catch (err) {
    console.error('Error al crear el paciente:', err);
    res.status(500).send('Error interno del servidor');
  }
};

// Obtener un paciente por ID de usuario
exports.getPatientByUserId = async (req, res, next) => {
  const { userId } = req.body;

  try {
    const patient = await Patient.findByUserId(userId);
    if (!patient) {
      return res.status(404).send({ message: 'Paciente no encontrado' });
    }
    res.send({ patient });
  } catch (err) {
    console.error('Error al obtener el paciente:', err);
    res.status(500).send('Error del Servidor');
  }
};

// Obtener todos los pacientes
exports.getAllPatients = async (req, res, next) => {
  try {
    const patients = await Patient.findAll();
    if (!patients || patients.length === 0) {
      return res.status(404).send({ message: 'No se encontraron pacientes' });
    }
    res.send(patients);
  } catch (err) {
    console.error('Error al obtener los pacientes:', err);
    res.status(500).send('Error del Servidor');
  }
};

// Actualizar la información de un paciente
exports.updatePatient = async (req, res) => {
  const { userId, updateData } = req.body;

  try {
    const updatedPatient = await Patient.updateByUserId(userId, updateData);
    if (!updatedPatient) {
      return res.status(404).send({ message: 'Paciente no encontrado' });
    }
    res.json({ message: 'Información del paciente actualizada', updatedPatient });
  } catch (err) {
    console.error('Error al actualizar el paciente:', err);
    res.status(500).send('Error del Servidor');
  }
};

// Eliminar un paciente
exports.deletePatient = async (req, res) => {
  const { userId } = req.body;

  try {
    const deleteResult = await Patient.deleteByUserId(userId);
    if (deleteResult.deletedCount === 0) {
      return res.status(404).send({ message: 'Paciente no encontrado' });
    }
    res.json({ message: 'Paciente eliminado' });
  } catch (err) {
    console.error('Error al eliminar el paciente:', err);
    res.status(500).send('Error del Servidor');
  }
};
