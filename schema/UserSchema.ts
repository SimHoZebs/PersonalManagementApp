import mongoose from 'mongoose'

export interface UserSchema {
  username: string;
  listId?: mongoose.Schema.Types.ObjectId[];
}

const schema = new mongoose.Schema<UserSchema>({
  username: {
    type: String,
    required: true
  },
  listId: [mongoose.Schema.Types.ObjectId]
})

export default mongoose.models.User || mongoose.model<UserSchema>('User', schema)