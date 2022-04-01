import { TaskDoc } from "./types";

const newTaskDefault: TaskDoc = {
  title: "",
  status: "Planned",
  duration: "< 30 mins",
  startDate: "",
  dueDate: "",
  subTasks: [],
};
export default newTaskDefault;