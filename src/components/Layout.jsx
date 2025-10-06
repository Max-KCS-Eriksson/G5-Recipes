import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <header></header>
      <Outlet />
      <footer></footer>
    </>
  );
}

export default Layout;
