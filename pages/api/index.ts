import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from 'next';
import apiEndpointMiddleware from "../../lib/apiEndpointMiddleware";

export default async function (req: NextApiRequest, res: NextApiResponse) {

  const { status, response } = await apiEndpointMiddleware(req,

    async function get() {
      if (process.env.DB_URI) {
        await mongoose.connect(process.env.DB_URI);
      } else {
        throw new Error('DB_URI is not defined');
      }
      return {};
    }
  );

  res.status(status).json(response);
}
