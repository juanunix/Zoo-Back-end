'use strict';
//modulos
const bcrypt = require('bcrypt-nodejs');

//modelos
const User = require('../models/user');

//servicio jwt
const jwt = require('../services/jwt');

//acciones

function pruebas(req, res) {
    res.status(200).send({
        message: 'probando el controlador de usuarios y la accion pruebas',
        user:req.user
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
                        //comprobar y generar token
                        if (params.gettoken){
                            //devolver token
                            res.status(200).send({token:jwt.createToken(user)})

                        }else {
                            res.status(200).send({user});
                        }

                    }else {
                        res.status(404).send({message: 'El usuario no ha podido loguearse correctamente'});
                    }
                });

            }else {
                res.status(404).send({message: 'El usuario no ha podido loguearse'});
            }
        }

})}

function updateUser(req, res) {

    const userId= req.params.id;
    const update=req.body;
    if (userId != req.user.sub){
        return res.status(500).send({message:'no tienes permiso para actualizar el usuario'})
    }
    User.findByIdAndUpdate(userId,update,{new:true}, (err, userUpdated)=>{
       if(err){
           res.status(500).send({message:'Error al actualizar el usuario'})
       }else {
           if (!userUpdated){
               res.status(404).send({message:'no se a podido actualizar el usuario'})
           }else {
               res.status(200).send({user:userUpdated});
           }

       }
    });


}

module.exports = {
    pruebas,
    saveUser,
    login,
    updateUser
};