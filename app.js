'use strict';
const express = require('express');
const bodyParse= require('body-parser');
const app=express();


//cargar rutas
const user_routes = require('./routes/user');
const animal_routes = require('./routes/animal');



//middleware de body-parser
app.use(bodyParse.urlencoded({extended:false}));
app.use(bodyParse.json());

//configurar cabeceras y cors

//rutas base

app.use('/api',user_routes);
app.use('/api',animal_routes);



module.exports= app;