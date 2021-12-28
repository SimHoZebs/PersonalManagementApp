import React, { useState, useEffect, useRef } from "react";

//components
import TextField from "./TextField";
import StatusButton from "./StatusButton";
import SelectDateButton from "./SelectDateButton";
import PriorityButton from "./PriorityButton";
import MoreOptionsButton from "./MoreOptionsButton";

//etc
import createTask from "../api/createTask";
import deleteTask from "../api/deleteTask";
import { TaskSchema } from "../schema/TaskSchema";
import updateTask from "../api/updateTask";

export interface Props {
  task: TaskSchema;
  taskIndex: number;
  statusColorArray: string[];
  setTaskArray: React.Dispatch<React.SetStateAction<TaskSchema[]>>;
  setCreatingTask: React.Dispatch<React.SetStateAction<boolean>>;
  isNewTask: boolean;
}

/**
 *@note isNewTask may seem unnecessary with creatingTask in Goal component, but it makes sure only last task of array behaves as a new task.
 * This is needed as existing tasks can behave like new tasks if user clicks away while creating new task.
 */
const Task = (props: Props) => {
  const { isNewTask, setCreatingTask } = props;
  const [task, setTask] = useState(props.task);
  const [taskLoaded, setTaskLoaded] = useState(false);
  const textFieldRef = useRef<HTMLInputElement | null>(null);

  async function deleteTaskBtn() {
    const deleteTaskRes = await deleteTask(
      task.userId,
      task.goalId,
      props.task._id
    );
    if (!(deleteTaskRes instanceof Error)) {
      props.setTaskArray(deleteTaskRes);
    }
  }

  useEffect(() => {
    //automatic taskName textField focus on creation.
    //isNewTask boolean prevents existing tasks from being focused
    if (isNewTask) {
      textFieldRef.current?.focus();
      createTask(task.userId, task.goalId, task);
      setCreatingTask(false);
    }

    if (task && !taskLoaded) {
      setTaskLoaded(true);
    } else {
      console.log("updating Task");
      updateTask(task.userId, task.goalId, task._id, task);
    }
  }, [isNewTask, setCreatingTask, task, taskLoaded]);

  return (
    <div className="p-1 flex items-center justify-between gap-x-3 bg-dark-400 rounded text-gray-200">
      <StatusButton
        statusColorArray={props.statusColorArray}
        statusIndex={task.statusIndex}
        setTask={setTask}
      />
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center">
          <TextField
            ref={textFieldRef}
            value={task.title}
            onChange={(e) =>
              setTask((prev) =>
                prev ? ({ ...prev, title: e.target.value } as TaskSchema) : prev
              )
            }
          />
          <PriorityButton />
          {/**Temp solution for deleting */}
          <MoreOptionsButton onClick={deleteTaskBtn} />
        </div>
        <SelectDateButton />
      </div>
    </div>
  );
};

export default Task;
