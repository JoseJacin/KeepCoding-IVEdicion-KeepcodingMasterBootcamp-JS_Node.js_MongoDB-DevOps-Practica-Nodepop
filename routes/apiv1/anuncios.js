/**
 * Created by JoseJacin on 24/10/16.
 */
'use strict';

//Requires
//Se carga el fichero de properties
let DEBUG_TRACE = require('../../config/local_config').DEBUG_TRACE;

//Módulos
let express = require('express'); //Express
let router = express.Router();

let mongoose = require('mongoose'); //Mongoose
let Anuncio = mongoose.model('Anuncio');

let jwtAuth = require('../../lib/jwtAuth'); //Autenticación con JSON Web Token
let errorHandler = require('../../lib/error'); //Manejador de errores
let anuncioFiltro =  require('../../lib/anuncioFiltro'); //Manenador de Filtro de Anuncio

//Listado de Documentos Anuncio
router.get('/', jwtAuth(), function (req, res) {
    //Parámetros de ordenación
    let sort = req.query.sort || null;
    //Parámetros de paginación
    let limit = parseInt(req.query.limit) || null;
    let skip = parseInt(req.query.start) || null;
    let fields = req.query.fields || null;

    //Se crea el filtro de la consulta
    let filter = anuncioFiltro(req);

    if (DEBUG_TRACE) {
        console.log('**** LISTADO ANUNCIOS ****');
        console.log('filter.nombre', filter.nombre);
        console.log('filter.venta', filter.venta);
        console.log('filter.precio', filter.precio);
        console.log('filter.tags', filter.tags);
        console.log('sort', sort);
        console.log('limit', limit);
        console.log('skip', skip);
        console.log('fields', fields);
        console.log('filter', filter);
    }

    //Se realiza la búsqueda de los Anuncios teniendo en cuenta:
    //Que cumplan la condición recibida
    //Se ordenarán por el campo indicado en el parámetro sort
    //Se mostrarán tantos documentos como se indiquen en el parámetro limit
    //Se saltarán tantos documentos como se indiquen en el parámetro skip
    Anuncio.list(filter, sort, limit, skip, fields, function (err, anuncios) {
        //Se consulta si ha habido error en la consulta
        if (err) {
            //Ha ocurrido un error
            return errorHandler(new Error('Internal server error. DB_FETCH_ERROR'), req, res, 500);
        }

        //No ha habido error en la consulta
        //Se comprueba si se han recuperado anuncios
        console.log('anuncios', anuncios);
        if (anuncios.length === 0) {
            //No se ha encontrado el usuario
            console.log('error');
            return errorHandler(new Error('Internal server error. NO_DATA_FOUND'), req, res, 500);
        }

        //Se responde con un JSON con la información recuperada de la BBDD
        res.json({success: true, anuncios: anuncios});
    });
});

module.exports = router;