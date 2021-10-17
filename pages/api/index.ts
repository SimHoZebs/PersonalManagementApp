import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        if (process.env.DB_URI) {
          await mongoose.connect(process.env.DB_URI);
        } else {
          throw new Error('DB_URI is not defined');
        }
        res.status(200).json({});
      }
      catch (error) {
        res.status(500).json({ error });
      }
  }
}
