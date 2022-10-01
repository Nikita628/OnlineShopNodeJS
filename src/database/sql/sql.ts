import mysql from 'mysql2';

const mysqlPool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'admin',
    password: 'admin',
    database: 'shop_node',
});

export const dbPool = mysqlPool.promise();