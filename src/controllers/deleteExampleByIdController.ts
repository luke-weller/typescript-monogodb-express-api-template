import { Request, Response } from "express";
import { ExampleModel } from "../models/exampleModel";

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
