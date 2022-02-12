import { useRouter } from "next/router";
import { Icon } from "@iconify/react";

//components
import Logo from "./Logo";

import isLoaded from "../isLoaded";
import Button from "./Button";
import { useStoreState } from "../globalState";

const SideMenu = () => {
  const currGoalTitle = useStoreState((state) => state.goalProps?.title);
  const router = useRouter();

  async function login() {
    const user = await (await import("../functions/authentication")).default();
    if (!(user instanceof Error)) {
      router.push(`/app/${user._id}`);
    }
  }

  return (
    <div className="bg-dark-700 shadow-dark-900 h-screen p-3 shadow">
      <div className="flex h-full flex-col items-center justify-between">
        <div className="flex w-full flex-col gap-y-5">
          <div className="self-center">
            <Logo />
          </div>

          <ol>
            {isLoaded(currGoalTitle) ? (
              <li>
                <button className="hover:bg-dark-300 flex w-full flex-row items-center gap-x-1 rounded py-2 px-1">
                  <Icon
                    icon="mdi:format-goal-bulleted-type"
                    className="h-6 w-6"
                  />
                  <p>{currGoalTitle}</p>
                </button>
              </li>
            ) : (
              <div className="bg-dark-300 h-8 w-full animate-pulse"></div>
            )}
          </ol>
        </div>

        <Button
          className="border-1 flex flex-row items-center gap-x-2 border-blue-400 px-2 py-1"
          onClick={login}
        >
          <Icon icon="mdi:login" className="h-6 w-6" />
          <p className="text-sm font-medium">LOGIN</p>
        </Button>
      </div>
    </div>
  );
};

export default SideMenu;
