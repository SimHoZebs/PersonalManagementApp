import { NextApiRequest, NextApiResponse } from 'next';

interface functions {
  get: Object;
}

export default async function apiBase(functions: functions, req: NextApiRequest, res: NextApiResponse) {
  const { get } = functions
  const { method } = req;
  let msg = ["Successful"]

  switch (method) {
    case 'GET':
      try {
        const res = get()
        res.status(200).json({ res: msg })
      } catch (error) {
        res.status(400).json({ res: error })
      }
      break;

    case 'POST':
      try {
        res.status(201).json({ msg: 'successful', })
      } catch (error) {
        res.status(400).json({ msg: error })
      }
      break;

    case 'DELETE':
      try {
        res.status(201).json({
          msg: 'successful, })
        } catch (error) {
          res.status(400).json({ msg: error })
        }
        break;
      }
}