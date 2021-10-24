import apiFunctionMiddleware from "../apiFunctionMiddleware";

export default async function makeConnectionWithMongoDB() {
  return await apiFunctionMiddleware<void>({
    method: "GET",
    url: "api"
  });
}