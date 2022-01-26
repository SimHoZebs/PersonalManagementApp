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
import { useStoreActions, useStoreState } from "../globalState";
import updateTaskArray from "../api/updateTaskArray";

interface Props {
  userId: string;
  lastViewedGoalId: string;
}

const Goal = (props: Props) => {
  const goalProps = useStoreState((state) => state.goalProps);
  const setGoalProps = useStoreActions((actions) => actions.setGoalProps);

  const taskArray = useStoreState((state) => state.taskArray);
  const setTaskArray = useStoreActions((actions) => actions.setTaskArray);

  const [creatingTask, setCreatingTask] = useState(false);
  const [goalInitialized, setGoalinitialized] = useState(false);

  function createTaskBtn() {
    //Type assertion as TaskProps requires _id
    const newTask = {
      title: "",
      userId: props.userId,
      goalId: goalProps?._id,
      statusIndex: 0,
    } as TaskProps;

    setTaskArray([...taskArray, newTask]);
    setCreatingTask(true);
  }

  //Sync goalProps with DB
  //Problem: exhaustive-deps warning wants goalIntialized to be a dependency, but I don't want it to care about goalInitialized changes.
  useEffect(() => {
    if (goalProps && goalInitialized) {
      updateGoal(props.userId, goalProps._id, goalProps);
    }
  }, [goalProps, props.userId]);

  //Sync taskArray with DB
  //Problem: exhaustive-deps warning wants goalIntialized to be a dependency, but I don't want it to care about goalInitialized changes.
  useEffect(() => {
    if (!goalProps?._id || !goalInitialized) return;

    updateTaskArray(props.userId, goalProps?._id, taskArray);
  }, [goalProps?._id, props.userId, taskArray]);

  //Update goalProps and TaskArray when userId changes
  useEffect(() => {
    async function initGoal() {
      //This check is a must as user is undefined on initial load.

      const readGoalRes = await readGoal(props.userId, props.lastViewedGoalId);
      if (!(readGoalRes instanceof Error)) {
        const { taskArray, ...rest } = readGoalRes;
        setGoalProps(rest);
        setTaskArray(readGoalRes.taskArray);
        setGoalinitialized((prev) => true);
      }
    }

    initGoal();
  }, [props, setGoalProps, setTaskArray]);

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
