import styles from "./Footer.module.css";
import Logo from "./Logo.jsx";

function Footer() {
  return (
    <footer className={styles.footerContainer} id="contact">
      <div className={styles.footerContent}>
        <Logo variant="small" />
        <nav className={styles.footerLinks}>
          <p>info@pajparadiset.se</p>
        </nav>
        <p className={styles.footerCopy}>
          © {new Date().getFullYear()} Pajparadiset. Alla rättigheter
          förbehållna.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
