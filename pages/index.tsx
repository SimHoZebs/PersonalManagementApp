import { useRouter } from "next/router";

//apis & schemas
import connectToDB from "../lib/api/connectToDB";
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
        className="border border-blue-400"
        onClick={() =>
          router.push({
            pathname: `/app/preview`,
          })
        }
      >
        Click me to try a preview without logging in
      </Button>
      <Button
        className="border border-blue-400"
        onClick={async () => {
          const user = await (
            await import("../lib/functions/authentication")
          ).default();
          if (!(user instanceof Error)) {
            router.push(`/app/${user._id}`);
          }
        }}
      >
        Or, login/sign up
      </Button>
    </div>
  );
}

//Creates preview user or loads existing preview user and redirects to its userId.
//In the future, this should read browser cookies/localStorage and load the userId from there.
export const getServerSideProps = async () => {
  try {
    const connectToDBRes = await connectToDB();
    if (connectToDBRes instanceof Error) throw connectToDBRes;
  } catch (error) {
    console.log(error instanceof Error ? error.message : error);
  }
  return { props: {} };
};
