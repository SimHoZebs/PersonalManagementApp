import { Schema, models, model, Document } from 'mongoose';

export interface UserProps {
  _id: string;
  title: string;
  goalIdArray: string[];
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
  goalIdArray: [String],
  lastViewedGoalId: { type: String }
});

export default models.User || model<UserProps>('User', userSchema);