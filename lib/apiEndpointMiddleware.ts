import { NextApiRequest, NextApiResponse } from "next";

export default async function apiEndpointMiddleware(
  req: NextApiRequest,
  get: () => Promise<any> = async () => { },
  post: () => Promise<any> = async () => { },
  patch: () => Promise<any> = async () => { },
  del: () => Promise<any> = async () => { },
) {

  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        return { status: 200, response: { res: await get() } };
      case "POST":
        return { status: 201, response: { res: await post() } };
      case "PATCH":
        return { status: 201, response: { res: await patch() } };
      case 'DELETE':
        return { status: 201, response: { res: await del() } };
      default:
        return { status: 400, response: { error: "Unknown method" } };
    }
  }
  catch (error) {
    return { status: 500, response: { error } };
  }
}