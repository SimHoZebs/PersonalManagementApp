import mongoose from "mongoose"

export interface IGroupSchema {
  title: string;
  itemId: mongoose.Schema.Types.ObjectId[];
}

export const GroupSchema = new mongoose.Schema<IGroupSchema>({
  title: {
    type: String,
    required: true
  },
  itemId: {
    type: [mongoose.Schema.Types.ObjectId]
  }
})

export default mongoose.models.GroupSchema || mongoose.model<IGroupSchema>('GroupSchema', GroupSchema)