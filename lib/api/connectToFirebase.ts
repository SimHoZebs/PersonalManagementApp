import { FirebaseOptions } from "firebase/app";
import apiFunctionHelper from "../apiFunctionHelper";
import { initializeApp } from "firebase/app";

export default async function getFirebaseConfig() {

  const firebaseConfig = await apiFunctionHelper<FirebaseOptions>({
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