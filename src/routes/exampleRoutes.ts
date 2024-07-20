import express from "express";
import {
  getAllExamples,
  getExampleById,
  createExample,
  updateExampleById,
  deleteExampleById,
} from "../controllers/exampleController";

const router = express.Router();

// Route to get a list of examples
router.get("/", getAllExamples);

// Route to get a single example by id
router.get("/:id", getExampleById);

// Route to create a new example
router.post("/", createExample);

// Route to update an existing example
router.put("/:id", updateExampleById);

// Route to delete an example
router.delete("/:id", deleteExampleById);

export default router;
