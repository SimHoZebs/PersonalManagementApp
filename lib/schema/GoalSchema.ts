import mongoose, { Document } from 'mongoose';
import { taskModel, TaskSchema } from './TaskSchema';

export interface GoalSchema extends Document {
  title: string;
  description: string;
  taskArray: TaskSchema[];
  statusArray: string[];
  statusColorArray: string[];
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
  taskArray: {
    type: [taskModel],
    default: []
  },
  statusArray: {
    type: [String],
    default: ["planned", "ongoing", "completed"]
  },
  statusColorArray: {
    type: [String],
    default: ["bg-blue-600", "bg-purple-600", "bg-green-600"]
  },
});

export default mongoose.models.Goal || mongoose.model<GoalSchema>('Goal', goalModel);