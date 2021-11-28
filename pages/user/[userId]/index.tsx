import { createContext, useEffect, useState } from "react";
import Head from "next/head";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

import isLoaded from "../../../lib/isLoaded";

//components
import List from "../../../lib/components/List";
import Skeleton from "../../../lib/components/Skeleton";

//API functions
import readUser from "../../../lib/api/readUser";
import addListId from "../../../lib/api/addListId";
import createList from "../../../lib/api/createList";
import updateSelectedListId from "../../../lib/api/updateSelectedListId";

//schema and interfaces
import { UserSchema } from "../../../lib/schema/UserSchema";
import { ListSchema } from "../../../lib/schema/ListSchema";
import SideMenu from "../../../lib/components/SideMenu";

export const UserContext = createContext<UserSchema | undefined>(undefined);

/**
 * displays user dashboard.
 */
export default function Dashboard(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const [user, setUser] = useState<UserSchema | undefined>();
  const [currListName, setCurrListName] = useState<string | undefined>();

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  return (
    <>
      <Head>
        <title>Dashboard - AnotherToDoApp</title>
      </Head>

      <div className="flex flex-row">
        <div className="w-1/4 max-w-xs">
          <SideMenu currListName={currListName} />
        </div>

        <div className="flex flex-col gap-y-1 p-2 w-3/4">
          {isLoaded<UserSchema>(user) ? (
            <UserContext.Provider value={user}>
              <p className="text-xs">Hello, {user?.username}</p>
              <List
                listId={user.selectedListId}
                currListName={currListName}
                setCurrListName={setCurrListName}
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
  /**
   * Creates a list and adds it to a user.
   * Sets that list as selected list.
   * @returns userSchema; The user the temp defaults were applied.
   * @returns string; if any error occurs.
   */
  async function addTempDefaults(userId: string) {
    let createdList: ListSchema;
    const createListRes = await createList(userId, "Welcome!");
    if (typeof createListRes === "string") {
      return createListRes;
    }
    createdList = createListRes;

    const addListIdRes = await addListId(userId, createdList._id);
    if (typeof addListIdRes === "string") {
      return addListIdRes;
    }

    const updateSelectedListIdRes = await updateSelectedListId(
      userId,
      createListRes._id
    );
    return updateSelectedListIdRes;
  }

  try {
    const userId = context.query.userId;
    if (typeof userId !== "string") {
      throw new Error("userId is not a string");
    }

    const readUserRes = await readUser(userId);
    if (typeof readUserRes === "string") {
      throw new Error(readUserRes);
    }
    if (readUserRes === null) {
      //route back to login screen?
      throw new Error(`User with id ${userId} does not exist.`);
    }

    let user = readUserRes;

    if (user.listIdArray.length === 0) {
      const addTempDefaultsRes = await addTempDefaults(userId);
      if (typeof addTempDefaultsRes === "string") {
        throw new Error(addTempDefaultsRes);
      }
      user = addTempDefaultsRes;
    }

    return { props: { user } };
  } catch (error) {
    console.log(error instanceof Error ? error.message : error);
    return { props: { user: undefined } };
  }
};
