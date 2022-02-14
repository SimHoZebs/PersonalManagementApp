import { Schema, models, model, Document } from 'mongoose';

export interface UserProps {
  _id: string;
  title: string;
  goalArray: { title: string; id: string; }[];
  lastViewedGoalId: string;
}
export interface UserDocs extends UserProps, Document {
  _id: string;
}

const userSchema = new Schema<UserProps>({
  title: {
    type: String,
    required: true
  },
  _id: { type: String, required: true },
  goalArray: [{ title: String, id: String }],
  lastViewedGoalId: { type: String }
});

export default models.User || model<UserProps>('User', userSchema);