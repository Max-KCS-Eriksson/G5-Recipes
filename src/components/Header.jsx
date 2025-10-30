import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import Logo from "./Logo.jsx";

function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerLogoContainer}>
        <Logo variant="default" />
      </div>
      <nav className={styles.headerNav}>
        <Link to={{ pathname: "/", search: "" }} className={styles.navBtn}>
          Hem
        </Link>
        <Link to="/categories" className={styles.navBtn}>
          Kategorier
        </Link>
      </nav>
    </header>
  );
}

export default Header;
