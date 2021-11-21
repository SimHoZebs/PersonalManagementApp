import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from 'next';
import apiEndpointHelper from "../../lib/apiEndpointHelper";

export type Get = Awaited<ReturnType<typeof get>>;

async function get() {
  if (!process.env.DB_URI) {
    throw new Error('DB_URI is not defined');
  } else {
    await mongoose.connect(process.env.DB_URI);
    return true;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { status, response } = await apiEndpointHelper(req,
    get
  );

  res.status(status).json(response);
}
