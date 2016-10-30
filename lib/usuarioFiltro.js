/**
 * Created by JoseJacin on 30/10/16.
 */
'use strict';

//Requires
//Se carga el fichero de properties
let DEBUG_TRACE = require('../config/local_config').DEBUG_TRACE;

//Módulos
let hash = require('hash.js'); //Hash

function usuarioFiltro(req) {
    //Se recuperan los parámetros de entrada que llega en el GET (dirección URL)
    //Parámetros de filtro
    let nombre = req.query.nombre || req.body.nombre;
    let email = req.query.email || req.body.email;
    let clave = req.query.clave || req.body.clave;

    let filter = {};

    if (DEBUG_TRACE) {
        console.log('**** USUARIO FILTRO ****');
        console.log('**** ANTES DEL PARSEO ****');
        console.log('filter.nombre', filter.nombre);
        console.log('filter.email', filter.email);
        console.log('filter.clave', filter.clave);
    }

    //Se valida que el parámetro nombre haya sido informado en el GET (dirección URL)
    if (typeof nombre !== 'undefined') {
        filter.nombre = nombre;
    }

    //Se valida que el parámetro email haya sido informado en el GET (dirección URL)
    if (typeof email !== 'undefined') {
        filter.email = email;
    }

    //Se valida que el parámetro clave haya sido informado en el GET (dirección URL)
    if (typeof clave !== 'undefined') {
        filter.clave = hash.sha256().update(clave).digest('hex').toString();
    }

    if (DEBUG_TRACE) {
        console.log('**** USUARIO FILTRO ****');
        console.log('**** DESPUÉS DEL PARSEO ****');
        console.log('filter.nombre', filter.nombre);
        console.log('filter.email', filter.email);
        console.log('filter.clave', filter.clave);
    }

    //Se retorna el filtro formado
    return filter;
}

module.exports = usuarioFiltro;