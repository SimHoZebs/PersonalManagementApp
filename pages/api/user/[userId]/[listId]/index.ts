import { NextApiRequest, NextApiResponse } from 'next';
import apiEndpointHelper from '../../../../../lib/apiEndpointHelper';
import { ItemSchema } from '../../../../../lib/schema/ItemSchema';
import listCollection, { ListSchema } from '../../../../../lib/schema/ListSchema';

export type Get = Awaited<ReturnType<typeof get>>;
export type Post = Awaited<ReturnType<typeof post>>;
export type Patch = Awaited<ReturnType<typeof patch>>;
export type Del = Awaited<ReturnType<typeof del>>;

async function get(body: Body, listId: string) {
  return await listCollection.findOne({ _id: listId }) as ListSchema;
}

async function post(body: Body, listId: string) {
  const list: ListSchema = await listCollection.findOne({ _id: listId });
  list.itemArray.push(body.newItem);
  list.save();

  return list.itemArray;
}

async function patch(body: Body, listId: string) {
  const list: ListSchema = await listCollection.findOne({ _id: listId });

  let response;
  switch (body.prop) {
    case "listTitle":
      list.title = body.data;

      response = list;
      break;
    case "description":
      list.description = body.data;

      response = list;
      break;

    default:
      const index = parseInt(body.itemIndex as string);
      const targetItem = list.itemArray[index];

      targetItem.title = body.newItemTitle as string;
      list.itemArray[index] = targetItem;

      response = list.itemArray;
      break;
  }

  list.save();
  return response;
}

async function del(body: Body, listId: string) {
  const list: ListSchema = await listCollection.findOne({ _id: listId });
  list.itemArray.splice(parseInt(body.itemIndex), 1);
  list.save();

  return list.itemArray;
}

interface Body {
  prop: string;
  data: string;
  newItemTitle: string;
  itemIndex: string;
  newItem: ItemSchema;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body: Body = req.body;
  const { listId } = req.query;

  const { status, response } = await apiEndpointHelper(req,
    async function getWrapper() {
      return get(body, listId as string);
    },
    async function postWrapper() {
      return post(body, listId as string);
    },
    async function patchWrapper() {
      return patch(body, listId as string);
    },
    async function delWrapper() {
      return del(body, listId as string);
    }
  );

  res.status(status).json(response);
}