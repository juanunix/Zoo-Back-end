'use strict';
function pruebas(resq, res) {
    res.status(200).send({
        message:'probando el controlador de usuarios y la accion pruebas'
    })
}
module.exports={
    pruebas
};