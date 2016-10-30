/**
 * Created by JoseJacin on 23/10/16.
 */
'use strict';

//Fichero con el Schema de Usuarios

//Requires
//Se carga el fichero de properties
let DEBUG_TRACE = require('../config/local_config').DEBUG_TRACE;

//Módulos
let mongoose = require('mongoose');

//Schema de Usuarios
let usuarioSchema = mongoose.Schema ({
    nombre: { type: String },
    email: { type: String },
    clave: { type: String }
});

//Métodos estáticos
//Método que recupera los Usuarios
usuarioSchema.statics.list = function (filter, sort, limit, skip, fields) {
    return new Promise(function (resolve, reject) {
        //Se realiza la búsqueda del usuario teniendo en cuenta:
        //Que cumplan con la condición recibida
        let query = Usuario.find(filter);
        //Se ordenarán por el campo indicado en el parámetro sort
        query.sort(sort);
        //Se mostrarán tantos documentos como se indiquen en el parámetro limit
        query.limit(limit);
        //Se saltarán tantos documentos como se indiquen en el parámetro skip
        query.skip(skip);
        //Se mostrarán los campos como se indique en el parámetro fields. Para mostrar letios campos, se tienen que separar con espacios
        query.select(fields);

        if (DEBUG_TRACE) {
            console.log('**** FUNCIÓN USUARIO.LIST ****');
            console.log('filter', filter);
            console.log('query', query);
        }

        //Se ejecuta la consulta
        query.exec(function (err, result) {
            //Se comprueba si ha habido error
            if (err) {
                reject(err);
                return;
            }
            //Si no ha habido error
            resolve(result);
        });
    });
};

//Se indica a mongoose que utilice el Schema usuarioSchema con el model Usuario
let Usuario = mongoose.model('Usuario', usuarioSchema);