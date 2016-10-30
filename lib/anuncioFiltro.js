/**
 * Created by JoseJacin on 30/10/16.
 */
'use strict';

//Se carga el fichero de properties
let DEBUG_TRACE = require('../config/local_config').DEBUG_TRACE;

function anuncioFiltro(req) {
    //Se recuperan los parámetros de entrada que llega en el GET (dirección URL)
    //Parámetros de filtro
    let nombre = req.query.nombre;
    let venta = req.query.venta;
    let precio = req.query.precio || null;
    let tag = req.query.tag;

    let filter = {};

    if (DEBUG_TRACE) {
        console.log('**** ANUNCIO FILTRO ****');
        console.log('**** ANTES DEL PARSEO ****');
        console.log('filter.nombre', filter.nombre);
        console.log('filter.venta', filter.venta);
        console.log('filter.precio', filter.precio);
        console.log('filter.tags', filter.tags);
    }

    //Se valida que el parámetro nombre haya sido informado en el GET (dirección URL)
    if (typeof nombre !== 'undefined') {
        filter.nombre = new RegExp('^' + nombre, 'i');
    }

    //Se valida que el parámetro venta haya sido informado en el GET (dirección URL)
    if (typeof venta !== 'undefined') {
        filter.venta = venta;
    }

    //Se valida que el parámetro precio haya sido informado en el GET (dirección URL)
    if (precio !== null) {
        //Se establecen los filtros para el precio
        let rango;

        //Se consulta si se ha introducido un rango de precios
        if (precio.indexOf('-') >= 0) {
            //Se ha introducido un rango de precios, por lo que se separan los límites del rango
            rango = precio.split('-');

            //Se valida si alguno de los elementos del rango está vacío. En caso de que los dos elementos estén vacíos,
            // no se aplicará el filtro por precio
            if (rango[0] === '' && rango[1] !== '') {
                //El primer elemento está vacío. Se buscarán los elementos que tengan un precio inferior o igual al indicado por el segundo elemento
                filter.precio = { '$lte': parseInt(rango[1]) };
            } else if (rango[0] !== '' && rango[1] === '') {
                //El segundo elemento está vacío. Se buscarán los elementos que tengan un precio superior o igual al indicado por el primer elemento
                filter.precio = { '$gte': parseInt(rango[0]) };
            } else if (rango[0] !== '' && rango[1] !== '') {
                //Ningún elemento está vacío. Se buscarán los elementos que tengan un precio superior o igual al indicado por el primer elemento
                // e inferior o igual al indicado por el segundo elemento
                filter.precio = { '$gte': parseInt(rango[0]), '$lte': parseInt(rango[1]) };
            }
        } else {
            //No se ha introducido un rango de precios, por lo que se añade directamente al filtro el precio recibido
            filter.precio = precio;
        }
    }

    //Se valida que el parámetro tag haya sido informado en el GET (dirección URL)
    if (typeof tag !== 'undefined') {
        filter.tags = { '$all': [tag] };
    }

    if (DEBUG_TRACE) {
        console.log('**** ANUNCIO FILTRO ****');
        console.log('**** DESPUES DEL PARSEO ****');
        console.log('filter.nombre', filter.nombre);
        console.log('filter.venta', filter.venta);
        console.log('filter.precio', filter.precio);
        console.log('filter.tags', filter.tags);
    }

    //Se retorna el filtro formado
    return filter;
}

module.exports = anuncioFiltro;