import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Logo.module.css";
import pajIcon from "../assets/paj-icon.svg";
import { joinClassNames } from "../utils/joinClassNames.js";

function Logo({ variant = "default" }) {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();

  const handleClick = (e) => {
    const atCleanHomeSearch = pathname === "/" && !search && !hash;

    if (!atCleanHomeSearch) {
      e.preventDefault();
      navigate({ pathname: "/", search: "", hash: "" }, { replace: false });
      return;
    }
  };

  return (
    <Link
      to={{ pathname: "/", search: "", hash: "" }}
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
