import Image from "next/image";

interface Props {
  imgSize?: number;
  textSize?: string;
}

const Logo = (props: Props) => {
  return (
    <div className="flex flex-row items-center gap-x-1">
      <Image
        src="/favicon.png"
        width={props.imgSize || 36}
        height={props.imgSize || 36}
        alt="LifeOrb"
      />
      <p className={`${props.textSize || "text-xl"} ` + "font-medium"}>
        LifeOrb
      </p>
    </div>
  );
};

export default Logo;
