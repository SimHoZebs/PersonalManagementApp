import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {}

export default function Button({ children, className, ...rest }: Props) {
  return (
    <button
      className={`text-blue-400 rounded font-medium p-2 text-sm hover:(bg-opacity-10 bg-blue-300) ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
