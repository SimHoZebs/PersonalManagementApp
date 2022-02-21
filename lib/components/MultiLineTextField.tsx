import React, { TextareaHTMLAttributes, useEffect, useRef } from "react";
import { useStoreActions, useStoreState } from "../globalState";
import narrowType from "../narrowType";
import { GoalBasicProps } from "../schema/GoalSchema";
import Skeleton from "./Skeleton";

const MultiLineTextField = (
  props: TextareaHTMLAttributes<HTMLTextAreaElement>
) => {
  const goalProps = useStoreState((state) => state.goalProps);
  const setGoalProps = useStoreActions((actions) => actions.setGoalProps);
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

  return narrowType<GoalBasicProps>(goalProps) ? (
    <textarea
      ref={textAreaRef}
      cols={
        goalProps.description.length <= 15 ? 15 : goalProps.description.length
      }
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
    />
  ) : (
    <Skeleton />
  );
};

export default MultiLineTextField;
