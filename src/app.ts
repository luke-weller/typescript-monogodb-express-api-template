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
    if (process.env.NODE_ENV === "DEV" || process.env.NODE_ENV === "PROD") {
      ConnectDB.getInstance();
    } else {
      throw new Error("Invalid NODE_ENV value. Only DEV and PROD are allowed.");
    }
  }

  private setRoutes() {
    this.app.use("/api/example", exampleRoutes);
  }
}

export default new App().app;
