import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p className="footer-logo">Pajparadiset</p>

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
