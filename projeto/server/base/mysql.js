const mysql = require('mysql2/promise');

const poolConfig = {
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'centauri'
}

const pool = mysql.createPool(poolConfig);

pool.getConnection()
    .then(connection => {
        console.log('Connected to MySQL!');
        connection.release();
    })
    .catch(err => {
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('Database connection was closed.');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('Database has too many connections.');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('Database connection was refused.');
        }
    });
console.log('Connected to MySQL!');

module.exports = pool;