import styles from "./Footer.module.css";
import Logo from "./Logo.jsx";

function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <Logo variant="small" />
        <nav className={styles.footerLinks}>
          <a href="#">info@pajparadiset.se</a>
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
