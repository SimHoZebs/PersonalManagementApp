import { Document, Schema, models, model } from "mongoose";
import { GoalModel, GoalSchema } from "./GoalSchema";

export interface CategorySchema extends Document {
  name: string;
  userId: string;
  goalArray: GoalSchema[];
}

export const CategoryModel = new Schema<CategorySchema>({
  name: {
    type: String,
    required: [true, "Category name is empty"]
  },
  userId: {
    type: String,
    required: [true, "User id is empty"]
  },
  goalArray: [GoalModel]
});

export default models.Category || model("Category", CategoryModel);