import { Schema, model, Document } from "mongoose";

interface IExample extends Document {
  name: string;
  description?: string;
  createdAt: Date;
}

const exampleSchema = new Schema<IExample>({
  name: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const ExampleModel = model<IExample>("Example", exampleSchema);

export { ExampleModel, IExample };
