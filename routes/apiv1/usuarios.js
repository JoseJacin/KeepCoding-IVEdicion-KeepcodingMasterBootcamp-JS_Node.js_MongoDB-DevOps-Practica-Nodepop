/**
 * Created by JoseJacin on 27/10/16.
 */
'use strict';

//Requires
//Se carga el fichero de properties
let DEBUG_TRACE = require('../../config/local_config').DEBUG_TRACE;
let configJWT = require('../../config/local_config').jwt;

//Módulos
let express = require('express'); //Express
let router = express.Router();

let mongoose = require('mongoose'); //Mongoose
let Usuario = mongoose.model('Usuario');

let jwt = require('jsonwebtoken'); //JSON Web Token
let hash = require('hash.js'); //Hash
let email_validator = require('email-validator'); //Validador de email

let errorHandler = require('../../lib/error'); //Manejador de errores
let usuarioFiltro =  require('../../lib/usuarioFiltro'); //Manejador de Filtro de Usuario

//Listado de Documentos Usuario
router.get('/', function (req, res, next) {
    //Se crea el filtro de la consulta
    let filter = usuarioFiltro(req);

    //Parámetros de ordenación
    let sort = req.query.sort || null;
    //Parámetros de paginación
    let limit = parseInt(req.query.limit) || null;
    let skip = parseInt(req.query.start) || null;
    let fields = req.query.fields || null;

    if (DEBUG_TRACE) {
        console.log('**** LISTADO USUARIOS ****');
        console.log('filter.nombre', filter.nombre);
        console.log('filter.email', filter.email);
        console.log('filter.clave', filter.clave);
        console.log('sort', sort);
        console.log('limit', limit);
        console.log('skip', skip);
        console.log('fields', fields);
        console.log('filter', filter);
    }

    //Se realiza la búsqueda de los Usuarios teniendo en cuenta:
    //Que cumplan la condición recibida
    //Se ordenarán por el campo indicado en el parámetro sort
    //Se mostrarán tantos documentos como se indiquen en el parámetro limit
    //Se saltarán tantos documentos como se indiquen en el parámetro skip
    Usuario.list(filter, sort, limit, skip, fields)
        .then(function (usuarios) {
            //Se responde con un JSON con la información recuperada de la BBDD
            res.json({success: true, usuarios: usuarios});
        }).catch(next);
});

//Crear un documento Usuario (Registro de un nuevo usuario)
router.post('/registro', function (req, res) {
    //Se valida si se han informado los valores necesarios para el regitro del usuario
    if (!req.body.nombre || !req.body.email || !req.body.clave) {
        return errorHandler(new Error('Sigin failed. MISSING_PARAMS'), req, res, 400);
    }

    //Se valida que el email tenga el formato correcto
    if (!email_validator.validate(req.body.email)) {
        return errorHandler(new Error('Sigin failed. EMAIL_INVALID_FORMAT'), req, res, 400);
    }

    //Se crea un nuevo documento Usuario con la información que nos llega en el body de la petición del post
    let usuario = new Usuario(req.body);

    //Se cifra la contraseña mediante Hash de 256bits
    usuario.clave = hash.sha256().update(usuario.clave).digest('hex').toString();

    //Se guardan los datos
    usuario.save(function (err, usuarioGuardado) {
        //Se valida si ha habido error
        if (err && err.code === 11000) {
            //El usuario ya existe
            return errorHandler(new Error('Internal server error. USER_EXISTS'), req, res, 500);
        } else if (err && err.code !== 11000) {
            //Ha ocurrido un error
            return errorHandler(new Error('Internal server error. DB_INSERT_ERROR'), req, res, 500);
        }

        //No ha habido error. Se responde con un JSON con la información del documento que se ha dado de alta
        res.json({success: true, message: usuarioGuardado});
    });
});


//Login con JsonWeb Token
router.post('/authenticate', function (req, res) {
    //Se valida si se han informado los valores necesarios para el regitro del usuario
    if (!req.body.email || !req.body.clave) {
        return errorHandler(new Error('Authentication failed. MISSING_PARAMS'), req, res, 400);
    }

    let clave = req.body.clave;
    req.body.clave = undefined;

    //Se valida que el email tenga el formato correcto
    if (!email_validator.validate(req.body.email)) {
        return errorHandler(new Error('Authentication failed. EMAIL_INVALID_FORMAT'), req, res, 400);
    }

    //Se crea el filtro de la consulta
    let filter = usuarioFiltro(req);

    //Parámetros de ordenación
    let sort = req.query.sort || null;
    //Parámetros de paginación
    let limit = parseInt(req.query.limit) || null;
    let skip = parseInt(req.query.start) || null;
    let fields = req.query.fields || null;

    if (DEBUG_TRACE) {
        console.log('**** AUTENTICADO USUARIOS ****');
        console.log('filter.nombre', filter.nombre);
        console.log('filter.email', filter.email);
        console.log('filter.clave', filter.clave);
        console.log('sort', sort);
        console.log('limit', limit);
        console.log('skip', skip);
        console.log('fields', fields);
        console.log('filter', filter);
    }

    //Se realiza la búsqueda de los Usuarios teniendo en cuenta:
    //Que cumplan la condición recibida
    //Se ordenarán por el campo indicado en el parámetro sort
    //Se mostrarán tantos documentos como se indiquen en el parámetro limit
    //Se saltarán tantos documentos como se indiquen en el parámetro skip
    Usuario.findOne(filter, function (err, user) {
        //Se consulta si ha habido error
        if (err) {
            return errorHandler(new Error('Internal server error. DB_SELECT_ERROR'), req, res, 500);
        }

        //No ha habido error en la consulta
        //Se comprueba si se ha recuperado el usuario
        if (!user) {
            //No se ha encontrado el usuario
            return errorHandler(new Error('Authentication failed. USER_NOT_FOUND'), req, res, 404);
        }

        //Se valida si la clave recuperada de la BBDD coincide con la clave indicada
        if (hash.sha256().update(clave).digest('hex').toString() !== user.clave) {
            //Las claves no coinciden
            return errorHandler(new Error('Authentication failed. INVALID_PASSWORD'), req, res, 401);
        }

        //El usuario y clave concuerdan con lo que se encuentra en BBDD
        //Se crea el token que se retorna al usuario
        let token = jwt.sign({id: user._id}, configJWT.secret, {expiresIn: configJWT.expires});

        //Se responde con el token
        res.json({success: true, message: 'Zona de admin con usuario verificado.!'});
    });
});

module.exports = router;
