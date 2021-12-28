import { Document, models, Schema, model } from 'mongoose';
import { taskModel, TaskSchema } from './TaskSchema';

export interface GoalProps extends Document {
  title: string;
  description: string;
  statusArray: string[];
  statusColorArray: string[];
}

export interface GoalSchema extends GoalProps {
  taskArray: TaskSchema[];
}

export const goalModel = new Schema<GoalSchema>({
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

export default models.Goal || model<GoalSchema>('Goal', goalModel);