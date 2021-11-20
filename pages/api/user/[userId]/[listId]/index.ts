import { NextApiRequest, NextApiResponse } from 'next';
import apiEndpointMiddleware from '../../../../../lib/apiEndpointMiddleware';
import { ItemSchema } from '../../../../../lib/schema/ItemSchema';
import listCollection, { ListSchema } from '../../../../../lib/schema/ListSchema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body, query } = req;

  const { status, response } = await apiEndpointMiddleware(req,

    async function get() {
      return await listCollection.findOne({ _id: query.listId }) as ListSchema;
    },

    async function post() {
      const list: ListSchema = await listCollection.findOne({ _id: query.listId });
      list.itemArray.push(body.newItem);
      list.save();

      return list.itemArray;
    },

    async function patch() {
      const list: ListSchema = await listCollection.findOne({ _id: query.listId });

      let response;
      switch (body.prop) {
        case "listName":
          list.listName = body.data;

          response = list;
          break;
        case "description":
          list.description = body.data;

          response = list;
          break;

        default:
          const index = parseInt(body.itemIndex as string);
          const targetItem = list.itemArray[index];

          targetItem.itemName = body.newItemName as string;
          list.itemArray[index] = targetItem;

          response = list.itemArray;
          break;
      }

      list.save();
      return response;
    },

    async function del() {
      const list: ListSchema = await listCollection.findOne({ _id: query.listId });
      list.itemArray.splice(parseInt(body.itemIndex as string), 1);
      list.save();

      return list.itemArray;
    }
  );

  res.status(status).json(response);
}