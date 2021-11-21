import { NextApiRequest, NextApiResponse } from 'next';
import userCollection, { UserSchema } from '../../../../lib/schema/UserSchema';
import listCollection from '../../../../lib/schema/ListSchema';
import apiEndpointHelper from '../../../../lib/apiEndpointHelper';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body: {
    listName: string; //createList
    listId: string; //addListId
    target: string; //updateSelectedListId
  } = req.body;

  const {
    userId //all
  } = req.query;

  const { status, response } = await apiEndpointHelper(req,

    async function get() {
      return await listCollection.find({});
    },

    async function post() {
      return await listCollection.create(new listCollection({ listName: body.listName, userId }));
    },

    async function patch() {
      const user: UserSchema = await userCollection.findOne({ _id: userId });

      if (body.target === "selectedListId") {
        user.selectedListId = body.listId;
      } else {
        user.listIdArray.push(body.listId);
      }

      await user.save();
      return user;
    }
  );

  res.status(status).json(response);
}