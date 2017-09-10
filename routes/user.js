'use strict';
const express = require('express');
const UserController = require('../controllers/user');

const api = express.Router();
const md_auth=require('../middlewares/authenticated');

api.get('/pruebas-del-controlador', md_auth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.login);
module.exports=api;