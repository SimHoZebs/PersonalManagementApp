import mongoose, { Document } from 'mongoose';

export interface UserSchema extends Document {
  title: string;
  goalIdArray: string[];
  selectedGoalId: string;
}

const userModel = new mongoose.Schema<UserSchema>({
  title: {
    type: String,
    required: true
  },
  _id: { type: String, required: true },
  goalIdArray: [String],
  selectedGoalId: { type: String }
});

export default mongoose.models.User || mongoose.model<UserSchema>('User', userModel);