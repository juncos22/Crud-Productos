import { Container } from "@mui/material";
import { ReactElement } from "react";
import { Navbar } from "./Navbar";

type LayoutProps = {
  children: ReactElement;
};
export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <Container sx={{ my: 10 }}>{children}</Container>
    </>
  );
}
