import { Link } from "react-router-dom";
import "./Header.css";
import Logo from "./Logo.jsx";

function Header() {
  return (
    <header className="header-container">
      <img
        className="header-bg-image"
        src="/images/header_bg_image.jpg"
        alt="Pajbakgrund"
      />
      <div className="header-logo-container">
        <Logo
          variant="default"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
      </div>
      <nav className="header-nav">
        <Link
          to="/"
          className="nav-btn"
          onClick={() => {
            if (window.location.pathname === "/") {
              window.location.reload();
            }
          }}
        >
          Hem
        </Link>
        <Link to="/categories" className="nav-btn">
          Kategorier
        </Link>
      </nav>
    </header>
  );
}

export default Header;
