import { Link, useLocation } from "react-router-dom";
import styles from "./Logo.module.css";
import pajIcon from "../assets/paj-icon.svg";
import { joinClassNames } from "../utils/joinClassNames.js";

function Logo({ variant = "default" }) {
  const { pathname } = useLocation();

  const handleClick = (e) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Link
      to="/"
      onClick={handleClick}
      aria-label="Gå till startsidan"
      className={joinClassNames(styles.logoText, styles[variant])}
    >
      <span className={styles.logo} aria-hidden="true">
        <img
          src={pajIcon}
          alt=""
          className={styles.logoIcon}
          decoding="async"
        />
        <span className={styles.logoText}>PajParadiset</span>
      </span>
    </Link>
  );
}

export default Logo;
