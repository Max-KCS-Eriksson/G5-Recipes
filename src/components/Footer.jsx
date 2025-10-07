import "./Footer.css";
import Logo from "./Logo.jsx";

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <Logo variant="small" />
        <nav className="footer-links">
          <a href="#">Om oss</a>
          <a href="#">Kontakt</a>
          <a href="#">Integritetspolicy</a>
        </nav>
        <p className="footer-copy">
          © {new Date().getFullYear()} Pajparadiset. Alla rättigheter förbehållna.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
