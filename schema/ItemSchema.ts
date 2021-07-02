import mongoose from "mongoose";

export interface IItemSchema {
  title: string;
}

const ItemSchema = new mongoose.Schema<IItemSchema>({
  title: {
    type: String,
    required: [true, 'Title is empty'],
    unique: true,
    maxLength: [64, 'Title cannot be more than 64 characters']
  },
})

//mongoose.models.ItemSchema looks for a model called ItemSchema in the mongoDB connection that has been established.

export default mongoose.models.ItemSchema || mongoose.model<IItemSchema>('ItemSchema', ItemSchema)