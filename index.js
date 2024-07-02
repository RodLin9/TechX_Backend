'use strict';

require("dotenv").config(); // Variables de entorno

const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');

// Conexión con la db
const dbConnect = require('./config/db');
dbConnect();

const app = express();
app.use(cors()); // Permite evitar el error de origen cruzado entre los navegadores
const router = express.Router();

// Configuración del bodyParser y multipart
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Definición de rutas
const userRoutes = require('./users/users_routes');
const patientRoutes = require('./patients/patients_routes');
const doctorRoutes = require('./doctors/doctors_routes');

// Aplicar rutas al app
userRoutes(router);
patientRoutes(router);
doctorRoutes(router);

app.use('/api', router);

// Rutas adicionales
app.get('/tengohambre', (req, res) => {
  console.log(req.body);
  res.status(200).send({ message: 'Hola TechX, tengo hambre' });
});

// Configuración del puerto
const port = process.env.PORT || 3002;
app.listen(port, '0.0.0.0', () => {
  console.log('El back TechX está listo por http://localhost:' + port + ' :D');
});

// Servir archivos estáticos
app.use(express.static('public'));

app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    // Manejar ValidationError
    return res.status(400).json({ error: err.message });
  }
  // Manejar otros tipos de errores
  console.error(err);
  res.status(500).json({ error: 'Un error inesperado ocurrió.' });
});
