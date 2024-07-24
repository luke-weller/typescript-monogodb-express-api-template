import { Request, Response } from "express";
import { ExampleModel } from "../models/exampleModel";

// Get an example by ID from the database
export const getExampleById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    // Check if ID is valid format for MongoDB: 24 hex characters
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).send("Invalid ID format");
    }

    if (!id) {
      return res.status(400).send("ID is required");
    }

    const example = await ExampleModel.findById(id);
    if (!example) {
      return res.status(404).send("Example not found");
    }
    res.send(example);
  } catch (error) {
    res.status(500).send(error);
  }
};
