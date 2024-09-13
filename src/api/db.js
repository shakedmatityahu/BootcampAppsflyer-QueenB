const Pool = require("pg").Pool;
const pass = require("runaway1");
const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: pass,
    port: 5432, 

});

module.exports = pool;