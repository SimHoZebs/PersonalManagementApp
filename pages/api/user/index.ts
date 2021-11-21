import { NextApiRequest, NextApiResponse } from "next";
import apiEndpointHelper from "../../../lib/apiEndpointHelper";
import userCollection from '../../../lib/schema/UserSchema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body, query } = req;

  async function get() {
    try {
      return userCollection.findOne({ _id: query.userId });
    } catch (error) {
      if (error instanceof Error) {
        return error;
      }
    }
  }

  async function post() {
    return await userCollection.create(new userCollection({ username: body.username }));
  }

  const { status, response } = await apiEndpointHelper(req,
    get, post,
  );

  res.status(status).json(response);
}