import { Get } from "../../pages/api/db";
import apiFunctionMiddleware from "../apiFunctionMiddleware";

export default async function connectToDB() {
  return await apiFunctionMiddleware<Get>({
    method: "GET",
    url: "api/db"
  });
}