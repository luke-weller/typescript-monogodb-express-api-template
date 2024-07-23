import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

class ConnectDB {
  private static _database: ConnectDB;

  private constructor() {
    const dbUrl = process.env.MONGO_URI;

    if (dbUrl) {
      mongoose
        .connect(dbUrl)
        .then(() => console.log("Connected with database"))
        .catch(() => console.log("Not connected with database"));
    }
  }

  static getInstance() {
    if (!this._database) {
      this._database = new ConnectDB();
    }
    return this._database;
  }
}

export default ConnectDB;
