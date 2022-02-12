import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {}

const IconButton = (props: Props) => {
  const { children, className, ...rest } = props;

  return (
    <button
      className={
        "hover:bg-dark-300 flex rounded-full p-2 focus:outline-none " +
        className
      }
      {...rest}
    >
      {children}
    </button>
  );
};

export default IconButton;
