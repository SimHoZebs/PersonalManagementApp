import { Document, Schema, models, model } from "mongoose";
import { goalModel, GoalSchema } from "./GoalSchema";

export interface CategorySchema extends Document {
  name: string;
  userId: string;
  goalArray: GoalSchema[];
}

export const categoryModel = new Schema<CategorySchema>({
  name: {
    type: String,
    required: [true, "Category name is empty"]
  },
  userId: {
    type: String,
    required: [true, "User id is empty"]
  },
  goalArray: [goalModel]
});

export default models.Category || model("Category", categoryModel);