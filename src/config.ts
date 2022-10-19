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
    clientId: '228694978036-3pp7qa9eskuvoo484miv7sl3p1gqokkr.apps.googleusercontent.com',
    clientSecret: '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',
    refreshToken: '1//049lmn3uwKIpMCgYIARAAGAQSNwF-L9IrNYBeQ28tNFuTQfqeSbIhABJqL_XEPiqxR_q3N5e_CpmJefDDipJ7Zfe424Sdk_hZTkI',
  }
};

switch (environment) {
  case "development":
    config = {
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
        url: 'mongodb://shop-mongo:27017',
      },
      emailSettings: {
        type: 'OAuth2',
        user: 'bortnikov.nik22@gmail.com',
        clientId: '228694978036-3pp7qa9eskuvoo484miv7sl3p1gqokkr.apps.googleusercontent.com',
        clientSecret: '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',
        refreshToken: '1//049lmn3uwKIpMCgYIARAAGAQSNwF-L9IrNYBeQ28tNFuTQfqeSbIhABJqL_XEPiqxR_q3N5e_CpmJefDDipJ7Zfe424Sdk_hZTkI',
      }
    };
    break;
  default:
    break;
}

export { config };
