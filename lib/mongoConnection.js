'use strict';

//Requires
//Se carga el fichero de properties
let database = require('../config/local_config').database;

//Módulos
let mongoose = require('mongoose'); //Mongoose
let db = mongoose.connection;

//Se indica la librería de promesas que se utilizará
mongoose.Promise = global.Promise;

//Esto se ejecutará cada vez que haya un error. Está escuchando el evento 'Error'
db.on('error', console.log.bind(console));

//Esto se ejecutará cuando se conecte a MongoDB (con once se indica que solo se tiene que ejecutar una vez- singleton)
db.once('open', function () {
   console.log('Conectado a mongodb.');
});

//Se establece la conexión
mongoose.connect(database);