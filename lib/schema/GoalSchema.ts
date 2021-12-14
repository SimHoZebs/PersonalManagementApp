import mongoose, { Document } from 'mongoose';
import { taskModel, TaskSchema } from './TaskSchema';

export interface GoalSchema extends Document {
  title: string;
  description: string;
  taskArray: TaskSchema[];
  statusArray: ["planned", "ongoing", "completed"];
  statusColorArray: ["#2563eb", "#9333ea", "#65a30d"];
}

export const goalModel = new mongoose.Schema<GoalSchema>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  taskArray: { type: [taskModel], default: [] }
});

export default mongoose.models.Goal || mongoose.model<GoalSchema>('Goal', goalModel);