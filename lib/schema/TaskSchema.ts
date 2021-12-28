import { Schema, model, models, Document } from "mongoose";

export interface TaskProps {
  _id: string;
  title: string;
  userId: string;
  goalId: string;
  statusIndex: number;
}
export interface TaskDoc extends TaskProps, Document {
  _id: string;
}

export const taskSchema = new Schema<TaskProps>({
  title: {
    type: String,
    maxLength: [64, 'Title cannot be more than 64 characters']
  },
  userId: String,
  goalId: String,
  statusIndex: { type: Number, required: [true, 'Status is empty'], default: 0 }
});


export default models.Task || model<TaskProps>('Task', taskSchema);