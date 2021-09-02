import mongoose from "mongoose"

export interface GroupSchema {
  title: string;
  itemIdArray: mongoose.Types.ObjectId[]
  _id?: mongoose.Types.ObjectId;
}

const schema = new mongoose.Schema<GroupSchema>({
  title: {
    type: String,
    required: true
  },
  itemIdArray: [mongoose.Types.ObjectId]
})

export default mongoose.models.Group || mongoose.model<GroupSchema>('Group', schema)