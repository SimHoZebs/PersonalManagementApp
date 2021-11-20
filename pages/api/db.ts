import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from 'next';
import apiEndpointMiddleware from "../../lib/apiEndpointMiddleware";

export type Get = Awaited<ReturnType<typeof get>>;

async function get() {
  try {
    if (!process.env.DB_URI) {
      throw new Error('DB_URI is not defined');
    } else {
      await mongoose.connect(process.env.DB_URI);
      return true;
    }
  } catch (error) {
    if (error instanceof Error) {
      return error;
    }
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { status, response } = await apiEndpointMiddleware(req,
    get
  );

  res.status(status).json(response);
}
