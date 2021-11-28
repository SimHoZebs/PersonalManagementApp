import { NextApiRequest, NextApiResponse } from 'next';
import userCollection, { UserSchema } from '../../../../lib/schema/UserSchema';
import listCollection, { ListSchema } from '../../../../lib/schema/ListSchema';
import apiEndpointHelper from '../../../../lib/apiEndpointHelper';

export type Get = Awaited<ReturnType<typeof get>>;
export type Post = Awaited<ReturnType<typeof post>>;
export type Patch = Awaited<ReturnType<typeof patch>>;

async function get() {
  return await listCollection.find({}) as ListSchema[];
}

async function post(body: Body, userId: string | string[]) {
  console.log("woops");
  return await listCollection.create(new listCollection({ listName: body.listName, userId })) as ListSchema;
}

async function patch(body: Body, userId: string | string[],) {
  const user: UserSchema = await userCollection.findOne({ _id: userId });

  if (body.target === "selectedListId") {
    user.selectedListId = body.listId;
  } else {
    user.listIdArray.push(body.listId);
  }

  await user.save();
  return user;
}


interface Body {
  listName: string; //createList
  listId: string; //addListId
  target: string; //updateSelectedListId
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
      return post(body, userId);
    },

    async function patchWrapper() {
      return patch(body, userId);
    }
  );

  res.status(status).json(response);
}