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
        animal.descriprion= params.descriprion;
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

module.exports = {
    pruebas,
    saveAnimal
};