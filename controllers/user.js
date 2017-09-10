'use strict';
//modulos
const bcrypt = require('bcrypt-nodejs');

//modelos
const User = require('../models/user');

//acciones

function pruebas(resq, res) {
    res.status(200).send({
        message: 'probando el controlador de usuarios y la accion pruebas'
    })
}

function saveUser(req, res) {
    //creando objeto de usuario
    var user = new User();

    //recoger parametros de la peticion
    var params = req.body;


    if (params.password && params.name && params.surname && params.email) {

        //asignar valores al obj usuario
        user.name = params.name;
        user.surname = params.surname;
        user.email = params.email;
        user.role = 'ROLE_USER';
        user.image = null;
        User.findOne({email: user.email.toLowerCase()}, (err, issetUser) => {
            if (err) {
                res.status(500).send({message: 'error al comprobar el usuario'});
            } else {
                if (!issetUser) {
                    //cifrado de contrasena
                    bcrypt.hash(params.password, null, null, function (err, hash) {
                        user.password = hash;
                        //guardar usuario en base de datos
                        user.save((err, userStored) => {
                            if (err) {
                                res.status(500).send({message: 'error al guardar el usuario'});
                            } else {
                                if (!userStored) {
                                    res.status(404).send({message: 'no se ha regisrado el usuario'});
                                } else {
                                    res.status(200).send({user: userStored});
                                }
                            }
                        })
                    })
                }else {
                    res.status(200).send({message: 'El usuario no puede registrarse porque ya existe'});
                }
            }
        });


    } else {
        res.status(200).send({message: 'Introduce los datos correctamente para poder registrar al usuario'});
    }
}

function login(req, res) {
    const params=req.body;
    const email=params.email;
    const password=params.password;

    User.findOne({email: email.toLowerCase()}, (err, user) => {
        if (err) {
            res.status(500).send({message: 'error al comprobar el usuario'});
        } else {
            if (user) {
                bcrypt.compare(password, user.password,(err, check)=>{
                    if (check){
                        res.status(200).send({user});
                    }else {
                        res.status(404).send({message: 'El usuario no ha podido loguearse correctamente'});
                    }
                });

            }else {
                res.status(404).send({message: 'El usuario no ha podido loguearse'});
            }
        }

})}

module.exports = {
    pruebas,
    saveUser,
    login
};