import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import Image from "next/image";
import theme from "../theme";

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
