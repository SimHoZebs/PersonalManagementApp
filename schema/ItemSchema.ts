import mongoose from "mongoose";

export interface IItemModel {
  title: string;
  groups: mongoose.Types.ObjectId[];
  _id?: mongoose.Types.ObjectId;
}

const ItemSchema = new mongoose.Schema<IItemModel>({
  title: {
    type: String,
    required: [true, 'Title is empty'],
    maxLength: [64, 'Title cannot be more than 64 characters']
  },
  groups: [mongoose.Types.ObjectId]
})

//mongoose.models.ItemSchema looks for a model called ItemSchema in the mongoDB connection that has been established.

export default mongoose.models.ItemModel || mongoose.model<IItemModel>('ItemModel', ItemSchema)