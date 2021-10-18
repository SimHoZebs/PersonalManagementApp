import { NextApiRequest, NextApiResponse } from "next";
import apiEndpointMiddleware from "../../../lib/apiEndpointMiddleware";
import userCollection, { UserSchema } from '../../../lib/schema/UserSchema';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { body, query } = req;

  const { status, response } = await apiEndpointMiddleware(req,

    async function get() {
      let user: UserSchema | undefined;
      if (query.username != null) {
        user = await userCollection.findOne({ username: query.username });
      }
      else if (query.userId != null) {
        user = await userCollection.findOne({ _id: query.userId });
      }
      return user;
    },

    async function post() {
      return await userCollection.create(new userCollection({ username: body.username }));
    }

  );

  res.status(status).json(response);
}