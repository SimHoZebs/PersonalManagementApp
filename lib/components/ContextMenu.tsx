import { useEffect, useState } from "react";

const ContextMenu = () => {
  const [contextMenuHidden, setContextMenuHidden] = useState(true);
  const [contextMenuCoords, setContextMenuCoords] = useState([0, 0]);

  function showContextMenu(e: MouseEvent) {
    e.preventDefault();

    setContextMenuCoords((prev) => [e.clientX, e.clientY]);
    setContextMenuHidden(false);
  }

  function hideContextMenu(e: MouseEvent) {
    setContextMenuHidden((prev) => true);
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
        "absolute bg-dark-500 px-2 py-1 text-xs" +
        `${contextMenuHidden ? " hidden" : ""}`
      }
      //inline styles because windi can't make styles on demand after build
      style={{
        transform: `translateX(${contextMenuCoords[0]}px) translateY(${contextMenuCoords[1]}px)`,
      }}
    >
      <li>Duplicate</li>
      <li>Delete</li>
    </ul>
  );
};

export default ContextMenu;
