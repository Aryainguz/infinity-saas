import mongoose from "mongoose";

export interface IInfinity SAAS extends mongoose.Document {
  name: string;
  age: number;
  email: string;
}

const Infinity SAASSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  inspiration: { type: String, required: true },
  personality: { type: String, required: true },
});

export default mongoose.models.Infinity SAAS || mongoose.model<IInfinity SAAS>("Infinity SAAS", Infinity SAASSchema);