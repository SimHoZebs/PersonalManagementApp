import { NextApiRequest, NextApiResponse } from 'next';
import apiEndpointHelper from '../../../../../../lib/apiEndpointHelper';
import ItemCollection, { ItemSchema } from '../../../../../../lib/schema/ItemSchema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query, body } = req;

  const { status, response } = await apiEndpointHelper(req,

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