import mongoose, { Document } from 'mongoose'

export interface UserSchema extends Document {
  username: string;
  listIdArray: string[];
}

const schema = new mongoose.Schema<UserSchema>({
  username: {
    type: String,
    required: true
  },
  listIdArray: [String]
})

export default mongoose.models.User || mongoose.model<UserSchema>('User', schema)