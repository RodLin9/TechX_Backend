const Doctor = require('./doctors_dao');

// Crear un nuevo doctor
exports.createDoctor = async (req, res, next) => {
  const { user_id, specialty, availability } = req.body;

  const newDoctor = {
    user_id,
    specialty,
    availability
  };

  try {
    const doctor = await Doctor.create(newDoctor);
    res.status(201).send({ message: 'Doctor creado exitosamente', doctor });
  } catch (err) {
    console.error('Error al crear el doctor:', err);
    res.status(500).send('Error interno del servidor');
  }
};

// Obtener un doctor por ID de usuario
exports.getDoctorByUserId = async (req, res, next) => {
  const { userId } = req.body;

  try {
    const doctor = await Doctor.findByUserId(userId);
    if (!doctor) {
      return res.status(404).send({ message: 'Doctor no encontrado' });
    }
    res.send({ doctor });
  } catch (err) {
    console.error('Error al obtener el doctor:', err);
    res.status(500).send('Error del Servidor');
  }
};

// Obtener todos los doctores
exports.getAllDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.findAll();
    if (!doctors || doctors.length === 0) {
      return res.status(404).send({ message: 'No se encontraron doctores' });
    }
    res.send(doctors);
  } catch (err) {
    console.error('Error al obtener los doctores:', err);
    res.status(500).send('Error del Servidor');
  }
};

// Actualizar la información de un doctor
exports.updateDoctor = async (req, res) => {
  const { userId, updateData } = req.body;

  try {
    const updatedDoctor = await Doctor.updateByUserId(userId, updateData);
    if (!updatedDoctor) {
      return res.status(404).send({ message: 'Doctor no encontrado' });
    }
    res.json({ message: 'Información del doctor actualizada', updatedDoctor });
  } catch (err) {
    console.error('Error al actualizar el doctor:', err);
    res.status(500).send('Error del Servidor');
  }
};

// Eliminar un doctor
exports.deleteDoctor = async (req, res) => {
  const { userId } = req.body;

  try {
    const deleteResult = await Doctor.deleteByUserId(userId);
    if (deleteResult.deletedCount === 0) {
      return res.status(404).send({ message: 'Doctor no encontrado' });
    }
    res.json({ message: 'Doctor eliminado' });
  } catch (err) {
    console.error('Error al eliminar el doctor:', err);
    res.status(500).send('Error del Servidor');
  }
};
