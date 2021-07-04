import mongoose from "mongoose";

export interface IItemSchema {
  title: string;
  groups: mongoose.Types.ObjectId[];
  _objectId?: mongoose.Types.ObjectId;
}

const ItemSchema = new mongoose.Schema<IItemSchema>({
  title: {
    type: String,
    required: [true, 'Title is empty'],
    maxLength: [64, 'Title cannot be more than 64 characters']
  },
  group: {
    type: [mongoose.Types.ObjectId],
  }
})

//mongoose.models.ItemSchema looks for a model called ItemSchema in the mongoDB connection that has been established.

export default mongoose.models.ItemSchema || mongoose.model<IItemSchema>('ItemSchema', ItemSchema)