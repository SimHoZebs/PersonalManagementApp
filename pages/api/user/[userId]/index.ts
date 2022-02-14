import { NextApiRequest, NextApiResponse } from 'next';
import userCollection, { UserDocs, UserProps } from '../../../../lib/schema/UserSchema';
import goalCollection, { GoalProps } from '../../../../lib/schema/GoalSchema';
import apiEndpointHelper from '../../../../lib/apiEndpointHelper';


export type Get = Awaited<ReturnType<typeof get>>;
async function get() {
  return await goalCollection.find({}) as GoalProps[];
}

export type Post = Awaited<ReturnType<typeof post>>;
async function post(body: Body, userId: string | string[]) {

  return await goalCollection.create(new goalCollection({ title: body.goalTitle, description: body.description, userId })) as GoalProps;
}

export type Patch = Awaited<ReturnType<typeof patch>>;
async function patch(body: Body, userId: string) {
  if (!(body.goalId)) return new Error('GoalId is undefined');

  const user: UserDocs | null = await userCollection.findOne({ _id: userId });

  if (user === null) return new Error('user is null');

  if (body.target === "lastViewedGoalId") {
    user.lastViewedGoalId = body.goalId;
  } else {
    if (!body.goalTitle) return new Error("goalTitle is undefined");
    user.goalArray.push({ title: body.goalTitle, id: body.goalId });
  }

  await user.save();
  return user as UserProps;
}

export interface Body {
  goalId?: string; //addGoal
  goalTitle?: string; //addGoal && createGoal
  description?: string; //createGoal
  target?: string; //updateLastViewedGoalId
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body: Body = req.body;

  const {
    userId //all
  } = req.query;

  const { status, response } = await apiEndpointHelper(req,

    async function getWrapper() {
      return get();
    },

    async function postWrapper() {
      return post(body, userId as string);
    },

    async function patchWrapper() {
      return patch(body, userId as string);
    }
  );

  res.status(status).json(response);
}