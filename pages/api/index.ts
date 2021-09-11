import mongoose from "mongoose"
import ApiRes from '../../lib/api/ApiRes'
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiRes>) {
  const { method, body } = req;


  switch (method) {
    case 'GET':
      try {
        if (process.env.DB_URI) {
          await mongoose.connect(process.env.DB_URI);
        } else {
          throw new Error('DB_URI is not defined');
        }
        res.status(200).json({ success: true })
      }
      catch (error) {
        res.status(500).json({ error: error, success: false })
      }
  }
}
