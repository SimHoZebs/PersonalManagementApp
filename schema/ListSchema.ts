import mongoose from 'mongoose';

export interface ListSchema {
  title: string;
  description: string;
  itemIdArray: mongoose.Schema.Types.ObjectId[];
}

const schema = new mongoose.Schema<ListSchema>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  itemIdArray: [mongoose.Schema.Types.ObjectId],
})

export default mongoose.models.List || mongoose.model<ListSchema>('List', schema)