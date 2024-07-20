import express, { Application } from "express";
import exampleRoutes from "./routes/exampleRoutes";
import { connectDB } from "./config/database"; // Import the connectToDatabase function

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
    this.app.use(express.json()); // Allows us to receive requests with data in json format
    this.app.use(express.urlencoded({ extended: true })); // Allows us to receive requests with data in urlencoded format
  }

  private setMongoConfig() {
    connectDB();
  }

  private setRoutes() {
    this.app.use("/api/examples", exampleRoutes);
  }
}

export default new App().app;
