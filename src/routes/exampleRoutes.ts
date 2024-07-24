import express from "express";
import { deleteExampleById } from "../controllers/deleteExampleByIdController";
import { getAllExamples } from "../controllers/getAllExamplesController";
import { getExampleById } from "../controllers/getExampleByIdController";
import { createExample } from "../controllers/createExampleController";
import { updateExampleById } from "../controllers/updateExampleByIdController";

const exampleRouter = express.Router();

// Route to get a list of examples
exampleRouter.get("/", getAllExamples);

// Route to get a single example by id
exampleRouter.get("/:id", getExampleById);

// Route to create a new example
exampleRouter.post("/", createExample);

// Route to update an existing example
exampleRouter.put("/:id", updateExampleById);

// Route to delete an example
exampleRouter.delete("/:id", deleteExampleById);

export default exampleRouter;
