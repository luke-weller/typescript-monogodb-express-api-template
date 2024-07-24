import { Request, Response } from "express";
import { ExampleModel } from "../models/exampleModel";

// Create an example in the database
export const createExample = async (req: Request, res: Response) => {
  try {
    if (!req.body.name && !req.body.description) {
      return res.status(400).send({
        error: "Example name and description is required in request body.",
      });
    }

    if (!req.body.name) {
      return res.status(400).send({ error: "Example name is required." });
    }
    if (!req.body.description) {
      return res
        .status(400)
        .send({ error: "Example description is required." });
    }

    const example = new ExampleModel({
      ...req.body,
      createdAt: new Date(),
    });
    await example.save();
    res.status(201).send(example);
  } catch (error) {
    res.status(400).send(error);
  }
};
