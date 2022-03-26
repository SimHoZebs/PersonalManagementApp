import { WithId } from "mongodb";
import { TaskDoc } from "./task";

export interface UserWithoutTaskArray {
  name: string;
}

export interface UserDoc extends UserWithoutTaskArray {
  taskArray: WithId<TaskDoc>[] | TaskDoc[];
}
