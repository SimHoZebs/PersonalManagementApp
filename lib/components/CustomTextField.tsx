import TextField, { StandardTextFieldProps } from "@mui/material/TextField";

interface Props extends StandardTextFieldProps {
  typography?: string;
}

const CustomTextField = (props: Props) => {
  return (
    <TextField
      placeholder={props.placeholder}
      multiline={props.multiline}
      fullWidth={props.fullWidth}
      variant="standard"
      disabled={props.disabled}
      value={props.value}
      onChange={props.onChange}
      sx={{
        "& .MuiInputBase-root": {
          "& .Mui-disabled": {
            WebkitTextFillColor: "white",
          },
          typography: `${props.typography}`,
          ":before": {
            borderBottom: 0,
          },
        },
        ...props.sx,
      }}
    />
  );
};

export default CustomTextField;
