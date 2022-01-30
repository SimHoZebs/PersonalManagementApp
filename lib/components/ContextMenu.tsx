import { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "../globalState";
import ContextMenuBase from "./ContextMenuBase";

const ContextMenu = () => {
  const moreContextMenuOptions = useStoreState(
    (state) => state.moreContextMenuOptions
  );
  const setMoreContextMenuOptions = useStoreActions(
    (actions) => actions.setMoreContextMenuOptions
  );
  const [contextMenuHidden, setContextMenuHidden] = useState(true);
  const [contextMenuCoords, setContextMenuCoords] = useState([0, 0]);

  useEffect(() => {
    function showContextMenu(e: MouseEvent) {
      e.preventDefault();

      setContextMenuCoords((prev) => [e.clientX, e.clientY]);
      setContextMenuHidden(false);
    }

    function hideContextMenu(e: MouseEvent) {
      setContextMenuHidden((prev) => true);
      setMoreContextMenuOptions([]);
    }
    window.addEventListener("contextmenu", showContextMenu);
    window.addEventListener("click", hideContextMenu);

    return () => {
      window.removeEventListener("contextmenu", showContextMenu);
      window.removeEventListener("click", hideContextMenu);
    };
  }, [moreContextMenuOptions, setMoreContextMenuOptions]);

  return (
    <ContextMenuBase
      className={`${contextMenuHidden ? " hidden" : ""}`}
      //inline styles because windi can't make styles on demand after build
      style={{
        transform: `translateX(${contextMenuCoords[0]}px) translateY(${contextMenuCoords[1]}px)`,
      }}
    >
      {moreContextMenuOptions.map((option, index) => (
        <li key={index}>
          <button onClick={option.function}>{option.name}</button>
        </li>
      ))}
    </ContextMenuBase>
  );
};

export default ContextMenu;
