import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import theme from "../theme";

const Brand = () => {
  return (
    <Container
      sx={{
        display: "flex",
        columnGap: theme.spacing(1),
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AssignmentTurnedInIcon
        fontSize="large"
        color="primary"
      ></AssignmentTurnedInIcon>
      <Typography variant="h6">AnotherToDoList</Typography>
    </Container>
  );
};

export default Brand;
