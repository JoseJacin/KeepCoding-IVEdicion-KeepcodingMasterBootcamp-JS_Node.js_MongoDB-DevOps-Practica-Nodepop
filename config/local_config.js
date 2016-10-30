'use strict';

module.exports = {
    database: 'mongodb://localhost:27017/nodepopdb',
    jwt: {
        secret : 'nodemon1234@',
        expires: '2 days'
    },
    tags: ['work', 'lifestyle', 'motor', 'mobile'],
    languages: ['en', 'es'],
    DEBUG_TRACE : true
};