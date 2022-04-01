import { useEffect, useRef, useState } from "react";
import { useStoreActions, useStoreState } from "../globalState";
import ContextMenuBase from "./ContextMenuBase";

const ContextMenu = () => {
  const moreContextMenuOptions = useStoreState(
    (state) => state.moreContextMenuOptions
  );
  const setMoreContextMenuOptions = useStoreActions(
    (a) => a.setMoreContextMenuOptions
  );

  const contextMenuVisible = useStoreState((s) => s.contextMenuVisible);
  const toggleContextMenuVisibility = useStoreActions(
    (a) => a.toggleContextMenuVisibility
  );

  const [contextMenuCoords, setContextMenuCoords] = useState<[number, number]>([
    0, 0,
  ]);

  const contextMenuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function showContextMenu(e: MouseEvent) {
      e.preventDefault();

      setContextMenuCoords((prev) => [e.clientX, e.clientY]);
      toggleContextMenuVisibility();

      contextMenuRef.current?.focus();
    }

    window.addEventListener("contextmenu", showContextMenu);

    return () => {
      window.removeEventListener("contextmenu", showContextMenu);
    };
  }, [toggleContextMenuVisibility]);

  return (
    <ContextMenuBase
      tabIndex={0}
      onBlur={() => {
        toggleContextMenuVisibility();
        setMoreContextMenuOptions([]);
      }}
      ref={contextMenuRef}
      className={`${contextMenuVisible ? " hidden" : ""}`}
      //inline styles because windi can't make styles on demand after build
      style={{
        transform: `translateX(${contextMenuCoords[0]}px) translateY(${contextMenuCoords[1]}px)`,
      }}
    >
      {moreContextMenuOptions.map((option, index) => (
        <li key={index} tabIndex={0}>
          <button onClick={option.function}>{option.name}</button>
        </li>
      ))}
    </ContextMenuBase>
  );
};

export default ContextMenu;
