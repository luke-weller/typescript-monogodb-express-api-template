import { Request, Response } from "express";
import { ExampleModel } from "../models/exampleModel";

// Update an example by ID in the database
export const updateExampleById = async (req: Request, res: Response) => {
  try {
    const example = await ExampleModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    // Check if the ID is in a valid format
    const id = req.params.id;
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).send("Invalid ID format");
    }

    // Check if the example is found
    if (!example) {
      return res.status(404).send("Example not found");
    }
    res.send(example);
  } catch (error) {
    res.status(400).send(error);
  }
};
