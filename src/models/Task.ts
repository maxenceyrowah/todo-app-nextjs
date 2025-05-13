import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema({
  title: String,
  status: { type: String, default: "pending" },
});

export const Task = models.Task || model("Task", TaskSchema);
