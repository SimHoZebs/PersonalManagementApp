import { ForwardedRef, forwardRef } from "react";

const ContextMenuBase = (
  props: React.HTMLAttributes<HTMLUListElement>,
  ref: ForwardedRef<HTMLUListElement>
) => {
  const { className, ...rest } = props;

  return (
    <ul
      ref={ref}
      className={
        "bg-dark-300 shadow-dark-900 absolute flex flex-col gap-y-1 rounded px-2 py-1 text-xs shadow outline-none " +
        props.className
      }
      {...rest}
    >
      {props.children}
    </ul>
  );
};

export default forwardRef(ContextMenuBase);
