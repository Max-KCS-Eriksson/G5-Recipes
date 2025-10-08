import { Outlet } from "react-router-dom";
import Footer from "./Footer.jsx";

function Layout() {
  return (
    <>
      <header></header>
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
