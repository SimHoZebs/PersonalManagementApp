import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex flex-row items-center gap-x-1">
      <Image src="/favicon.png" width={36} height={36} alt="" />
      <p className="text-xl font-medium">LifeOrb</p>
    </div>
  );
};

export default Logo;
