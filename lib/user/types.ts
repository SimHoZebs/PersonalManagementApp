import { WithId } from "mongodb";
import { TaskDoc } from "../task/types";

export interface UserWithoutTaskArray {
  name: string;
}

export interface UserDoc extends UserWithoutTaskArray {
  taskArray: WithId<TaskDoc>[] | TaskDoc[];
}
