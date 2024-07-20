import express, { Application } from "express";
import mongoose from "mongoose";
import exampleRoutes from "./routes/exampleRoutes";

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
    mongoose.Promise = global.Promise;
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      console.error("MongoDB URI is not defined in .env file");
      process.exit(1);
    }

    mongoose
      .connect(mongoUri)
      .then(() => console.log("MongoDB connected"))
      .catch((err) => console.error(err));
  }

  private setRoutes() {
    this.app.use("/api/examples", exampleRoutes);
  }
}

export default new App().app;
