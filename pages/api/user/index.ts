import { NextApiRequest, NextApiResponse } from "next";
import apiEndpointMiddleware from "../../../lib/apiEndpointMiddleware";
import userCollection from '../../../lib/schema/UserSchema';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { body, query } = req;

  const { status, response } = await apiEndpointMiddleware(req,

    async function get() {
      return userCollection.findOne({ _id: query.userId });
    },

    async function post() {
      return await userCollection.create(new userCollection({ username: body.username }));
    }

  );

  res.status(status).json(response);
}