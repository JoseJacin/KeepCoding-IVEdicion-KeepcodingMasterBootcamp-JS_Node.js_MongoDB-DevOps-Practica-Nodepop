/**
 * Created by JoseJacin on 23/10/16.
 */
'use strict';

//Fichero con el Schema de Anuncios

//Requires
//Se carga el fichero de properties
let DEBUG_TRACE = require('../config/local_config').DEBUG_TRACE;

//Módulos
let mongoose = require('mongoose'); //Mongoose

//Schema de Anuncios
let anuncioSchema = mongoose.Schema ({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: {
        type: [String],
        enum: ['work','lifestyle','motor','mobile']
    }
});

//Métodos estáticos
//Método que recupera los Anuncios
anuncioSchema.statics.list = function (filter, sort, limit, skip, fields, result) {
    //Se realiza la búsqueda de los anuncios teniendo en cuenta:
    //Que cumplan con la condición recibida
    let query = Anuncio.find(filter);
    //Se ordenarán por el campo indicado en el parámetro sort
    query.sort(sort);
    //Se mostrarán tantos documentos como se indiquen en el parámetro limit
    query.limit(limit);
    //Se saltarán tantos documentos como se indiquen en el parámetro skip
    query.skip(skip);
    //Se mostrarán los campos como se indique en el parámetro fields. Para mostrar letios campos, se tienen que separar con espacios
    query.select(fields);

    if (DEBUG_TRACE) {
        console.log('**** FUNCIÓN ANUNCIO.LIST ****');
        console.log('query', query);
    }

    //Se ejecuta la consulta
    return query.exec(result);
};

//Se indica a mongoose que utilice el Schema anuncioSchema con el model Anuncio
let Anuncio = mongoose.model('Anuncio', anuncioSchema);