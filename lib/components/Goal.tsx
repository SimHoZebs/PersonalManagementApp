import { useEffect, useState } from "react";

// components
import Task from "./Task";
import GoalHeader from "./GoalHeader";
import Button from "./Button";

//etc
import { TaskProps } from "../schema/TaskSchema";
import readGoal from "../api/readGoal";
import { GoalBasicProps } from "../schema/GoalSchema";
import isLoaded from "../isLoaded";
import updateGoal from "../api/updateGoal";
import { useStoreActions, useStoreState } from "../../pages/_app";
import updateTaskArray from "../api/updateTaskArray";

const Goal = () => {
  const goalProps = useStoreState((state) => state.goalProps);
  const setGoalProps = useStoreActions((actions) => actions.setGoalProps);

  const taskArray = useStoreState((state) => state.taskArray);
  const setTaskArray = useStoreActions((actions) => actions.setTaskArray);

  const userId = useStoreState((state) => state.user?._id);
  const lastViewedGoalId = useStoreState(
    (state) => state.user?.lastViewedGoalId
  );

  const [creatingTask, setCreatingTask] = useState(false);

  function createTaskBtn() {
    //Type assertion as TaskProps requires _id
    const newTask = {
      title: "",
      userId,
      goalId: goalProps?._id,
      statusIndex: 0,
    } as TaskProps;

    setTaskArray([...taskArray, newTask]);
    setCreatingTask(true);
  }

  //Sync goalProps with DB
  useEffect(() => {
    if (goalProps && userId) {
      updateGoal(userId, goalProps._id, goalProps);
    }
  }, [userId, goalProps]);

  //Sync taskArray with DB
  //For some reason, Goal.tsx can't detect taskArray change so this doesn't work
  //Shit, it doesn't work because useEffect doesn't compare the contents of taskArray, it only cares that it's an array
  useEffect(() => {
    if (!userId || !goalProps?._id) return;

    updateTaskArray(userId, goalProps?._id, taskArray);
  }, [userId, taskArray, goalProps?._id]);

  //Update goalProps and TaskArray when userId changes
  useEffect(() => {
    async function initGoal() {
      //This check is a must as user is undefined on initial load.
      if (!userId || !lastViewedGoalId) return;

      const readGoalRes = await readGoal(userId, lastViewedGoalId);
      if (!(readGoalRes instanceof Error)) {
        const { taskArray, ...rest } = readGoalRes;
        setGoalProps(rest);
        setTaskArray(readGoalRes.taskArray);
      }
    }

    initGoal();
  }, [userId, lastViewedGoalId, setGoalProps, setTaskArray]);

  return (
    <>
      <GoalHeader />

      <hr className="border-dark-300" />

      <div className="flex flex-col gap-y-2 items-start">
        {taskArray.length !== 0 && isLoaded<GoalBasicProps>(goalProps) ? (
          taskArray.map((task, index) => (
            <Task
              key={task._id}
              taskIndex={index}
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
