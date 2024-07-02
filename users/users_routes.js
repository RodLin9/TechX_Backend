const express = require('express');
const router = express.Router();

const UserController = require('./users_controller');

// Rutas para usuarios
module.exports = (router) => {
  router.post('/createUser', UserController.createUser);
  router.post('/loginUser', UserController.loginUser);
  router.get('/getAllUsers', UserController.getAllUsers);
  router.post('/getUserByEmail', UserController.getUserByEmail);
  router.get('/getUsersByRole/:role', UserController.getUsersByRole);
  router.put('/updateUser', UserController.updateUser); //PUT
  router.delete('/deleteUser', UserController.deleteUser); //DELETE
  //router.get('/connectionWithApp', UserController.connectionWithApp);
};
