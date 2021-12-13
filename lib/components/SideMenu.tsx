import { useRouter } from "next/router";

//components
import ListIcon from "../icons/ListIcon";
import Login from "../icons/Login";
import Logo from "./Logo";

import isLoaded from "../isLoaded";
import Button from "./Button";

interface Props {
  currListName: string | undefined;
}

const SideMenu = (props: Props) => {
  const router = useRouter();

  async function login() {
    const user = await (await import("../functions/authentication")).default();
    if (!(user instanceof Error)) {
      router.push(`/user/${user._id}`);
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
            {isLoaded(props.currListName) ? (
              <li>
                <button className="w-full flex flex-row gap-x-1 items-center hover:bg-dark-300 py-2 px-1">
                  <div className="h-6 w-6">
                    <ListIcon />
                  </div>
                  <p>{props.currListName}</p>
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
          <div className="h-6 w-6 ">
            <Login />
          </div>
          <p className="font-medium text-sm">LOGIN</p>
        </Button>
      </div>
    </div>
  );
};

export default SideMenu;
