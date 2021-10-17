import mongoose, { Document } from 'mongoose';
import { ItemModel, ItemSchema } from './ItemSchema';

export interface ListSchema extends Document {
  listName: string;
  description: string;
  itemArray: ItemSchema[];
}

const listModel = new mongoose.Schema<ListSchema>({
  listName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  itemArray: { type: [ItemModel], default: [] }
});

export default mongoose.models.List || mongoose.model<ListSchema>('List', listModel);