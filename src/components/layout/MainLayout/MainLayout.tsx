import { Outlet } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import { Container } from "@mui/material";

const MainLayout = () => {
  return (
    <main>
      <Navbar />
      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </main>
  );
};

export default MainLayout;
