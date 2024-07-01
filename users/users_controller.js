const User = require('./users_dao');

// Crear un nuevo usuario
exports.createUser = async (req, res, next) => {
  const { user_name, user_lastname, user_password, user_email } = req.body;

  // Verificar si ya existe un usuario con el mismo correo electrónico
  const existingUser = await User.findOne({ user_email });

  if (existingUser) {
    // Si el usuario ya existe, envía un mensaje de error
    return res.status(409).send({ message: 'El usuario ya existe.' });
  }

  const newUser = {
    user_name,
    user_lastname,
    user_password,
    user_email,
  };

  try {
    // Intenta crear el nuevo usuario en la base de datos
    const user = await User.create(newUser);

    // Si se crea exitosamente, envía una respuesta de éxito
    res.status(201).send({ message: 'Usuario creado exitosamente', user });
  } catch (err) {
    // Manejo de otros errores
    console.error('Error al crear el usuario:', err);
    res.status(500).send('Error interno del servidor');
  }
};

// Iniciar sesión de usuario
exports.loginUser = async (req, res, next) => {
  const userData = {
    user_email: req.body.user_email,
    user_password: req.body.user_password,
  };

  try {
    const user = await User.findOne({ user_email: userData.user_email });

    if (!user) {
      return res.status(401).send({ message: 'Error al iniciar sesión: Usuario no encontrado' });
    } else {
      const resultPassword = userData.user_password;
      if (resultPassword == user.user_password) {
        console.log('Sesión iniciada correctamente'); // Mensaje por consola
        res.send({ user });
      } else {
        return res.status(401).send({ message: 'Error al iniciar sesión: Contraseña incorrecta' });
      }
    }
  } catch (err) {
    return res.status(500).send('Server Error');
  }
};

// Obtener todos los usuarios
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      return res.status(409).send({ message: 'No users found' });
    } else {
      res.send(users);
    }
  } catch (err) {
    return res.status(500).send('Server Error');
  }
};

// Obtener un usuario por email
exports.getUserByEmail = async (req, res, next) => {
  const userEmail = req.body.user_email;

  try {
    const user = await User.findOne({ user_email: userEmail });

    if (!user) {
      res.status(409).send({ message: 'Usuario no encontrado' });
    } else {
      res.send({ user });
    }
  } catch (err) {
    return res.status(500).send('Error del Servidor');
  }
};

// Actualizar la información de un usuario
exports.updateUser = async (req, res) => {
  const userEmail = req.body.user_email;
  const userNewData = {
    user_name: req.body.user_name,
    user_lastname: req.body.user_lastname,
    user_password: req.body.user_password,
  };

  try {
    const updateResult = await User.updateOne({ user_email: userEmail }, { $set: userNewData });

    if (updateResult.matchedCount === 0) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }

    res.json({ status: 'Información del usuario actualizada' });
  } catch (err) {
    res.status(500).send('Error del Servidor');
  }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
  const userEmail = req.body.user_email;

  try {
    const deleteResult = await User.deleteOne({ user_email: userEmail });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).send({ message: 'Usuario no encontrado' });
    }

    res.json({ Estado: 'Usuario Eliminado' });
  } catch (err) {
    res.status(500).send({ message: 'Error del Servidor' });
  }
};
