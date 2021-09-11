import mongoose, { Document } from "mongoose";

export interface ItemSchema extends Document {
  itemName: string;
  userId: string;
  listId: string;
  labelIdArray: string[] | never[];
}

const schema = new mongoose.Schema<ItemSchema>({
  itemName: {
    type: String,
    required: [true, 'Title is empty'],
    maxLength: [64, 'Title cannot be more than 64 characters']
  },
  userId: String,
  listId: String,
  labelIdArray: [String]
})

//mongoose.models.ItemSchema looks for a model called ItemSchema in the mongoDB connection that has been established.

export default mongoose.models.Item || mongoose.model<ItemSchema>('Item', schema)