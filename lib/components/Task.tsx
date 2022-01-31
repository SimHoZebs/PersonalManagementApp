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
  const setMoreContextMenuOptions = useStoreActions(
    (actions) => actions.setMoreContextMenuOptions
  );
  const [task, setTask] = useState(taskArray[props.taskIndex]);
  const textFieldRef = useRef<HTMLInputElement | null>(null);

  const menuOptions = [
    {
      name: "Delete",
      shortcut: "",
      function: () => {
        deleteTask(props.taskIndex);
      },
    },
  ];

  /**
   * automatic taskName textField focus on creation.
   * isNewTask boolean prevents existing tasks from being focused
   */
  useEffect(() => {
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
      className="py-1 px-3 flex items-center justify-between gap-x-3 bg-dark-400 rounded shadow shadow-dark-900"
      onContextMenu={() => {
        setMoreContextMenuOptions(menuOptions);
      }}
    >
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center">
          <TextField
            ref={textFieldRef}
            //Subtract 2 because there's a weird padding on the right of textfield.
            size={task.title.length <= 5 ? 5 : task.title.length - 2}
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
        <div className="flex items-center gap-x-1">
          <StatusButton statusIndex={task.statusIndex} setTask={setTask} />
          <SelectDateButton />
        </div>
      </div>
    </div>
  );
};

export default Task;
