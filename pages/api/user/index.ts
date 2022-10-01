import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import apiEndpointHelper from "../../../lib/helper/apiEndpointHelper";
import db from "../../../lib/db";
import { UserDoc } from "../../../lib/user/types";

export type Get = Awaited<ReturnType<typeof get>>;
async function get(userId: string) {
  if (!userId) throw new Error("userId is undefined");

  const userCollection = await db.then(res => res.collection<UserDoc>('users'));
  return await userCollection.findOne({ _id: new ObjectId(userId === "0" ? 0 : userId) });
}

export type Post = Awaited<ReturnType<typeof post>>;
async function post(body: Body) {
  if (!body.name) throw new Error("Title is undefined");

  const newUser = {
    _id: new ObjectId(),
    name: body.name,
    taskArray: []
  };

  if (typeof (body.userId) === "string") {
    newUser._id = new ObjectId(body.userId);
  }

  const userCollection = await db.then(res => res.collection<UserDoc>('users'));
  const res = await userCollection.insertOne(newUser);
  return res;
}

export interface Body {
  userId?: ObjectId | string;
  name?: string;
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