import { useRouter } from "next/router";
import { useEffect } from "react";

import readUser from "../lib/api/readUser";
import createUser from "../lib/api/createUser";
import { UserSchema } from "../lib/schema/UserSchema";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    async function initPreviewUser() {
      let user: UserSchema;

      const previewIdInLocalStorage = localStorage.getItem("userId");
      if (previewIdInLocalStorage) {
        const readUserRes = await readUser(previewIdInLocalStorage);
        if (typeof readUserRes === "string") {
          console.log(readUserRes);
          return;
        } else if (readUserRes === null) {
          const createUserRes = await createUser("preview");
          if (typeof createUserRes === "string") {
            return createUserRes;
          }

          localStorage.setItem("userId", createUserRes._id);
          user = createUserRes;
          return;
        }

        user = readUserRes;
      } else {
        const createUserRes = await createUser("preview");
        if (typeof createUserRes === "string") {
          return createUserRes;
        }
        user = createUserRes;
        localStorage.setItem("userId", createUserRes._id);
      }

      router.push({
        pathname: `/user/${user._id}`,
      });
    }

    initPreviewUser();
  }, []);

  return <div>loading preview profile...</div>;
}
