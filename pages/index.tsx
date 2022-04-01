import { useRouter } from "next/router";

//apis & schemas
import Button from "../lib/components/Button";
import Logo from "../lib/components/Logo";

export default function Index() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center gap-y-3 p-10">
      <div className="flex flex-col items-center gap-y-3 p-10">
        <h1 className="flex items-center gap-x-1">
          <Logo imgSize={56} textSize={"text-4xl"} />
        </h1>
        <h2 className="text-xl">Your personal management system</h2>
      </div>
      <Button
        className="border border-primary"
        onClick={() =>
          router.push({
            pathname: `/app/000000000000`,
          })
        }
      >
        Preview the app without log in
      </Button>
      or
      <Button
        className="border border-primary"
        onClick={async () => {
          const user = await (
            await import("../lib/third-party/authentication")
          ).default();
          if (!(user instanceof Error) && user) {
            router.push(`/app/${user._id}`);
          }
        }}
      >
        Log in/sign up with Google
      </Button>
    </div>
  );
}
