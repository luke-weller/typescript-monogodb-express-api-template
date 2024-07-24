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

  // Set up the express app
  private setConfig() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
  // Set up the MongoDB database
  private setMongoConfig() {
    const allowedEnvironments = ["DEV", "TEST", "PROD", "JEST"];
    const currentEnvironment = process.env.NODE_ENV;

    if (allowedEnvironments.includes(currentEnvironment as string)) {
      // The JEST test environment is handled in package.json test script
      if (currentEnvironment !== "JEST") {
        ConnectDB.getInstance(); // Connect to the database
      }
    } else {
      throw new Error(
        "Invalid NODE_ENV value. Only DEV, TEST, PROD, and JEST are allowed."
      );
    }
  }

  // Set up the routes
  private setRoutes() {
    this.app.use("/api/example", exampleRoutes);
    // ---------------------
    // Add more routes here
    // ---------------------
  }
}

export default new App().app;
