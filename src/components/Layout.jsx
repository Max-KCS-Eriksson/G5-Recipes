import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

function Layout() {
  return (
    <div className="page">
      <Header />
      <main className="container stack">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
