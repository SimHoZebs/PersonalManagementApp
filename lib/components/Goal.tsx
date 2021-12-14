import { useContext, useEffect, useState } from "react";

// components
import Task from "./Task";
import GoalHeader from "./GoalHeader";
import Button from "./Button";

//etc
import { TaskSchema } from "../schema/TaskSchema";
import readGoal from "../api/readGoal";
import { UserContext } from "../../pages/user/[userId]";
import { GoalSchema } from "../schema/GoalSchema";

interface Props {
  goalId: string;
  currGoalTitle: string | undefined;
  setCurrGoalTitle: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const Goal = (props: Props) => {
  const user = useContext(UserContext);
  const [taskArray, setTaskArray] = useState<TaskSchema[]>([]);
  const [description, setDescription] = useState<string | undefined>();
  const [creatingTask, setCreatingTask] = useState(false);
  const [goalLoaded, setGoalLoaded] = useState(false);
  const [goal, setGoal] = useState<GoalSchema | undefined>();

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
    async function initGoal() {
      const readGoalRes = await readGoal(user?._id, props.goalId);
      if (!(readGoalRes instanceof Error)) {
        setTaskArray((prev) => readGoalRes.taskArray);
        setDescription(readGoalRes.description);
        props.setCurrGoalTitle(readGoalRes.title);
      }
    }

    initGoal();
    setGoalLoaded(true);
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

export default Goal;
