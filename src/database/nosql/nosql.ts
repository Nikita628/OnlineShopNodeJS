import { Db, MongoClient } from "mongodb";
import { config } from "../../config";

let db: Db;

export function connectMongo() {
  MongoClient.connect(config.dbSettingsNoSql.url)
    .then((client) => {
        console.log("\x1b[32m%s\x1b[0m", "mongo db connected");
        db = client.db('shop_node');
    })
    .catch((error) => console.log('\x1b[31m', "mongo connection error: ", error));
}

export { db };