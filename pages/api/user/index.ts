import { NextApiRequest, NextApiResponse } from "next";
import apiEndpointHelper from "../../../lib/apiEndpointHelper";
import userCollection from '../../../lib/schema/UserSchema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body, query } = req;

  async function get() {
    return await userCollection.findOne({ _id: query.userId });
  }

  async function post() {
    return await userCollection.create(new userCollection({ username: body.username, _id: body.userId }));
  }

  const { status, response } = await apiEndpointHelper(req,
    get, post,
  );

  res.status(status).json(response);
}