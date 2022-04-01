import React, { HTMLAttributes, useState } from "react";
import { useStoreActions, useStoreState } from "../globalState";
import { Status, TaskDoc } from "./types";
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
  const setCreatingTaskViewVisible = useStoreActions(
    (a) => a.setCreateTaskViewVisible
  );

  const [creatingTask, setCreatingTask] = useState(false);

  return (
    <div className="flex flex-col gap-y-2">
      <header className="flex justify-between">
        <h1 className="text-2xl">{props.status}</h1>

        <Button onClick={() => setCreatingTaskViewVisible(true)}>
          Add a task
        </Button>
      </header>

      <div className="border rounded border-dark-100 min-w-360px p-4">
        {narrowType<WithId<TaskDoc>[]>(taskArray) && taskArray.length !== 0 ? (
          taskArray
            .filter((task) => task.status === props.status)
            .map((task, index) => (
              <Task
                task={task}
                key={task._id.toString()}
                taskIndex={index}
                setCreatingTask={setCreatingTask}
                isNewTask={
                  creatingTask && index === taskArray.length - 1 ? true : false
                }
              />
            ))
        ) : (
          <p className="text-center">Inbox zero, hooray!</p>
        )}
      </div>
    </div>
  );
};

export default TaskPanel;
