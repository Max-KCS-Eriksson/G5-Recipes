import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

function Layout() {
  return (
    <div className="page">
      <main>
        <Header />
        <div className="container stack">
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default Layout;
