const environment = process.env.ENVIRONMENT;

let config = {
  dbHost: "localhost",
  dbPort: 3306,
  dbUser: "admin",
  dbPassword: "admin",
  dbName: "shop_node",
};

switch (environment) {
  case "development":
    config = {
      dbHost: "localhost",
      dbPort: 3306,
      dbUser: "admin",
      dbPassword: "admin",
      dbName: "shop_node",
    };
    break;
  default:
    break;
}

export { config };
