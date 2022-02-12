import { useState } from "react";

const ContextMenuBase = (props: React.HTMLAttributes<HTMLUListElement>) => {
  const [contextMenuHidden, setContextMenuHidden] = useState(true);
  const { className, ...rest } = props;

  return (
    <ul
      className={
        "bg-dark-300 shadow-dark-900 absolute flex flex-col gap-y-1 rounded px-2 py-1 text-xs shadow" +
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
