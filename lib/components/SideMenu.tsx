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
    <aside className="h-screen bg-dark-700 shadow p-3 shadow-dark-900">
      <div className="flex flex-col h-full items-center justify-between">
        <div className="flex flex-col w-full gap-y-5">
          <div className="self-center">
            <Logo />
          </div>
        </div>

        <Button
          className="border-primary flex flex-row border-1 py-1 px-2 gap-x-2 items-center"
          onClick={login}
        >
          <Icon icon="mdi:login" className="h-6 w-6" />
          <p className="font-medium text-sm">LOGIN</p>
        </Button>
      </div>
    </aside>
  );
};

export default SideMenu;
