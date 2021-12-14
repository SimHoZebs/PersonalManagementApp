import { useContext, useEffect, useState } from "react";

// components
import Task from "./Task";
import GoalHeader from "./GoalHeader";
import Button from "./Button";

//etc
import { TaskSchema } from "../schema/TaskSchema";
import readList from "../api/readGoal";
import { UserContext } from "../../pages/user/[userId]";

interface Props {
  goalId: string;
  currGoalTitle: string | undefined;
  setCurrGoalTitle: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const List = (props: Props) => {
  const user = useContext(UserContext);
  const [taskArray, setTaskArray] = useState<TaskSchema[]>([]);
  const [description, setDescription] = useState<string | undefined>();
  const [creatingTask, setCreatingTask] = useState(false);
  const [goalLoaded, setListLoaded] = useState(false);

  /**
   * Readies goal to respond accoridngly to new task interaction.
   * @note For more info, check Task.tsx
   */
  function createTaskBtn() {
    const newTask = {
      title: "",
      userId: user?._id,
      goalId: props.goalId,
    } as TaskSchema;

    setTaskArray((prev) => [...prev, newTask]);
    setCreatingTask(true);
  }

  useEffect(() => {
    async function initList() {
      const readListRes = await readList(user?._id, props.goalId);
      if (!(readListRes instanceof Error)) {
        setTaskArray((prev) => readListRes.taskArray);
        setDescription(readListRes.description);
        props.setCurrGoalTitle(readListRes.title);
      }
    }

    initList();
    setListLoaded(true);
  }, [props, user?._id]);

  return (
    <>
      <GoalHeader
        goalId={props.goalId}
        description={description}
        setDescription={setDescription}
        setCurrGoalTitle={props.setCurrGoalTitle}
        currGoalTitle={props.currGoalTitle}
      />

      <hr className="border-dark-300" />

      <div className="flex flex-col gap-y-2 items-start">
        {taskArray.length !== 0 ? (
          taskArray.map((task, index) => (
            <Task
              key={index}
              task={task}
              taskIndex={index}
              setTaskArray={setTaskArray}
              goalId={props.goalId}
              setCreatingTask={setCreatingTask}
              isNewTask={
                creatingTask && index === taskArray.length - 1 ? true : false
              }
            />
          ))
        ) : (
          <p>There is no task in the goal! Start by adding one!</p>
        )}

        <Button onClick={() => createTaskBtn()}>CREATE TASK</Button>
      </div>
    </>
  );
};

export default List;
