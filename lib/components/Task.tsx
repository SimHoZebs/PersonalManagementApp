import React, { useState, useEffect, useRef } from "react";

//components
import TextField from "./TextField";
import StatusButton from "./StatusButton";
import SelectDateButton from "./SelectDateButton";
import PriorityButton from "./PriorityButton";
import MoreOptionsButton from "./MoreOptionsButton";

//etc
import createTask from "../api/createTask";
import { useStoreActions, useStoreState } from "../globalState";

export interface Props {
  taskIndex: number;
  setCreatingTask: React.Dispatch<React.SetStateAction<boolean>>;
  isNewTask: boolean;
}

/**
 *@note isNewTask may seem unnecessary with creatingTask in Goal component, but it makes sure only last task of array behaves as a new task.
 * This is needed as existing tasks can behave like new tasks if user clicks away while creating new task.
 */
const Task = (props: Props) => {
  const updateTask = useStoreActions((actions) => actions.updateTask);
  const deleteTask = useStoreActions((actions) => actions.deleteTask);
  const taskArray = useStoreState((state) => state.taskArray);
  const setContextMenuOptions = useStoreActions(
    (actions) => actions.setMoreOptions
  );
  const [task, setTask] = useState(taskArray[props.taskIndex]);
  const textFieldRef = useRef<HTMLInputElement | null>(null);

  const menuOptions = [
    {
      option: "Delete",
      function: () => {
        deleteTask(props.taskIndex);
      },
    },
  ];

  useEffect(() => {
    //automatic taskName textField focus on creation.
    //isNewTask boolean prevents existing tasks from being focused
    if (props.isNewTask) {
      textFieldRef.current?.focus();
      createTask(task.userId, task.goalId, task);
      props.setCreatingTask(false);
    }
  }, [props, task]);

  useEffect(() => {
    updateTask({ task, taskIndex: props.taskIndex });
  }, [task, props.taskIndex, updateTask]);

  return (
    <div
      className="p-1 flex items-center justify-between gap-x-3 bg-dark-400 rounded text-gray-200"
      onContextMenu={() => {
        setContextMenuOptions(menuOptions);
      }}
    >
      <StatusButton statusIndex={task.statusIndex} setTask={setTask} />
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center">
          <TextField
            ref={textFieldRef}
            value={task.title}
            onChange={(e) =>
              setTask((prev) =>
                prev ? { ...prev, title: e.target.value } : prev
              )
            }
          />
          <PriorityButton />
          {/**Temp solution for deleting */}
          <MoreOptionsButton options={menuOptions} />
        </div>
        <SelectDateButton />
      </div>
    </div>
  );
};

export default Task;
