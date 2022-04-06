import React, { useState, useEffect, useRef } from "react";

//components
import TextField from "../components/TextField";
import SelectDateButton from "../components/SelectDateButton";
import MoreOptionsButton from "../components/MoreOptionsButton";

//etc
import { useStoreActions } from "../globalState";
import TaskCard from "./TaskCard";
import { Icon } from "@iconify/react";
import { TaskDoc } from "./types";
import IconButton from "../components/IconButton";

export interface Props {
  taskIndex: number;
  task: TaskDoc;
}

const Task = (props: Props) => {
  const deleteTask = useStoreActions((a) => a.deleteTask);
  const setMoreContextMenuOptions = useStoreActions(
    (a) => a.setMoreContextMenuOptions
  );
  const [task, setTask] = useState(props.task);
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
              size={
                props.task.title.length <= 5 ? 5 : props.task.title.length - 2
              }
              value={props.task.title}
              onChange={(e) =>
                setTask((prev) =>
                  prev ? { ...prev, title: e.target.value } : prev
                )
              }
            />
          </div>
          <MoreOptionsButton options={menuOptions} />
        </div>

        <div className="flex gap-x-4 items-center">
          <SelectDateButton />

          <IconButton className="text-true-gray-400 gap-x-1 group hover:text-true-gray-300">
            <Icon
              icon="mdi:clock-time-three-outline"
              className="h-6 text-primary w-6 duration-100 group-hover:text-primary-hover"
            />
            {props.task.duration}
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default Task;
