import { Document, models, Schema, model } from 'mongoose';
import { taskSchema, TaskDoc, TaskProps } from './TaskSchema';

export interface GoalBasicProps {
  _id: string;
  title: string;
  description: string;
  statusArray: string[];
  statusColorArray: string[];
}
export interface GoalProps extends GoalBasicProps {
  taskArray: TaskProps[];
}

export interface GoalDoc extends GoalProps, Document {
  _id: string;
  taskArray: TaskDoc[];
}

export const goalSchema = new Schema<GoalProps>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  taskArray: {
    type: [taskSchema],
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

export default models.Goal || model<GoalProps>('Goal', goalSchema);