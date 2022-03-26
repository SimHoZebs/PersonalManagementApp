import React, { HTMLAttributes, useState } from "react";
import { useStoreActions, useStoreState } from "../globalState";
import { Status, TaskDoc } from "../types/task";
import Button from "../components/Button";
import Task from "./Task";
import { WithId } from "mongodb";
import narrowType from "../narrowType";

interface Props extends HTMLAttributes<HTMLDivElement> {
  userId: string;
  status: Status;
}

const TaskPanel = (props: Props) => {
  const taskArray = useStoreState((state) => state.taskArray);
  const setTaskArray = useStoreActions((actions) => actions.setTaskArray);
  const user = useStoreState((state) => state.user);

  const [creatingTask, setCreatingTask] = useState(false);

  function createTaskBtn(status: Status) {
    //Type assertion as TaskProps requires _id
    const newTask = {
      title: "",
      userId: props.userId,
      status,
    };

    setTaskArray([...taskArray, newTask]);
    setCreatingTask(true);
  }

  return (
    <div className="flex flex-col gap-y-2">
      <header>{props.status}</header>
      <div className="border-dark-100 min-w-360px rounded border p-4">
        {narrowType<WithId<TaskDoc>[]>(taskArray) && taskArray.length !== 0 ? (
          taskArray
            .filter((task) => task.status === props.status)
            .map((task, index) => (
              <Task
                key={task._id.toString()}
                taskIndex={index}
                setCreatingTask={setCreatingTask}
                isNewTask={
                  creatingTask && index === taskArray.length - 1 ? true : false
                }
              />
            ))
        ) : (
          <p>There is no task in the goal! Start by adding one!</p>
        )}

        <Button onClick={() => createTaskBtn(props.status)}>Add a task</Button>
      </div>
    </div>
  );
};

export default TaskPanel;
