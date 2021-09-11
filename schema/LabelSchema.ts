import mongoose, { Document } from "mongoose"

export interface LabelSchema extends Document {
  title: string;
  itemIdArray: string[]
}

const schema = new mongoose.Schema<LabelSchema>({
  title: {
    type: String,
    required: true
  },
  itemIdArray: [String]
})

export default mongoose.models.Label || mongoose.model<LabelSchema>('Label', schema)