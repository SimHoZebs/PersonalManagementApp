import { NextApiRequest, NextApiResponse } from 'next';
import apiEndpointMiddleware from '../../../../../../lib/apiEndpointMiddleware';
import ItemCollection, { ItemSchema } from '../../../../../../lib/schema/ItemSchema';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { query, body } = req;

  const { status, response } = await apiEndpointMiddleware(req,

    async function get() {
      return await ItemCollection.find({});
    },

    async function post() {

    },

    async function patch() {
      return await ItemCollection.findOneAndUpdate({ _id: query.itemId }, { title: body.newItemName }, { new: true }) as ItemSchema;
    },

    async function del() {
      await ItemCollection.findByIdAndRemove(req.body.id) as ItemSchema;
    }

  );

  res.status(status).json(response);
}