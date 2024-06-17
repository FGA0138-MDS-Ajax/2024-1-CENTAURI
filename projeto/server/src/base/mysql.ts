import mysql from 'mysql2/promise';

const poolConfig = {
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'centauri'
}

const pool = mysql.createPool(poolConfig);

pool.getConnection()
    .then(connection => {
        console.log('Connected to MySQL');
        connection.release();
    })
    .catch(error => {
        console.error('Error connecting to MySQL');
        console.error(error);
    });
console.log("Connected to MySQL");

export const mysqlConn = pool;