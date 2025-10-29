import { Link, useLocation } from "react-router-dom";
import styles from "./Logo.module.css";
import { joinClassNames } from "../utils/joinClassNames.js";

function Logo({ variant = "default", onClick }) {
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
      Pajparadiset
    </Link>
  );
}

export default Logo;
