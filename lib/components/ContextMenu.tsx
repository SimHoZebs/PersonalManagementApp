import { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "../globalState";

const ContextMenu = () => {
  const moreContextMenuOptions = useStoreState(
    (state) => state.moreContextMenuOptions
  );
  const setMoreContextMenuOptions = useStoreActions(
    (actions) => actions.setMoreContextMenuOptions
  );
  const [contextMenuHidden, setContextMenuHidden] = useState(true);
  const [contextMenuCoords, setContextMenuCoords] = useState([0, 0]);

  function showContextMenu(e: MouseEvent) {
    if (moreContextMenuOptions.length === 0) return;
    e.preventDefault();

    setContextMenuCoords((prev) => [e.clientX, e.clientY]);
    setContextMenuHidden(false);
  }

  function hideContextMenu(e: MouseEvent) {
    setContextMenuHidden((prev) => true);
    setMoreContextMenuOptions([]);
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
        "absolute bg-dark-500 px-2 py-1 text-xs flex flex-col gap-y-1 shadow shadow-dark-900" +
        `${contextMenuHidden ? " hidden" : ""}`
      }
      //inline styles because windi can't make styles on demand after build
      style={{
        transform: `translateX(${contextMenuCoords[0]}px) translateY(${contextMenuCoords[1]}px)`,
      }}
    >
      {moreContextMenuOptions.map((option, index) => (
        <li key={index}>
          <button onClick={option.function}>{option.option}</button>
        </li>
      ))}
    </ul>
  );
};

export default ContextMenu;
