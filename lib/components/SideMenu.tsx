import { useRouter } from "next/router";
import { Icon } from "@iconify/react";

//components
import Logo from "./Logo";
import Button from "./Button";

const SideMenu = () => {
  const router = useRouter();

  async function login() {
    const user = await (
      await import("../third-party/authentication")
    ).default();
    if (!(user instanceof Error) && user) {
      router.push(`/app/${user._id}`);
    }
  }

  return (
    <aside className="bg-dark-700 shadow-dark-900 h-screen p-3 shadow">
      <div className="flex h-full flex-col items-center justify-between">
        <div className="flex w-full flex-col gap-y-5">
          <div className="self-center">
            <Logo />
          </div>
        </div>

        <Button
          className="border-1 flex flex-row items-center gap-x-2 border-blue-400 px-2 py-1"
          onClick={login}
        >
          <Icon icon="mdi:login" className="h-6 w-6" />
          <p className="text-sm font-medium">LOGIN</p>
        </Button>
      </div>
    </aside>
  );
};

export default SideMenu;
