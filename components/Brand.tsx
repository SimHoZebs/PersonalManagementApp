import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import Image from "next/image";
import theme from "../styles/theme";

const Brand = () => {
  return (
    <Container
      sx={{
        display: "flex",
        columnGap: theme.spacing(1),
        alignItems: "center",
      }}
    >
      <Image
        src="/logo.png"
        layout="fixed"
        alt="AnotherToDoList"
        width={40}
        height={40}
      />
      <Typography variant="h6">AnotherToDoList</Typography>
    </Container>
  );
};

export default Brand;
