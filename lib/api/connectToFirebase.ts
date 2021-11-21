import { Get } from "../../pages/api/firebase";
import apiFunctionHelper from "../apiFunctionHelper";

export default async function readFirebaseConfig() {

  return await apiFunctionHelper<Get>({
    method: "GET",
    url: "api/firebase"
  });
}