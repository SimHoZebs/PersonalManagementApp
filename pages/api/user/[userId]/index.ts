import { NextApiRequest, NextApiResponse } from 'next';
import userCollection, { UserSchema } from '../../../../lib/schema/UserSchema';
import listCollection from '../../../../lib/schema/ListSchema';
import apiEndpointMiddleware from '../../../../lib/apiEndpointMiddleware';

export default async function (req: NextApiRequest, res: NextApiResponse) {

  const { body, query } = req;

  const { status, response } = await apiEndpointMiddleware(req,

    async function get() {
      return await listCollection.find({});
    },

    async function post() {
      return await listCollection.create(new listCollection({ listName: body.listName, userId: query.userId }));
    },

    async function patch() {
      const user: UserSchema = await userCollection.findOne({ _id: query.userId });

      if (body.target === "selectedListId") {
        user.selectedListId = body.listId;
      } else {
        user.listIdArray.push(body.listId);
      }

      await user.save();
    }
  );

  res.status(status).json(response);
}