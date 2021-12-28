import { NextApiRequest, NextApiResponse } from 'next';
import apiEndpointHelper from '../../../../../lib/apiEndpointHelper';
import { TaskSchema } from '../../../../../lib/schema/TaskSchema';
import goalCollection, { GoalProps, GoalSchema } from '../../../../../lib/schema/GoalSchema';

export type Get = Awaited<ReturnType<typeof get>>;
export type Post = Awaited<ReturnType<typeof post>>;
export type Patch = Awaited<ReturnType<typeof patch>>;
export type Del = Awaited<ReturnType<typeof del>>;

async function get(goalId: string) {
  return await goalCollection.findOne({ _id: goalId }) as GoalSchema;
}

async function post(body: Body, goalId: string) {
  if (!body.task) return new Error("Task is undefined");

  const goal: GoalSchema = await goalCollection.findOne({ _id: goalId });
  goal.taskArray.push(body.task);
  goal.save();

  return goal.taskArray;
}

async function patch(body: Body, goalId: string) {

  const goal: GoalSchema = await goalCollection.findOne({ _id: goalId });

  let response: GoalSchema | TaskSchema[] | undefined;
  if (body.modifiedGoal) {
    //modifying goal
    response = { ...goal.toObject, ...body.modifiedGoal } as GoalSchema;
  } else if (body.modifiedTask && body.taskId) {
    //modifying taskArray

    const index = goal.taskArray.findIndex(task => task.id === body.taskId);
    let targetTask = goal.taskArray[index];

    if (index !== -1) {
      targetTask = { ...targetTask.toObject(), ...body.modifiedTask } as TaskSchema;
      goal.taskArray[index] = targetTask;
      response = goal.taskArray;
    } else {
      return new Error("Task not found");
    }
  } else {
    return new Error("ModifiedGoal, TaskId or ModifiedTask is undefined");
  }

  goal.save();
  return response;
}

async function del(body: Body, goalId: string) {
  if (!body.taskId) return new Error("TaskId is undefined");

  const goal: GoalSchema = await goalCollection.findOne({ id: goalId });

  const taskIndex = goal.taskArray.findIndex(task => task.id === body.taskId);
  goal.taskArray.splice(taskIndex, 1);
  goal.save();

  return goal.taskArray;
}

export interface Body {
  modifiedGoal?: GoalProps;
  modifiedTask?: { title?: string, statusColor?: string; };
  taskId?: string;
  task?: TaskSchema;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body: Body = req.body;
  const { goalId } = req.query;

  const { status, response } = await apiEndpointHelper(req,
    async function getWrapper() {
      return get(goalId as string);
    },
    async function postWrapper() {
      return post(body, goalId as string);
    },
    async function patchWrapper() {
      return patch(body, goalId as string);
    },
    async function delWrapper() {
      return del(body, goalId as string);
    }
  );

  res.status(status).json(response);
}