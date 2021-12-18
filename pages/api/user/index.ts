import { NextApiRequest, NextApiResponse } from "next";
import apiEndpointHelper from "../../../lib/apiEndpointHelper";
import userCollection, { UserSchema } from '../../../lib/schema/UserSchema';

export type Get = Awaited<ReturnType<typeof get>>;
export type Post = Awaited<ReturnType<typeof post>>;

async function get(userId: string) {
  return await userCollection.findOne({ _id: userId }) as UserSchema | null;
}

async function post(body: Body) {
  if (!body.title) return new Error("Title is undefined");

  return await userCollection.create(new userCollection({ title: body.title, _id: body.userId })) as UserSchema;
}

export interface Body {
  userId?: string;
  title?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body: Body = req.body;
  const { userId } = req.query;

  const { status, response } = await apiEndpointHelper(req,
    async function getWrapper() {
      return get(userId as string);
    },
    async function postWarpper() {
      return post(body);
    },
  );

  res.status(status).json(response);
}