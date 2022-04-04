import React from "react";
import { useStoreActions } from "../globalState";
import { Status, TaskDoc } from "./types";
import Button from "../components/Button";
import Task from "./Task";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  userId: string;
  status: Status;
  taskArray: TaskDoc[];
}

const TaskPanel = (props: Props) => {
  const setCreateTaskViewSetting = useStoreActions(
    (a) => a.setCreateTaskViewSetting
  );

  return (
    <div className="flex flex-col gap-y-2">
      <header className="flex justify-between">
        <h1 className="text-2xl">{props.status}</h1>

        <Button
          onClick={() =>
            setCreateTaskViewSetting({ visible: true, status: props.status })
          }
        >
          Add a task
        </Button>
      </header>

      <div className="border rounded flex flex-col border-dark-100 min-w-360px p-4 gap-y-2">
        {props.taskArray && props.taskArray.length !== 0 ? (
          props.taskArray
            .filter((task) => task.status === props.status)
            .map((task, index) => (
              <Task task={task} key={index} taskIndex={index} />
            ))
        ) : (
          <p className="text-center">Inbox zero, hooray!</p>
        )}
      </div>
    </div>
  );
};

export default TaskPanel;
