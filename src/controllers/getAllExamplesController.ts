import { Request, Response } from "express";
import { ExampleModel } from "../models/exampleModel";

// Get all examples from the database
export const getAllExamples = async (_req: Request, res: Response) => {
  try {
    const examples = await ExampleModel.find({});
    res.status(200).send(examples);
  } catch (error) {
    res.status(500).send(error);
  }
};
