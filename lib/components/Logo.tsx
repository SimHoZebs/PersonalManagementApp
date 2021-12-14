import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex flex-row gap-x-1 items-center">
      <Image src="/favicon.png" width={36} height={36} alt="" />
      <p className="font-medium text-xl">LifeOrb</p>
    </div>
  );
};

export default Logo;
