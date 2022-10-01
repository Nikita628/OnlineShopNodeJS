import mysql from 'mysql2';
import { config } from '../../config';

const mysqlPool = mysql.createPool({
    host: config.dbHost,
    port: config.dbPort,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
});

export const dbPool = mysqlPool.promise();