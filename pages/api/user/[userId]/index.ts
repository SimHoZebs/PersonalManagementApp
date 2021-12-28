import { NextApiRequest, NextApiResponse } from 'next';
import userCollection, { UserDocs, UserProps } from '../../../../lib/schema/UserSchema';
import goalCollection, { GoalProps } from '../../../../lib/schema/GoalSchema';
import apiEndpointHelper from '../../../../lib/apiEndpointHelper';

export type Get = Awaited<ReturnType<typeof get>>;
export type Post = Awaited<ReturnType<typeof post>>;
export type Patch = Awaited<ReturnType<typeof patch>>;

async function get() {
  return await goalCollection.find({}) as GoalProps[];
}

async function post(body: Body, userId: string | string[]) {
  if (!body.title) return new Error('Title is undefined');

  return await goalCollection.create(new goalCollection({ title: body.title, userId })) as GoalProps;
}

async function patch(body: Body, userId: string) {
  if (!(body.goalId)) return new Error('GoalId is undefined');

  const user: UserDocs = await userCollection.findOne({ _id: userId });

  if (body.target === "lastViewedGoalId") {
    user.lastViewedGoalId = body.goalId;
  } else {
    user.goalIdArray.push(body.goalId);
  }

  await user.save();
  return user as UserProps;
}

export interface Body {
  title?: string; //createGoal
  goalId?: string; //addGoalId
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