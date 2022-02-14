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
import TaskCard from "./TaskCard";

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
  const updateTask = useStoreActions((a) => a.updateTask);
  const deleteTask = useStoreActions((a) => a.deleteTask);
  const taskArray = useStoreState((s) => s.taskArray);
  const setMoreContextMenuOptions = useStoreActions(
    (a) => a.setMoreContextMenuOptions
  );
  const [task, setTask] = useState(taskArray[props.taskIndex]);
  const textFieldRef = useRef<HTMLInputElement | null>(null);
  const setTaskCardHidden = useStoreActions((a) => a.setTaskCardHidden);

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
    updateTask({ task: task, taskIndex: props.taskIndex });
  }, [task, props.taskIndex, updateTask]);

  return (
    <>
      <TaskCard task={task} setTask={setTask} />

      <div
        className="bg-dark-400 shadow-dark-900 flex items-center justify-between gap-x-3 rounded py-1 px-3 shadow"
        onContextMenu={() => {
          setMoreContextMenuOptions(menuOptions);
        }}
        onClick={() => {
          setTaskCardHidden(false);
        }}
      >
        <div className="flex flex-col gap-y-1">
          <div className="flex justify-between">
            <div className="flex">
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
            </div>
            <MoreOptionsButton options={menuOptions} />
          </div>
          <div className="flex items-center gap-x-1">
            <StatusButton statusIndex={task.statusIndex} setTask={setTask} />
            <SelectDateButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default Task;
