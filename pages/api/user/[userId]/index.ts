import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import apiEndpointHelper from '../../../../lib/apiEndpointHelper';
import { TaskDoc } from '../../../../lib/task/types';
import db from '../../../../lib/db';

export type Get = Awaited<ReturnType<typeof get>>;
async function get() {
  return new Error("This endpoint is not implemented yet.");
}

export type Post = Awaited<ReturnType<typeof post>>;
async function post(body: Body, userId: string) {
  if (!(userId)) return new Error("Missing required fields");

  const userCollection = await db.then(res => res.collection('users'));

  //Figure out how to insert a new task into the task array
  return await userCollection.findOneAndUpdate({ _id: new ObjectId(userId) }, {});
}

export type Patch = Awaited<ReturnType<typeof patch>>;
async function patch(body: Body, userId: ObjectId) {

  const userCollection = await db.then(res => res.collection('users'));
  //Figure out how to update a task in the task array
  return await userCollection.findOneAndUpdate({ _id: new ObjectId(userId) }, {});
}

export type Del = Awaited<ReturnType<typeof del>>;
async function del(body: Body, userId: ObjectId) {
  if (!(body.taskId || userId)) return new Error("Missing required fields");

  //task deletion
};

export interface Body {
  task?: TaskDoc;
  target?: string; //updateLastViewedGoalId
  taskId?: ObjectId;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body: Body = req.body;
  const { userId } = req.query;

  const { status, response } = await apiEndpointHelper(req,

    async function getWrapper() {
      return get();
    },

    async function postWrapper() {
      return post(body, userId as string);
    },

    async function patchWrapper() {
      return patch(body, userId as unknown as ObjectId);
    },
    async function delWrapper() {
      return del(body, userId as unknown as ObjectId);
    }
  );

  res.status(status).json(response);
}