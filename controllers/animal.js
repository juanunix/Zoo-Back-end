'use strict';
'use strict';
//modulos
const fs = require('fs');
const path = require('path');

//modelos
const User = require('../models/user');
const Animal = require('../models/animal');

//acciones

function pruebas(req, res) {
    res.status(200).send({
        message: 'probando el controlador de ANIMALES y la accion pruebas',
        user:req.user
    })
}

function saveAnimal(req, res) {

    const animal = new Animal();
    const params= req.body;

    if (params.name){
        animal.name= params.name;
        animal.description= params.description;
        animal.year= params.year;
        animal.image= null;
        animal.user= req.user.sub;

        animal.save((err, animalStored)=>{
           if (err){
               res.status(500).send({message:'error en el servidor'});
           }else{
               if (!animalStored){
                   res.status(404).send({message:'no se ha guardado el animal'});
               }else {
                   res.status(200).send({animal:animalStored});
               }
           }
        });
    }else {
        res.status(200).send({message:'el nombre del animal es obligatorio'});
    }
}

function getAnimals(req, res) {
    Animal.find({}).populate({path:'user'}).exec((err, animals)=> {
        if (err){
            res.status(500).send({ message: 'Error en la peticion' });
        }else {
            if(!animals){
                res.status(404).send({ message: 'No hay animales' });
            }else {
                res.status(200).send({ animals });
            }
        }
    })
}

function getAnimal(req, res) {
    const animalId=req.params.id;
    Animal.findById(animalId).populate('user').exec((err,animal)=>{
        if (err){
            res.status(500).send({ message: 'Error en la peticion' });
        }else {
            if(!animal){
                res.status(404).send({ message: 'El animal no existe' });
            }else {
                res.status(200).send({ animal });
            }
        }
    });
}

function updateAnimal(req, res) {
    const animalId=req.params.id;
    const update=req.body;

    Animal.findByIdAndUpdate(animalId, update,{new:true},(err,animalUpdated)=>{
        if (err){
            res.status(500).send({ message: 'Error en la peticion' });
        }else {
            if(!animalUpdated){
                res.status(404).send({ message: 'El animal no existe' });
            }else {
                res.status(200).send({ animalUpdated });
            }
        }
    });
}

module.exports = {
    pruebas,
    saveAnimal,
    getAnimals,
    getAnimal,
    updateAnimal
};