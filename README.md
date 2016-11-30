![Nodemon Logo](./public/images/Nodepop.png)

Fácil, sencillo, al alcance de la mano.


<h1>Práctica JS/Node.js/MongoDB - KeepCoding Startup Engineering Master IV</h1>

Backend de soporte a una aplicación de venta de artículos de segunda mano.

## Instrucciones
Requisitos de instalación:
- Node >= 4.0
- MongoDB
- Git

## Instalación
### Descarga del Backend
	$ git clone https://github.com/JoseJacin/KeepCoding-IVEdicion-KeepcodingMasterBootcamp-JS_Node.js_MongoDB-PracticaNodepop.git nodepop
	$ cd nodepop
	$ npm install
	
### Lanzar Jshint (Control de Código
	$ npm run-script jshint

### Instalación de la Base de Datos
	$ npm run-script installDB

### Arrancar la Base de Datos (solo es necesario si se ejecuta en local)
	$ npm run-script startDB

### Arrancar el API
	$ npm start

### URL de la aplicación
  * [https://josesanchezrodriguez.es](https://josesanchezrodriguez.es)

### IP del servidor
  * [Protocolo HTTPS - 34.192.136.206](https://34.192.136.206)
  * [Protocolo HTTP - 34.192.136.206](http://34.192.136.206)

### URL de Fichero estático servido por Nginx
  * [https://josesanchezrodriguez.es/nodepop/public/images/Nodepop.png](https://josesanchezrodriguez.es/nodepop/public/images/Nodepop.png)

## Operaciones disponibles
- **Registro** - Registro de usuario. Recibe los parametros de entrada del Body (nombre, email, clave).
    - **Método POST (local)**: [http://localhost:3000/apiv1/usuarios/registro](http://localhost:3000/apiv1/usuarios/registro)
    - **Método POST (AWS)**: [https://josesanchezrodriguez.es/apiv1/usuarios/registro](https://josesanchezrodriguez.es/apiv1/usuarios/registro)
- **Autenticación** - Login de usuario Recibe los parametros de entrada del Body (email, clave).
    - **Método POST (local)**: [http://localhost:3000/apiv1/usuarios/authenticate](http://localhost:3000/apiv1/usuarios/authenticate)
    - **Método POST (AWS)**: [https://josesanchezrodriguez.es/apiv1/usuarios/authenticate](https://josesanchezrodriguez.es/apiv1/usuarios/authenticate)
- **Lista de anuncios** - Búsqueda de anuncios
    - **Filtros disponibles (paginada, con filtros de búsqueda)**
        * **nombre**: Se filtraran los anuncios por el nombre indicado
        * **venta [ YES | NO ]**: Se filtraran los anuncios en venta si el parámetro es YES o los anuncios en compra si el parámetro es NO
        * **precio**: Se filtraran los anuncios por el precio del mismo. Se podrá filtrar por precio de las siguientes formas:
            * **precioInferior-precioSuperior** (Ej: 0-99): Se mostrarán los anuncios cuyo precio se encuentre dentro del rango establecido 
            * **precioInferior** (Ej: 50): Se mostrarán los anuncios que tengan un precio inferior o igual al indicado
            * **-precioSuperior** (Ej: -50): Se mostrarán los anuncios que tengan un precio superior o igual al indicado
        * **tags**: Se filtraran los anuncios por los tags del mismo. Los tags disponibles son:
            * **work**
            * **lifestyle**
            * **motor**
            * **mobile**
    - **Paginación disponible**
        * **sort**: Se ordenarán los anuncios de forma ascentente por el campo indicado
        * **limit**: Se mostrará el número de anuncios indicados
        * **skip**: Se saltarán tantos anuncios como se indique
        * **fields**: Se mostrarán los campos de los anuncios indicados. Los campos deben separarse con espacios
    - **Método GET (local)**: [http://localhost:3000/apiv1/anuncios?token=](http://localhost:3000/apiv1/anuncios?token=)
    - **Método GET (AWS)**: [https://josesanchezrodriguez.es/apiv1/anuncios?token=](https://josesanchezrodriguez.es/apiv1/anuncios?token=)

## Documentación
  * [Nodepop](https://github.com/JoseJacin/KeepCoding-IVEdicion-KeepcodingMasterBootcamp-JS_Node.js_MongoDB-PracticaNodepop/blob/master/README.md)
  * [Ruta de imágenes de anuncios/bici](https://github.com/JoseJacin/KeepCoding-IVEdicion-KeepcodingMasterBootcamp-JS_Node.js_MongoDB-PracticaNodepop/blob/master/public/images/Anuncios/bici.jpg)

