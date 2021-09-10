import mongoose, { Document } from 'mongoose';

export interface ListSchema extends Document {
  listName: string;
  description: string;
  itemIdArray: mongoose.Schema.Types.ObjectId[];
}

const schema = new mongoose.Schema<ListSchema>({
  listName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  itemIdArray: [mongoose.Schema.Types.ObjectId],
})

export default mongoose.models.List || mongoose.model<ListSchema>('List', schema)