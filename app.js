'use strict';
const express = require('express');
const bodyParse= require('body-parser');
const app=express();


//cargar rutas
const user_routes = require('./routes/user');



//middleware de body-parser
app.use(bodyParse.urlencoded({extended:false}));
app.use(bodyParse.json());

//configurar cabeceras y cors

//rutas base

app.use('/api',user_routes);



module.exports= app;