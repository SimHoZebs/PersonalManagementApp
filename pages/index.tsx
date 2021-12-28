import { useRouter } from "next/router";
import { useEffect } from "react";

//apis & schemas
import readUser from "../lib/api/readUser";
import createUser from "../lib/api/createUser";
import { UserProps } from "../lib/schema/UserSchema";
import connectToDB from "../lib/api/connectToDB";
import { InferGetServerSidePropsType } from "next";

export default function Index(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();

  useEffect(() => {
    router.push({
      pathname: `/app/${props.userId}`,
    });
  }, [props.userId, router]);

  return <div>Loading app...</div>;
}

//Creates preview user or loads existing preview user and redirects to its userId.
//In the future, this should read browser cookies/localStorage and load the userId from there.
export const getServerSideProps = async () => {
  const PREVIEW_USERID = "preview";
  const PREVIEW_USERNAME = "preview";

  try {
    const connectToDBRes = await connectToDB();
    if (connectToDBRes instanceof Error) throw connectToDBRes;

    let user: UserProps;

    const readUserRes = await readUser(PREVIEW_USERID);
    if (readUserRes instanceof Error) throw readUserRes;

    if (readUserRes === null) {
      const createUserRes = await createUser(PREVIEW_USERID, PREVIEW_USERNAME);
      if (createUserRes instanceof Error) throw createUserRes;

      user = createUserRes;
    } else {
      user = readUserRes;
    }
    return { props: { userId: user._id } };
  } catch (error) {
    console.log(error instanceof Error ? error.message : error);
    return { props: { userId: undefined } };
  }
};
