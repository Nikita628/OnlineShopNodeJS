const environment = process.env.ENVIRONMENT;

let config = {
  db: 'nosql',
  dbSettingsSql: {
    dbHost: "localhost",
    dbPort: 3306,
    dbUser: "admin",
    dbPassword: "admin",
    dbName: "shop_node",
  },
  dbSettingsNoSql: {
    url: 'mongodb://localhost:27017',
  }
};

switch (environment) {
  case "development":
    config = {
      db: 'nosql',
      dbSettingsSql: {
        dbHost: "localhost",
        dbPort: 3306,
        dbUser: "admin",
        dbPassword: "admin",
        dbName: "shop_node",
      },
      dbSettingsNoSql: {
        url: 'mongodb://shop-mongo:27017',
      }
    };
    break;
  default:
    break;
}

export { config };
