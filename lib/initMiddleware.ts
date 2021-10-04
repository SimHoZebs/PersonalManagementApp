// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware

import { CorsRequest } from "cors"

interface Res {
  statusCode?: number | undefined;
  setHeader(key: string, value: string): any;
  end(): any;
}

export default function initMiddleware(
  middleware: (
    req: CorsRequest,
    res: Res,
    fn: (result: any) => void
  ) => void
) {
  return (req: CorsRequest, res: Res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        return result instanceof Error ? reject(result) : resolve(result)
      })
    })
}