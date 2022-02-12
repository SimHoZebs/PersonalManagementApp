import { useEffect } from "react";
import { useStoreActions, useStoreState } from "../../../lib/globalState";
import Head from "next/head";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

//components
import Goal from "../../../lib/components/Goal";

//etc
import readUser from "../../../lib/api/readUser";
import SideMenu from "../../../lib/components/SideMenu";
import addUserDefaults from "../../../lib/functions/addUserDefaults";
import Skeleton from "../../../lib/components/Skeleton";

/**
 * displays user dashboard.
 */
export default function Dashboard(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const userTitle = useStoreState((state) => state.user?.title);
  const setUser = useStoreActions((actions) => actions.setUser);
  const userId = useStoreState((state) => state.user?._id);
  const lastViewedGoalId = useStoreState(
    (state) => state.user?.lastViewedGoalId
  );

  useEffect(() => {
    if (props.user) {
      setUser(props.user);
    }
  }, [props.user, setUser]);

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
          <p className="text-xs">Hello, {userTitle}</p>
          {lastViewedGoalId && userId ? (
            <Goal userId={userId} lastViewedGoalId={lastViewedGoalId} />
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

    const readUserRes = await readUser(userId);
    if (readUserRes instanceof Error) {
      throw readUserRes;
    } else if (readUserRes === null) {
      //route back to login screen?
      throw new Error(`User with id ${userId} does not exist.`);
    }

    let user = readUserRes;

    if (user.goalIdArray.length === 0) {
      const addUserDefaultsRes = await addUserDefaults(userId);
      if (addUserDefaultsRes instanceof Error) {
        throw addUserDefaultsRes;
      }
      user = addUserDefaultsRes;
    }

    return { props: { user } };
  } catch (error) {
    console.log(error instanceof Error ? error.message : error);
    return { props: { user: undefined } };
  }
};
