import { useEffect } from "react";
import { useStoreActions, useStoreState } from "../../../lib/globalState";
import Head from "next/head";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { WithId } from "mongodb";

//components
import TaskPanel from "../../../lib/task/TaskPanel";

//etc
import readUser from "../../../lib/user/readUser";
import Skeleton from "../../../lib/components/Skeleton";
import createUser from "../../../lib/user/createUser";
import { UserDoc } from "../../../lib/user/types";
import CreateTaskView from "../../../lib/task/functions/CreateTaskView";
import { Status } from "../../../lib/task/types";

/**
 * displays user dashboard.
 */
export default function Dashboard(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const setUser = useStoreActions((actions) => actions.setUser);
  const user = useStoreState((state) => state.user);

  const taskArray = useStoreState((s) => s.taskArray);
  const setTaskArray = useStoreActions((actions) => actions.setTaskArray);

  const statusArray: Status[] = ["On going", "Planned"];

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
        <CreateTaskView />

        <div className="flex flex-col p-2 w-3/4 gap-y-1">
          <p className="text-xs">Hello, {user?.name}</p>
          {user ? (
            <main className="flex gap-x-8">
              {statusArray.map((status, index) => (
                <TaskPanel
                  taskArray={taskArray.filter((task) => task.status === status)}
                  key={index}
                  status={status}
                  userId={user._id.toString()}
                />
              ))}
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
