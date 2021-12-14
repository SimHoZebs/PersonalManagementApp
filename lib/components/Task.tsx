import { useState, useEffect, useRef } from "react";

//components
import CustomTextField from "./CustomTextField";
import StatusButton from "./StatusButton";
import SelectDateButton from "./SelectDateButton";
import PriorityButton from "./PriorityButton";
import MoreOptionsButton from "./MoreOptionsButton";

//etc
import createTask from "../api/createTask";
import deleteTask from "../api/deleteTask";
import updateTask from "../api/updateTask";
import { TaskSchema } from "../schema/TaskSchema";

export interface Props {
  task: TaskSchema;
  taskIndex: number;
  setTaskArray: React.Dispatch<React.SetStateAction<TaskSchema[]>>;
  setCreatingTask: React.Dispatch<React.SetStateAction<boolean>>;
  isNewTask: boolean;
  goalId: string;
}

/**
 *@note isNewTask may seem unnecessary with creatingTask in Goal component, but it makes sure only last task of array behaves as a new task.
 * This is needed as existing tasks can behave like new tasks if user clicks away while creating new task.
 */
const Task = (props: Props) => {
  const task = props.task;
  const [taskTitle, setTaskTitle] = useState(task.title);
  const textFieldRef = useRef<HTMLInputElement | null>(null);

  async function onBlur() {
    props.setCreatingTask((prev) => false);

    if (taskTitle === "") {
      //If task title is empty, do not save the task
      if (props.isNewTask) {
        props.setTaskArray((prev) =>
          prev.filter((task, index) => index !== props.taskIndex)
        );
      } else {
        const updatedTaskArray = await deleteTask(
          task.userId,
          props.goalId,
          props.taskIndex
        );
        if (!(updatedTaskArray instanceof Error)) {
          props.setTaskArray(updatedTaskArray);
        }
      }
    } else if (taskTitle !== task.title) {
      //if task title isn't empty and diff from the old one, save the task
      const updatedTaskArray = props.isNewTask
        ? await createTask(task.userId, props.goalId, taskTitle)
        : ((await updateTask(
            task.userId,
            props.goalId,
            props.taskIndex,
            taskTitle
          )) as TaskSchema[] | Error);
      if (!(updatedTaskArray instanceof Error)) {
        props.setTaskArray(updatedTaskArray);
      }
    }
  }

  async function deleteTaskBtn() {
    const deleteTaskRes = await deleteTask(
      task.userId,
      props.goalId,
      props.taskIndex
    );
    if (!(deleteTaskRes instanceof Error)) {
      props.setTaskArray(deleteTaskRes);
    }
  }

  /**
   * When user clicks away from task textField.
   * Creates new task if it's new, or updates existing task.
   * Add or update task to goal.
   */

  //automatic taskName textField focus on creation.
  //isNewTask boolean prevents existing tasks from being focused
  useEffect(() => {
    if (props.isNewTask) {
      textFieldRef.current?.focus();
    }
  }, [props.isNewTask]);

  return (
    <div className="p-2 flex items-center justify-between gap-x-3 bg-dark-400 rounded text-gray-200">
      <StatusButton />
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center">
          <CustomTextField
            ref={textFieldRef}
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            onBlur={onBlur}
          />
          <PriorityButton />
          <MoreOptionsButton />
        </div>
        <SelectDateButton />
      </div>
    </div>
  );
};

export default Task;
