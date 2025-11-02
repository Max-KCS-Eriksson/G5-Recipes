import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import Logo from "./Logo.jsx";

function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerLogoContainer}>
        <Logo variant="default" />
        <p className={styles.slogan} aria-label="Slogan">
          - pajer för alla
        </p>
      </div>
      <nav className={styles.headerNav}>
        <Link to={{ pathname: "/", search: "" }} className={styles.navBtn}>
          Hem
        </Link>
        <Link to="/categories" className={styles.navBtn}>
          Kontakt
        </Link>
      </nav>
    </header>
  );
}

export default Header;
