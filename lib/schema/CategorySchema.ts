import { Document, Schema, models, model } from "mongoose";
import { goalSchema, GoalDoc, GoalProps } from "./GoalSchema";

export interface CategoryBasicProps {
  _id: string;
  name: string;
  userId: string;
}

export interface CategoryProps extends CategoryBasicProps {
  goalArray: GoalProps[];

}

export interface CategorySchema extends CategoryProps, Document {
  _id: string;
  goalArray: GoalDoc[];
}

export const categorySchema = new Schema<CategorySchema>({
  name: {
    type: String,
    required: [true, "Category name is empty"]
  },
  userId: {
    type: String,
    required: [true, "User id is empty"]
  },
  goalArray: [goalSchema]
});

export default models.Category || model("Category", categorySchema);