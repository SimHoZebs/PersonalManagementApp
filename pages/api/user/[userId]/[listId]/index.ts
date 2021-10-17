import { NextApiRequest, NextApiResponse } from 'next';
import listCollection, { ListSchema } from '../../../../../lib/schema/ListSchema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;
  const { listId } = req.query;

  switch (method) {
    case 'GET':
      try {
        const list: ListSchema = await listCollection.findOne({ _id: listId });
        res.status(200).json({ res: list });
      }
      catch (error) {
        res.status(500).json({ error });
      }
      break;

    case "POST":
      try {
        const list: ListSchema = await listCollection.findOne({ _id: listId });
        list.itemArray.push(body.newItem);
        list.save();
        res.status(201).json({ res: list.itemArray });
      } catch (error) {
        res.status(500).json({ error });
      }
      break;

    case "PATCH":
      try {

        const list: ListSchema = await listCollection.findOne({ _id: listId });

        let response: unknown;
        switch (body.prop) {
          case "listName":
            list.listName = body.data;

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
        res.status(201).json({ res: response });
      }
      catch (error) {
        res.status(500).json({ error });
      }
      break;

    case 'DELETE':
      try {
        res.status(201).json({});
      } catch (error) {
        res.status(500).json({ error });
      }
      break;
  }
}