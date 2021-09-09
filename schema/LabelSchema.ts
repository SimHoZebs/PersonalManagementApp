import mongoose from "mongoose"

export interface LabelSchema {
  title: string;
  itemIdArray: mongoose.Types.ObjectId[]
  _id?: mongoose.Schema.Types.ObjectId;
}

const schema = new mongoose.Schema<LabelSchema>({
  title: {
    type: String,
    required: true
  },
  itemIdArray: [mongoose.Schema.Types.ObjectId]
})

export default mongoose.models.Label || mongoose.model<LabelSchema>('Label', schema)