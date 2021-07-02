import GroupSchema, { IGroupSchema } from '../../schema/GroupSchema'
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  let msg = ["Successful response"]

  switch (method) {
    case 'GET':
      try {
        let groupList = await GroupSchema.find({})
        if (groupList.length === 0) {
          try {
            await GroupSchema.create({ title: "Default group" })
            groupList = await GroupSchema.find({})
            msg.push("There was no default group, created default group")
          }
          catch (error) {
            res.status(400).json({ msg: error })
          }
        }
        res.status(200).json({ res: groupList, msg: msg })
      } catch (error) {
        res.status(400).json({ msg: error })
      }
      break;

    case 'POST':
      try {
        const newGroup = await GroupSchema.create({ groupName: req.body.groupName })
        res.status(201).json({ msg: "successfully added new group", res: newGroup })
      } catch (error) {
        res.status(400).json({ msg: error })
      }
      break;

    case 'DELETE':
      try {
        res.status(201).json({ msg: "successfully deleted group", })
      } catch (error) {
        res.status(400).json({ msg: error })
      }
      break;
  }
}