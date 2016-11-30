'use strict';

let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let routes = require('./routes/index');

let app = express();

//Se requiere la librería de conexión a la Base de Datos
require('./lib/mongoConnection');

//Se cargan los modelos
require('./models/Anuncio');
require('./models/Usuario');
require ('./models/PushToken.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  next();
});

//Se incluyen las rutas del servidor
app.use('/', require('./routes/index'));
app.use ('/images/anuncios', express.static (__dirname + '/public/images/anuncios'));
//Se cargan las rutas del API
app.use('/apiv1/anuncios', require('./routes/apiv1/anuncios'));
app.use('/apiv1/usuarios', require('./routes/apiv1/usuarios'));
app.use('/apiv1/tags', require ('./routes/apiv1/tags');
app.use('/apiv1/pushToken', require ('./routes/apiv1/pushTokens');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);

    //Si es una petición de API se retorna JSON, sino, una página
    if (isAPI(req)) {
      res.json({success:false, error:err});
    } else {
      res.render('error', {
        message: err.message,
        error: err
      });
    }
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);

  //Si es una petición de API se retorna JSON, sino, una página
  if (isAPI(req)) {
    res.json({success:false, error:err});
  } else {
    res.render('error', {
      message: err.message,
      error: err
    });
  }
});

//Función que determina si una función es de API o de WEB
function isAPI(req) {
  //Se valida si en la petición se encuentra la cadena '/api'
  return req.originalUrl.indexOf('/api') === 0;
}

module.exports = app;
