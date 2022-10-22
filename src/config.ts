const environment = process.env.ENVIRONMENT;

let config = {
  host: 'http://localhost:3000',
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
  },
  emailSettings: {
    type: 'OAuth2',
    user: 'bortnikov.nik22@gmail.com',
    clientId: '',
    clientSecret: '',
    refreshToken: '',
  }
};

switch (environment) {
  case "development":
    // add dev specific settings
    break;
  default:
    break;
}

export { config };
