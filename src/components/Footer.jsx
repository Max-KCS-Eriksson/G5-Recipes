import styles from "./Footer.module.css";
import Logo from "./Logo.jsx";

function Footer() {
  return (
    <footer className={styles.footerContainer} id="contact">
      <div
        className={styles.footerContent}
        role="contentinfo"
        aria-label="Sidfot"
      >
        <div className={styles.footerLeft}>
          <p className={styles.kontakt}>Kontakt</p>
          <a className={styles.email} href="mailto:info@pajparadiset.se">
            info@pajparadiset.se
          </a>
        </div>
        <p className={styles.brandTitle}>PajParadiset</p>
        <p className={styles.footerCopy}>
          © {new Date().getFullYear()} PajParadiset.
          <br />
          Alla rättigheter förbehållna.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
