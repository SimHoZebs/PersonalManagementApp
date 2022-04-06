import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {}

const IconButton = (props: Props) => {
  const { children, className, ...rest } = props;

  return (
    <button
      className={
        "flex font-medium text-xs focus:outline-none gap-x-1 duration-100 items-center " +
        className
      }
      {...rest}
    >
      {children}
    </button>
  );
};

export default IconButton;
