import { DetailedHTMLProps, InputHTMLAttributes } from "react";
interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

const CustomTextField = (props: Props) => {
  const { className, ...rest } = props;

  return (
    <input type="text" className={`bg-transparent ${className}`} {...rest} />
  );
};

export default CustomTextField;
