'use strict';
const express = require('express');
const AnimalController = require('../controllers/animal');

const api = express.Router();
const md_auth=require('../middlewares/authenticated');

const multipart= require('connect-multiparty');
const md_upload= multipart({uploadDir:'./uploads/animals'});

api.get('/pruebas-animales', md_auth.ensureAuth, AnimalController.pruebas);
api.post('/animal', md_auth.ensureAuth, AnimalController.saveAnimal);

module.exports=api;