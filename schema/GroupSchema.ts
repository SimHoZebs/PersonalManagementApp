import mongoose from "mongoose"

export interface IGroupSchema {
  groupName: string;
  itemId: mongoose.Schema.Types.ObjectId[];
}

const GroupSchema = new mongoose.Schema<IGroupSchema>({
  groupName: {
    type: String,
    required: true
  },
  itemId: {
    type: [mongoose.Schema.Types.ObjectId]
  }
})

export default mongoose.models.GroupSchema || mongoose.model<IGroupSchema>('GroupSchema', GroupSchema)