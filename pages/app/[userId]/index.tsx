import { useEffect } from "react";
import { useStoreActions, useStoreState } from "../../../lib/globalState";
import Head from "next/head";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { WithId } from "mongodb";

//components
import TaskPanel from "../../../lib/components/TaskPanel";

//etc
import readUser from "../../../lib/api/readUser";
import SideMenu from "../../../lib/components/SideMenu";
import Skeleton from "../../../lib/components/Skeleton";
import createUser from "../../../lib/api/createUser";
import { UserDoc } from "../../../lib/types/user";

/**
 * displays user dashboard.
 */
export default function Dashboard(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const setUser = useStoreActions((actions) => actions.setUser);
  const user = useStoreState((state) => state.user);
  const setTaskArray = useStoreActions((actions) => actions.setTaskArray);

  useEffect(() => {
    if (props.user) {
      const { taskArray, ...rest } = props.user;
      setUser(rest);
      setTaskArray(taskArray);
    }
  }, [props.user, setTaskArray, setUser]);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <div className="flex flex-row">
        <div className="w-1/4 max-w-xs">
          <SideMenu />
        </div>

        <div className="flex w-3/4 flex-col gap-y-1 p-2">
          <p className="text-xs">Hello, {user?.name}</p>
          {user ? (
            <main className="flex gap-x-8">
              <TaskPanel status="On going" userId={user._id.toString()} />
              <TaskPanel status="Planned" userId={user._id.toString()} />
            </main>
          ) : (
            <Skeleton />
          )}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const userId = context.query.userId;
    if (typeof userId !== "string") {
      throw new Error("userId is not a string");
    }

    let user: WithId<UserDoc>;

    const readUserRes = await readUser(userId);
    if (readUserRes instanceof Error) throw readUserRes;

    if (readUserRes === null) {
      if (userId === "0") {
        const createUserRes = await createUser("preview", "000000000000");
        if (createUserRes instanceof Error || createUserRes === undefined)
          //Potentially returns just undefinded. fix it
          throw createUserRes;

        const readUserRes = await readUser(userId);
        if (readUserRes instanceof Error || readUserRes === null)
          //Potentially returns just null. fix it
          throw readUserRes;

        user = readUserRes;
      } else {
        //route back to login screen?
        throw new Error(`User with id ${userId} does not exist.`);
      }
    } else {
      user = readUserRes;
    }

    return { props: { user } };
  } catch (error) {
    console.log(error instanceof Error ? error.message : "error", error);
    return { props: { user: null } };
  }
};
