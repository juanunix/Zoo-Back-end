'use strict';
const express = require('express');
const bodyParse= require('body-parser');
const app=express();


//cargar rutas


//middleware de body-parser
app.use(bodyParse.urlencoded({extended:false}));
app.use(bodyParse.json());

//configurar cabeceras y cors

//ritas body-parser
app.get('/probando', (req, res)=>{
    res.status(200).send({message:'Este es el metodo probando'});
});


module.exports= app;