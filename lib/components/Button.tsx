import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {}

export default function Button(props: Props) {
  return (
    <button
      {...props}
      className={
        "rounded py-1 px-2 text-sm duration-100 font-medium bg-primary hover:(bg-primary-hover text-light-50) " +
        props.className
      }
    >
      {props.children}
    </button>
  );
}
