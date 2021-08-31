import mongoose from "mongoose"

export interface IGroupSchema {
  title: { type: string };
  itemId: mongoose.Schema.Types.ObjectId[]
}

export const GroupSchema = new mongoose.Schema<IGroupSchema>({
  title: {
    type: String,
    required: true
  },
  itemId: [mongoose.Schema.Types.ObjectId]
})

export default mongoose.models.GroupSchema || mongoose.model<IGroupSchema>('GroupSchema', GroupSchema)