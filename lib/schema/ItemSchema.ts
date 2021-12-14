import mongoose, { Document } from "mongoose";
import { labelModel, LabelSchema } from "./LabelSchema";

export interface ItemSchema extends Document {
  title: string;
  userId: string;
  listId: string;
}

export const ItemModel = new mongoose.Schema<ItemSchema>({
  title: {
    type: String,
    required: [true, 'Title is empty'],
    maxLength: [64, 'Title cannot be more than 64 characters']
  },
  userId: String,
  listId: String,
});


export default mongoose.models.Item || mongoose.model<ItemSchema>('Item', ItemModel);