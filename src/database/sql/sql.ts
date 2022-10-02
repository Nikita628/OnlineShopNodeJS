import sequelize from 'sequelize';
import { config } from '../../config';

const db = new sequelize.Sequelize({
    host: config.dbHost,
    port: config.dbPort,
    username: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    dialect: 'mysql',
});

export { db };