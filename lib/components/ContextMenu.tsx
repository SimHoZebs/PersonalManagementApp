import { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "../globalState";

const ContextMenu = () => {
  const moreOptions = useStoreState((state) => state.moreOptions);
  const setMoreOptions = useStoreActions((actions) => actions.setMoreOptions);
  const [contextMenuHidden, setContextMenuHidden] = useState(true);
  const [contextMenuCoords, setContextMenuCoords] = useState([0, 0]);

  function showContextMenu(e: MouseEvent) {
    e.preventDefault();

    setContextMenuCoords((prev) => [e.clientX, e.clientY]);
    setContextMenuHidden(false);
  }

  function hideContextMenu(e: MouseEvent) {
    setContextMenuHidden((prev) => true);
    setMoreOptions([]);
  }

  useEffect(() => {
    window.addEventListener("contextmenu", showContextMenu);
    window.addEventListener("click", hideContextMenu);

    return () => {
      window.removeEventListener("contextmenu", showContextMenu);
      window.removeEventListener("click", hideContextMenu);
    };
  }, []);

  return (
    <ul
      className={
        "absolute bg-dark-500 px-2 py-1 text-xs flex flex-col gap-y-1" +
        `${contextMenuHidden ? " hidden" : ""}`
      }
      //inline styles because windi can't make styles on demand after build
      style={{
        transform: `translateX(${contextMenuCoords[0]}px) translateY(${contextMenuCoords[1]}px)`,
      }}
    >
      {moreOptions.map((option, index) => (
        <li key={index}>
          <button onClick={option.function}>{option.option}</button>
        </li>
      ))}
    </ul>
  );
};

export default ContextMenu;
