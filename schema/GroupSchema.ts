import mongoose from "mongoose"

export interface GroupSchema {
  title: string;
  itemIds: mongoose.Schema.Types.ObjectId[]
}

const schema = new mongoose.Schema<GroupSchema>({
  title: {
    type: String,
    required: true
  },
  itemIds: [mongoose.Schema.Types.ObjectId]
})

export default mongoose.models.Group || mongoose.model<GroupSchema>('Group', schema)