import { useRouter } from "next/router";
import { Icon } from "@iconify/react";

//components
import Logo from "./Logo";

import isLoaded from "../isLoaded";
import Button from "./Button";
import { useStoreState } from "../../pages/_app";

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
    <div className="h-screen p-3 bg-dark-700">
      <div className="flex flex-col h-full items-center justify-between">
        <div className="flex flex-col gap-y-5 w-full">
          <div className="self-center">
            <Logo />
          </div>

          <ol>
            {isLoaded(currGoalTitle) ? (
              <li>
                <button className="w-full flex flex-row gap-x-1 items-center hover:bg-dark-300 py-2 px-1">
                  <Icon
                    icon="mdi:format-goal-bulleted-type"
                    className="w-6 h-6"
                  />
                  <p>{currGoalTitle}</p>
                </button>
              </li>
            ) : (
              <div className="animate-pulse bg-dark-300 w-full h-8"></div>
            )}
          </ol>
        </div>

        <Button
          className="flex flex-row border-1 px-2 py-1 gap-x-2 border-blue-400 items-center"
          onClick={login}
        >
          <Icon icon="mdi:login" className="w-6 h-6" />
          <p className="font-medium text-sm">LOGIN</p>
        </Button>
      </div>
    </div>
  );
};

export default SideMenu;
