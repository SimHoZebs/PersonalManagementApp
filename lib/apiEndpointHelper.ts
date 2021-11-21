import { NextApiRequest } from "next";

type MethodFunction = () => Promise<any>;

export default async function apiEndpointHelper(
  req: NextApiRequest,
  get?: MethodFunction,
  post?: MethodFunction,
  patch?: MethodFunction,
  del?: MethodFunction
) {

  console.log(`
  url: ${req.url} 
  body: ${req.body}
  query: ${req.query}
  methods: ${req.method}
  `);
  const { method } = req;
  let res;

  try {
    switch (method) {
      case 'GET':
        if (!get) return { status: 404, response: { error: "get function doesn't exist" } };

        res = await get();
        return { status: 200, response: { res } };

      case "POST":
        if (!post) return { status: 404, response: { error: "post function doesn't exist" } };

        res = await post();
        return { status: 200, response: { res } };

      case "PATCH":
        if (!patch) return { status: 404, response: { error: "patch function doesn't exist" } };

        res = await patch();
        return { status: 201, response: { res } };

      case 'DELETE':
        if (!del) return { status: 404, response: { error: "del function doesn't exist" } };

        res = await del();
        return { status: 200, response: { res } };

      default:
        console.log("unknown method");
        return { status: 400 };
    }
  } catch (error) {
    console.log(error);
    return { status: 500 };
  }
}