import mongoose, { Document } from 'mongoose';

export interface ListSchema extends Document {
  listName: string;
  description: string;
  itemIdArray: string[];
}

const schema = new mongoose.Schema<ListSchema>({
  listName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  itemIdArray: [String],
})

export default mongoose.models.List || mongoose.model<ListSchema>('List', schema)