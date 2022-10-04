import sequelize from 'sequelize';
import { config } from '../../config';

const db = new sequelize.Sequelize({
    host: config.dbSettingsSql.dbHost,
    port: config.dbSettingsSql.dbPort,
    username: config.dbSettingsSql.dbUser,
    password: config.dbSettingsSql.dbPassword,
    database: config.dbSettingsSql.dbName,
    dialect: 'mysql',
});

export { db };