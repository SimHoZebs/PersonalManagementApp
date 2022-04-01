import TextField from "../components/TextField";
import { TaskDoc } from "./types";

interface Props {
  task: TaskDoc;
  setTask: React.Dispatch<React.SetStateAction<TaskDoc>>;
  taskCardHidden: boolean;
  setTaskCardHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskCard = (props: Props) => {
  return !props.taskCardHidden ? (
    <div className="flex h-screen w-screen top-0 left-0 absolute items-center justify-center">
      <div
        className="h-screen bg-dark-300 w-screen opacity-25 absolute"
        onClick={() => props.setTaskCardHidden(true)}
      ></div>
      <div className="flex flex-col bg-dark-400 h-3/4 shadow py-4 px-3 shadow-dark-900 w-2/5 z-10 gap-y-1 items-start">
        <TextField
          className="placeholder-true-gray-400 text-4xl hover:bg-dark-400"
          value={props.task.title}
        />
      </div>
    </div>
  ) : (
    <div className="absolute"></div>
  );
};

export default TaskCard;
