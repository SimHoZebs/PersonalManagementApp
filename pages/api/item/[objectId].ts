import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, url } = req;

  console.log(url)

  switch (method) {
    case 'GET':
      try {
        res.status(200).json({ res: url })
      } catch (error) {
        res.status(400).json({ msg: error })
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
          msg: 'successful, '
        })
      } catch (error) {
        res.status(400).json({ msg: error })
      }
      break;
  }
}