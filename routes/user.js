'use strict';
const express = require('express');
const UserController = require('../controllers/user');

const api = express.Router();
api.get('/pruebas-del-controlador', UserController.pruebas);
api.post('/register', UserController.saveUser);
module.exports=api;