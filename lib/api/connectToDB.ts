import { Get } from "../../pages/api/db";
import apiFunctionHelper from "../apiFunctionHelper";

export default async function connectToDB() {
  return await apiFunctionHelper<Get>({
    method: "GET",
    url: "api/db"
  });
}