import { useEffect, useRef, useState } from "react";
import { useStoreActions, useStoreState } from "../globalState";

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

  const contextMenuCoords = useStoreState((s) => s.contextMenuCoords);
  const setContextMenuCoords = useStoreActions((a) => a.setContextMenuCoords);

  const contextMenuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function showContextMenu(e: MouseEvent) {
      e.preventDefault();

      setContextMenuCoords([e.clientX, e.clientY]);
      toggleContextMenuVisibility();
    }

    window.addEventListener("contextmenu", showContextMenu);

    return () => {
      window.removeEventListener("contextmenu", showContextMenu);
    };
  }, [toggleContextMenuVisibility, setContextMenuCoords]);

  useEffect(() => {
    if (!(contextMenuRef.current && contextMenuVisible)) return;

    contextMenuRef.current.focus();
  }, [contextMenuVisible]);

  return (
    <ul
      tabIndex={0}
      ref={contextMenuRef}
      onBlur={() => {
        toggleContextMenuVisibility();
        setMoreContextMenuOptions([]);
      }}
      className={
        "bg-dark-300 shadow-dark-900 absolute flex flex-col gap-y-1 rounded px-2 py-1 text-xs shadow outline-none " +
        `${contextMenuVisible ? "" : " hidden"}`
      }
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
    </ul>
  );
};

export default ContextMenu;
