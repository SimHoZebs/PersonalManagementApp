import React, { useState, useEffect, useRef } from "react";

//components
import TextField from "../components/TextField";
import SelectDateButton from "../components/SelectDateButton";
import MoreOptionsButton from "../components/MoreOptionsButton";

//etc
import createTask from "./createTask";
import { useStoreActions, useStoreState } from "../globalState";
import TaskCard from "./TaskCard";
import { Icon } from "@iconify/react";
import { TaskDoc } from "./types";

export interface Props {
  taskIndex: number;
  task: TaskDoc;
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
  const user = useStoreState((s) => s.user);
  const [task, setTask] = useState(taskArray[props.taskIndex]);
  const [taskCardHidden, setTaskCardHidden] = useState(true);
  const textFieldRef = useRef<HTMLInputElement>(null);

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
      if (!user) return;

      createTask(user._id.toString(), task);

      props.setCreatingTask(false);
    }
  }, [props, task, user]);

  useEffect(() => {
    updateTask({ task: task, taskIndex: props.taskIndex });
  }, [task, props.taskIndex, updateTask]);

  return (
    <>
      <TaskCard
        task={task}
        setTask={setTask}
        taskCardHidden={taskCardHidden}
        setTaskCardHidden={setTaskCardHidden}
      />

      <div
        className="rounded flex flex-col bg-dark-400 shadow p-2 shadow-dark-900 w-360px gap-x-3  justify-between"
        onContextMenu={() => {
          setMoreContextMenuOptions(menuOptions);
        }}
        onClick={() => {
          setTaskCardHidden(false);
        }}
      >
        <div className="flex w-full justify-between">
          <div className="flex items-center">
            <Icon
              icon="mdi:checkbox-blank-outline"
              className="h-6 text-gray-500 w-6"
            />
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
          </div>
          <MoreOptionsButton options={menuOptions} />
        </div>

        <div className="flex gap-x-1 items-center">
          <SelectDateButton />
        </div>
      </div>
    </>
  );
};

export default Task;
