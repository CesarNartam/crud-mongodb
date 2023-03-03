var express = require('express');

var userController = require('../src/user/userController');
const router = express.Router();

// ruta para login
router.route('/user/login').post(userController.loginUserControllerFunc);
// ruta para crear usuario
router.route('/user/create').post(userController.createUserControllerFunc);
//ruta para leer usuarios
router.route('/user/read').get(userController.readUserControllerFunc);
//ruta para listar usuarios
router.route('/user/list').get(userController.listUserControllerFunc);
//ruta para búsqueda de usuarios
router.route('/user/search').get(userController.searchUserControllerFunc);
//ruta para actualizar usuario
router.route('/user/update').put(userController.updateUserControllerFunc);
//ruta para eliminar usuario
router.route('/user/delete').delete(userController.deleteUserControllerFunc);

module.exports = router;
