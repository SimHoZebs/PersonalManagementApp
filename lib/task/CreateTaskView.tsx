import React, { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import TextField from "../components/TextField";
import { Listbox } from "@headlessui/react";
import { useStoreActions, useStoreState } from "../globalState";
import createTask from "./createTask";
import newTaskDefault from "./newTaskDefault";
import { Duration, Status, TaskDoc } from "./types";

const CreateTaskView = () => {
  const isVisible = useStoreState((s) => s.createTaskViewVisible);
  const setIsVisible = useStoreActions((a) => a.setCreateTaskViewVisible);
  const userId = useStoreState((s) => s.user?._id);

  const [taskName, setTaskName] = React.useState("");
  const statusArray: Status[] = ["On going", "Planned"];
  const [currStatus, setCurrStatus] = useState(statusArray[0]);

  const durationArray: Duration[] = [
    "< 30 mins",
    "~ 1 hr",
    "~ 2 hrs",
    "~ 4 hrs",
    "> 4 hrs",
  ];
  const [currDuration, setCurrDuration] = useState(durationArray[0]);

  const textFieldRef = useRef<HTMLInputElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  async function createTaskBtn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!userId) return;

    const newTask: TaskDoc = {
      ...newTaskDefault,
      title: taskName,
      status: currStatus,
      duration: currDuration,
    };

    const createTaskRes = await createTask(userId.toString(), newTask);
  }

  useEffect(() => {
    if (!backdropRef.current) return;
    const backdrop = backdropRef.current;

    function handleClickOutside() {
      if (!backdrop.contains(document.activeElement)) {
        console.log("setVisible false");
        setIsVisible(false);
      }
    }

    console.log("CreateTaskView: useEffect");
    backdrop.addEventListener("click", handleClickOutside);

    textFieldRef.current?.focus();

    return () => {
      console.log("unmounting");
      backdrop.removeEventListener("click", handleClickOutside);
    };
  }, [isVisible, setIsVisible]);

  return isVisible ? (
    <div
      className="flex h-screen bg-opacity-80 bg-dark-800 w-screen top-0 left-0 justify-center items-center absolute"
      ref={backdropRef}
    >
      <div className="flex flex-col gap-y-5 items-start">
        <h1 className="text-4xl">What are you planning?</h1>

        <form
          onSubmit={(e) => createTaskBtn(e)}
          className="flex flex-col gap-y-2"
        >
          <TextField
            ref={textFieldRef}
            className="border-b w-md text-3xl"
            value={taskName}
            onChange={(e) => setTaskName(e.currentTarget.value)}
          />

          <div className="flex tracking-wide gap-x-4">
            <div className="w-auto relative">
              <Listbox value={currStatus} onChange={setCurrStatus}>
                <Listbox.Button className="rounded bg-gray-500 w-full py-1 px-2">
                  {currStatus}
                </Listbox.Button>
                <Listbox.Options className="rounded bg-gray-500 top-9 absolute">
                  {statusArray.map((item, index) => (
                    <Listbox.Option
                      key={index}
                      value={item}
                      className="w-max py-1 px-2"
                    >
                      {item}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>

            <div className="relative">
              <Listbox value={currDuration} onChange={setCurrDuration}>
                <Listbox.Button className="rounded bg-gray-500 py-1 px-2">
                  {currDuration}
                </Listbox.Button>
                <Listbox.Options className="rounded bg-gray-500 top-9 absolute">
                  {durationArray.map((item, index) => (
                    <Listbox.Option
                      key={index}
                      value={item}
                      className="rounded w-max py-1 px-2"
                    >
                      {item}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>
          </div>

          <Button className="text-xl" onClick={() => createTaskBtn}>
            Create (Enter)
          </Button>
        </form>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default CreateTaskView;
