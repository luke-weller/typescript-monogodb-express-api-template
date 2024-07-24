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

// Get all examples from the database
export const getAllExamples = async (_req: Request, res: Response) => {
  try {
    const examples = await ExampleModel.find({});
    res.status(200).send(examples);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get an example by ID from the database
export const getExampleById = async (req: Request, res: Response) => {
  try {
    const example = await ExampleModel.findById(req.params.id);
    if (!example) {
      return res.status(404).send();
    }
    res.send(example);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update an example by ID in the database
export const updateExampleById = async (req: Request, res: Response) => {
  try {
    const example = await ExampleModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!example) {
      return res.status(404).send();
    }
    res.send(example);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete an example by ID  from the database
export const deleteExampleById = async (req: Request, res: Response) => {
  try {
    const example = await ExampleModel.findByIdAndDelete(req.params.id);
    if (!example) {
      return res.status(404).send();
    }
    res.send(example);
  } catch (error) {
    res.status(500).send(error);
  }
};
