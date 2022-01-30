import { useState } from "react";

const ContextMenuBase = (props: React.HTMLAttributes<HTMLUListElement>) => {
  const [contextMenuHidden, setContextMenuHidden] = useState(true);
  const { className, ...rest } = props;

  return (
    <ul
      className={
        "absolute bg-dark-300 px-2 py-1 text-xs flex flex-col gap-y-1 shadow shadow-dark-900 rounded" +
        props.className
      }
      //inline styles because windi can't make styles on demand after build
      {...rest}
    >
      {props.children}
    </ul>
  );
};

export default ContextMenuBase;
