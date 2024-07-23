import express, { Application } from "express";
import exampleRoutes from "./routes/exampleRoutes";
import ConnectDB from "./config/database";

require("dotenv").config();

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.setConfig();
    this.setMongoConfig();
    this.setRoutes();
  }

  private setConfig() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private setMongoConfig() {
    if (
      process.env.NODE_ENV === "DEV" ||
      process.env.NODE_ENV === "PRODUCTION"
    ) {
      ConnectDB.getInstance();
    }
  }

  private setRoutes() {
    this.app.use("/api/examples", exampleRoutes);
  }
}

export default new App().app;
