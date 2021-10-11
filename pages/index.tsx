import { useRouter } from "next/router";
import { useEffect } from "react";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_VERCEL_URL == undefined) {
      console.log("NEXT_PUBLIC_VERCEL_URL is undefined");
      return;
    }
    router.push(`${process.env.NEXT_PUBLIC_VERCEL_URL}/login`);
  }, [router]);

  return <div>redirecting to proper website</div>;
};

export default Index;
