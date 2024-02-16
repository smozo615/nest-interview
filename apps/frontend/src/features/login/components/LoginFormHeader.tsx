import { Typography } from "@mui/material";
import { Logo1 } from "../../commons";

export default function LoginFormHeader() {
  return (
    <>
      <Logo1 />
      <Typography component="h1" variant="h3" align="center" fontWeight="bold">
        Iniciar sesión
      </Typography>
    </>
  );
}
