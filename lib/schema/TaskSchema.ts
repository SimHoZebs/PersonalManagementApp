import mongoose, { Document } from "mongoose";

export interface TaskSchema extends Document {
  title: string;
  userId: string;
  goalId: string;
  statusIndex: number;
}

export const taskModel = new mongoose.Schema<TaskSchema>({
  title: {
    type: String,
    required: [true, 'Title is empty'],
    maxLength: [64, 'Title cannot be more than 64 characters']
  },
  userId: String,
  goalId: String,
  statusIndex: { type: Number, required: [true, 'Status is empty'], default: 0 }
});


export default mongoose.models.Task || mongoose.model<TaskSchema>('Task', taskModel);