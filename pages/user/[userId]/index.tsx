import { createContext, useEffect, useState } from "react";
import Head from "next/head";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

//components
import List from "../../../lib/components/List";
import Skeleton from "../../../lib/components/Skeleton";

//etc
import readUser from "../../../lib/api/readUser";
import { UserSchema } from "../../../lib/schema/UserSchema";
import SideMenu from "../../../lib/components/SideMenu";
import addUserDefaults from "../../../lib/functions/addUserDefaults";
import isLoaded from "../../../lib/isLoaded";

export const UserContext = createContext<UserSchema | undefined>(undefined);

/**
 * displays user dashboard.
 */
export default function Dashboard(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const [user, setUser] = useState<UserSchema | undefined>();
  const [currListTitle, setCurrListTitle] = useState<string | undefined>();

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <div className="flex flex-row">
        <div className="w-1/4 max-w-xs">
          <SideMenu currListTitle={currListTitle} />
        </div>

        <div className="flex flex-col gap-y-1 p-2 w-3/4">
          {isLoaded<UserSchema>(user) ? (
            <UserContext.Provider value={user}>
              <p className="text-xs">Hello, {user?.title}</p>
              <List
                listId={user.selectedListId}
                currListTitle={currListTitle}
                setCurrListTitle={setCurrListTitle}
              />
            </UserContext.Provider>
          ) : (
            <Skeleton className="h-3 w-36" />
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

    if (user.listIdArray.length === 0) {
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
