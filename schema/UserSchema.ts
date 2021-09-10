import mongoose, { Document } from 'mongoose'

export interface UserSchema extends Document {
  username: string;
  listIdArray: mongoose.Schema.Types.ObjectId[];
}

const schema = new mongoose.Schema<UserSchema>({
  username: {
    type: String,
    required: true
  },
  listIdArray: [mongoose.Schema.Types.ObjectId]
})

export default mongoose.models.User || mongoose.model<UserSchema>('User', schema)