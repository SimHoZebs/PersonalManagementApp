import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {}

export default function Button({ children, className, ...rest }: Props) {
  return (
    <button
      className={
        "rounded py-1 px-2 text-sm tracking-wide font-medium bg-primary " +
        className
      }
      {...rest}
    >
      {children}
    </button>
  );
}
