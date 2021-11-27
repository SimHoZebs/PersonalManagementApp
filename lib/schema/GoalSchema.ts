import { Schema, Document, model, models } from "mongoose";
import { ItemModel, ItemSchema } from "./ItemSchema";

export interface GoalSchema extends Document {
  name: string;
  ItemArray: ItemSchema[];
}
export const GoalModel = new Schema<GoalSchema>({
  name: {
    type: String,
    required: [true, "Goal name is empty"]
  },
  ItemArray: [ItemModel]
});

export default models.Goal || model<GoalSchema>("Goal", GoalModel);