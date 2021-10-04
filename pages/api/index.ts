import mongoose from "mongoose"
import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from '../../lib/initMiddleware';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  await NextCors(req, res, {
    origin: "https://anothertodoapp-git-v2-yusukzebs.vercel.app/",
    methods: ['GET']
  });

  switch (method) {
    case 'GET':
      try {
        if (process.env.DB_URI) {
          await mongoose.connect(process.env.DB_URI);
        } else {
          throw new Error('DB_URI is not defined');
        }
        res.status(200)
      }
      catch (error) {
        res.status(500).json({ error })
      }
  }
}
