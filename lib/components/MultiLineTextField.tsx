import React, { TextareaHTMLAttributes, useEffect, useRef } from "react";
import { useStoreActions, useStoreState } from "../globalState";
import narrowType from "../helper/narrowType";
import { TaskDoc } from "../task/types";
import Skeleton from "./Skeleton";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  defaultText: string;
}

const MultiLineTextField = (props: Props) => {
  const user = useStoreState((state) => state.user);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { className, onChange, ...rest } = props;

  function resizeTextArea() {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "0px";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }

  useEffect(() => {
    window.addEventListener("resize", resizeTextArea);
    return () => {
      window.removeEventListener("resize", resizeTextArea);
    };
  }, [textAreaRef]);

  return narrowType<TaskDoc>(user) ? (
    <textarea
      ref={textAreaRef}
      cols={props.defaultText.length <= 15 ? 15 : props.defaultText.length}
      wrap="soft"
      className="hover:bg-dark-300 focus-visible:(outline-transparent bg-dark-200) min-h-1 resize-none rounded bg-transparent px-2 py-1 text-xl"
      onChange={(e) => {
        if (onChange) onChange(e);

        if (textAreaRef.current) {
          textAreaRef.current.style.height = "0px";
          textAreaRef.current.style.height =
            textAreaRef.current.scrollHeight + "px";
        }
      }}
      {...rest}
    />
  ) : (
    <Skeleton />
  );
};

export default MultiLineTextField;
