import mongoose, { Document } from "mongoose";
import { labelModel, LabelSchema } from "./LabelSchema";

export interface ItemSchema extends Document {
  itemName: string;
  userId: string;
  listId: string;
  labelArray: LabelSchema[];
}

export const ItemModel = new mongoose.Schema<ItemSchema>({
  itemName: {
    type: String,
    required: [true, 'Title is empty'],
    maxLength: [64, 'Title cannot be more than 64 characters']
  },
  userId: String,
  listId: String,
  labelArray: [labelModel]
});


export default mongoose.models.Item || mongoose.model<ItemSchema>('Item', ItemModel);