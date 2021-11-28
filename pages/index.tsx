import { useRouter } from "next/router";
import { useEffect } from "react";

//apis & schemas
import readUser from "../lib/api/readUser";
import createUser from "../lib/api/createUser";
import { UserSchema } from "../lib/schema/UserSchema";
import connectToDB from "../lib/api/connectToDB";
import { InferGetServerSidePropsType } from "next";

const PREVIEW_USERID = "preview";
const PREVIEW_USERNAME = "preview";

export default function Index(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();

  useEffect(() => {
    /**
     * Makes connection with DB. Uses userId from localStorage to get user data. Creates a new one if it doesn't exist.
     */
    router.push({
      pathname: `/user/${props.user?._id}`,
    });
  }, [props.user?._id, router]);

  return <div>Loading app...</div>;
}

export async function getServerSideProps() {
  try {
    const connectToDBRes = await connectToDB();
    if (connectToDBRes instanceof Error) {
      throw connectToDBRes;
    }

    let user: UserSchema;

    const readUserRes = await readUser(PREVIEW_USERID);
    if (readUserRes instanceof Error) {
      throw readUserRes;
    }

    if (readUserRes === null) {
      const createUserRes = await createUser(PREVIEW_USERID, PREVIEW_USERNAME);
      if (createUserRes instanceof Error) {
        throw createUserRes;
      }

      user = createUserRes;
    } else {
      user = readUserRes;
    }
    return { props: { user } };
  } catch (error) {
    console.log(error instanceof Error ? error.message : error);
    return { props: { user: undefined } };
  }
}
