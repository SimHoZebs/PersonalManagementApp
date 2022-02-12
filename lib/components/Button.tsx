import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {}

export default function Button({ children, className, ...rest }: Props) {
  return (
    <button
      className={`hover:(bg-opacity-10 bg-blue-300) rounded p-2 text-sm font-medium text-blue-400 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
