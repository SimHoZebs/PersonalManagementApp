import { NextApiRequest, NextApiResponse } from 'next';
import apiEndpointHelper from '../../../../../lib/apiEndpointHelper';
import { TaskSchema } from '../../../../../lib/schema/TaskSchema';
import goalCollection, { GoalSchema } from '../../../../../lib/schema/GoalSchema';

export type Get = Awaited<ReturnType<typeof get>>;
export type Post = Awaited<ReturnType<typeof post>>;
export type Patch = Awaited<ReturnType<typeof patch>>;
export type Del = Awaited<ReturnType<typeof del>>;

async function get(body: Body, goalId: string) {
  return await goalCollection.findOne({ _id: goalId }) as GoalSchema;
}

async function post(body: Body, goalId: string) {
  const goal: GoalSchema = await goalCollection.findOne({ _id: goalId });
  goal.taskArray.push(body.newTask);
  goal.save();

  return goal.taskArray;
}

async function patch(body: Body, goalId: string) {
  const goal: GoalSchema = await goalCollection.findOne({ _id: goalId });

  let response;
  switch (body.prop) {
    case "title":
      goal.title = body.data;

      response = goal;
      break;
    case "description":
      goal.description = body.data;

      response = goal;
      break;

    default:
      const index = parseInt(body.taskIndex as string);
      const targetTask = goal.taskArray[index];

      targetTask.title = body.newTaskTitle as string;
      goal.taskArray[index] = targetTask;

      response = goal.taskArray;
      break;
  }

  goal.save();
  return response;
}

async function del(body: Body, goalId: string) {
  const goal: GoalSchema = await goalCollection.findOne({ _id: goalId });
  goal.taskArray.splice(parseInt(body.taskIndex), 1);
  goal.save();

  return goal.taskArray;
}

interface Body {
  prop: string;
  data: string;
  newTaskTitle: string;
  taskIndex: string;
  newTask: TaskSchema;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body: Body = req.body;
  const { goalId } = req.query;

  const { status, response } = await apiEndpointHelper(req,
    async function getWrapper() {
      return get(body, goalId as string);
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