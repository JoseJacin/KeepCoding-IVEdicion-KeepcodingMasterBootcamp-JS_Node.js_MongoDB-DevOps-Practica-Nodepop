//Script que se encarga de inicializar la Base de Datos de NodePop
'use strict';

var connection = 'localhost:27017';
var database = 'nodepopdb';
var anuncios = 'anuncios';
var usuarios = 'usuarios';

print('## COMENZANDO LA INICIALIZACIÓN DE LA BASE DE DATOS :', database, '##');
print('---- Realizando la configuración de conexión');
//Host de la Base de Datos
var conn = new Mongo(connection);
//Nombre de la Base de Datos
var db = conn.getDB(database);
print('---- Conexión realizada\n');

print('---- Eliminar la Base de Datos: ', database);
//Se elimina toda la información que pueda contener la Base de Datos
db.dropDatabase();
print('---- Eliminación realizada\n');

print('---- Creación de la Base de Datos: ', database);
//Creación de la Base de Datos
db.getSiblingDB(database)
print('---- Creación realizada\n');

print('---- Creando las colecciones');
//Se crean las colecciones de la Base de Datos
print('------ Creando la colección', anuncios);
db.createCollection(anuncios);
print('------ Creando la colección', usuarios);
db.createCollection(usuarios);
print('---- Colecciones creadas\n');

print('---- Preparando y cargando datos');
//Documentos de Anuncios
//Fichero de Anuncios
print('------ Preparando fichero de', anuncios);
var fileInsertDBAnuncios = cat('./config/anuncios.json');
//Parseado a JSON del contenido del fichero
var anuncios_json = JSON.parse(fileInsertDBAnuncios);
//Inserción de los Documentos de Anuncios en la Base de Datos
print('------ Cargando datos de', anuncios);
db.anuncios.insert(anuncios_json);
print('------ Fichero cargado');
print('------ Creando índices', usuarios);
db.anuncios.ensureIndex({nombre:1});
db.anuncios.ensureIndex({venta:1});
db.anuncios.ensureIndex({precios:1});
db.anuncios.ensureIndex({tags:1});
print('------ Índices creado\n');

print('------ Preparando fichero de', usuarios);
//Documentos de Usuarios
//Fichero de Usuarios
var fileInsertDBUsuarios = cat('./config/usuarios.json');
//Parseado a JSON del contenido del fichero
var usuarios_json = JSON.parse(fileInsertDBUsuarios);
//Inserción de los Documentos de Anuncios en la Base de Datos
print('------ Cargando datos de', usuarios);
db.usuarios.insert(usuarios_json);
print('------ Fichero cargado');
print('------ Creando índices', usuarios);
db.usuarios.ensureIndex({nombre:1});
db.usuarios.ensureIndex({email:1}, {unique: true});
print('------ Índice creado');

print('------ Creando índices', usuarios);
db.tokens.ensureIndex({email:1});
print('------ Índice creado');
print('---- Datos cargados\n');

print('## INICIALIZACIÓN DE LA BASE DE DATOS FINALIZADA ##');
