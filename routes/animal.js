'use strict';
const express = require('express');
const AnimalController = require('../controllers/animal');

const api = express.Router();
const md_auth=require('../middlewares/authenticated');

const multipart= require('connect-multiparty');
const md_upload= multipart({uploadDir:'./uploads/animals'});

api.get('/pruebas-animales', md_auth.ensureAuth, AnimalController.pruebas);
api.post('/animal', md_auth.ensureAuth, AnimalController.saveAnimal);
api.get('/animals',AnimalController.getAnimals);
api.get('/animal/:id',AnimalController.getAnimal);
api.put('/animal/:id',md_auth.ensureAuth,AnimalController.updateAnimal);
api.post('/upload-image-animal/:id',[md_auth.ensureAuth, md_upload], AnimalController.uploadImage);
api.get('/get-image-animal/:imageFile', AnimalController.getImageFile);
api.delete('/animal/:id',md_auth.ensureAuth,AnimalController.deleteAnimal);

module.exports=api;