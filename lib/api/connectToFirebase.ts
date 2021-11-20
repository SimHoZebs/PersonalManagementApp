import { FirebaseOptions } from "firebase/app";
import apiFunctionMiddleware from "../apiFunctionMiddleware";
import { initializeApp } from "firebase/app";

export default async function getFirebaseConfig() {

  const firebaseConfig = await apiFunctionMiddleware<FirebaseOptions>({
    method: "GET",
    url: "api/firebase"
  });
  if (typeof firebaseConfig === "string") {
    return firebaseConfig;
  }
  else {
    initializeApp(firebaseConfig);
    return;
  }

}