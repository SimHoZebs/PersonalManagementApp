import CrystalBall from "../icons/CrystalBall";

const Logo = () => {
  return (
    <div className="flex flex-row gap-x-1 items-center">
      <div className="text-blue-400 h-9 w-9">
        <CrystalBall />
      </div>
      <p className="font-medium text-xl">LifeOrb</p>
    </div>
  );
};

export default Logo;
