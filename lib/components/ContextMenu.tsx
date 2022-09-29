import { useEffect, useRef } from "react";
import { useStoreActions, useStoreState } from "../globalState";

const ContextMenu = () => {
  const moreContextMenuOptions = useStoreState(
    (state) => state.moreContextMenuOptions
  );
  const setMoreContextMenuOptions = useStoreActions(
    (a) => a.setMoreContextMenuOptions
  );

  const contextMenuVisible = useStoreState((s) => s.contextMenuVisible);
  const setContextMenuVisibility = useStoreActions(
    (a) => a.setContextMenuVisibility
  );

  const contextMenuCoords = useStoreState((s) => s.contextMenuCoords);
  const setContextMenuCoords = useStoreActions((a) => a.setContextMenuCoords);

  const contextMenuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function showContextMenu(e: MouseEvent) {
      e.preventDefault();
      setContextMenuCoords([e.clientX, e.clientY]);
      setContextMenuVisibility(true);
    }

    function clickOutsideContextMenu() {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(document.activeElement) &&
        contextMenuVisible
      ) {
        setContextMenuVisibility(false);
      }
    }

    window.addEventListener("contextmenu", showContextMenu);
    window.addEventListener("click", clickOutsideContextMenu);

    return () => {
      window.removeEventListener("contextmenu", showContextMenu);
      window.removeEventListener("click", clickOutsideContextMenu);
    };
  }, [setContextMenuVisibility, setContextMenuCoords, contextMenuVisible]);

  useEffect(() => {
    if (!(contextMenuRef.current && contextMenuVisible)) return;
    contextMenuRef.current.focus();
  }, [contextMenuVisible]);

  return (
    <ul
      tabIndex={0}
      ref={contextMenuRef}
      className={
        "bg-dark-300 z-50 shadow-dark-900 absolute flex flex-col gap-y-1 rounded px-2 py-1 text-xs shadow outline-none " +
        `${contextMenuVisible ? "" : "hidden"}`
      }
      //inline styles because windi can't make styles on demand after build
      style={{
        transform: `translateX(${contextMenuCoords[0]}px) translateY(${contextMenuCoords[1]}px)`,
      }}
    >
      {moreContextMenuOptions.map((option, index) => (
        <li key={index}>
          <button
            onClick={() => {
              option.function();
              setContextMenuVisibility(false);
              setMoreContextMenuOptions([]);
            }}
          >
            {option.name}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContextMenu;
