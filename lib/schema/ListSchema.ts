import mongoose, { Document } from 'mongoose';
import { ItemModel, ItemSchema } from './ItemSchema';

export interface ListSchema extends Document {
  title: string;
  description: string;
  itemArray: ItemSchema[];
  statusArray: ["planned", "ongoing", "completed"];
  statusColorArray: ["#2563eb", "#9333ea", "#65a30d"];
}

const listModel = new mongoose.Schema<ListSchema>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  itemArray: { type: [ItemModel], default: [] }
});

export default mongoose.models.List || mongoose.model<ListSchema>('List', listModel);