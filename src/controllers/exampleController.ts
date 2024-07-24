import { Request, Response } from "express";
import { ExampleModel } from "../models/exampleModel";

// Create a new example
export const createExample = async (req: Request, res: Response) => {
  try {
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

// Get all examples
export const getAllExamples = async (_req: Request, res: Response) => {
  try {
    const examples = await ExampleModel.find({});
    res.status(200).send(examples);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get an example by ID
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

// Update an example by ID
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

// Delete an example by ID
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
