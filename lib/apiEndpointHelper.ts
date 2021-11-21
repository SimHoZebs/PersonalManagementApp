import { NextApiRequest } from "next";

type MethodFunction = () => Promise<any>;

export default async function apiEndpointHelper(
  req: NextApiRequest,
  get?: MethodFunction,
  post?: MethodFunction,
  patch?: MethodFunction,
  del?: MethodFunction
) {

  const { method } = req;

  let res;
  try {
    switch (method) {
      case 'GET':
        if (!get) return { status: 404, response: { error: "get function doesn't exist" } };

        res = await get();
        return res instanceof Error
          ? { status: 500, response: { error: res } }
          : { status: 200, response: { res } };

      case "POST":
        if (!post) return { status: 404, response: { error: "post function doesn't exist" } };

        res = await post();
        return res instanceof Error
          ? { status: 500, response: { error: res } }
          : { status: 200, response: { res } };

      case "PATCH":
        if (!patch) return { status: 404, response: { error: "patch function doesn't exist" } };

        res = await patch();
        return res instanceof Error
          ? { status: 500, response: { error: res } }
          : { status: 200, response: { res } };

      case 'DELETE':
        if (!del) return { status: 404, response: { error: "del function doesn't exist" } };

        res = await del();
        return res instanceof Error
          ? { status: 500, response: { error: res } }
          : { status: 200, response: { res } };

      default:
        return { status: 400, response: { error: "Unknown method" } };


    }
  }
  catch (error) {
    return { status: 500, response: { error } };
  }
}