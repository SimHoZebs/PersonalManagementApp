import mongoose from "mongoose";

export interface ItemSchema {
  title: string;
  labelIdArray: mongoose.Schema.Types.ObjectId[];
  _id?: mongoose.Schema.Types.ObjectId;
}

const schema = new mongoose.Schema<ItemSchema>({
  title: {
    type: String,
    required: [true, 'Title is empty'],
    maxLength: [64, 'Title cannot be more than 64 characters']
  },
  labelIdArray: [mongoose.Schema.Types.ObjectId]
})

//mongoose.models.ItemSchema looks for a model called ItemSchema in the mongoDB connection that has been established.

export default mongoose.models.Item || mongoose.model<ItemSchema>('Item', schema)