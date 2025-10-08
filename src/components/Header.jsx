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
        <button className="nav-btn">Knapp 1</button>
        <button className="nav-btn">Knapp 2</button>
        <button className="nav-btn">Knapp 3</button>
      </nav>
    </header>
  );
}

export default Header;
