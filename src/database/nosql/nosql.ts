import mongoose from "mongoose";
import { config } from "../../config";

export async function connectMongo() {
  try {
    await mongoose.connect(config.dbSettingsNoSql.url);
    console.log("\x1b[32m%s\x1b[0m", "mongo db connected");
  } catch (error) {
    console.log("\x1b[31m", "mongo connection error: ", error);
  }
}
