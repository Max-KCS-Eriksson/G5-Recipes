import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import Logo from "./Logo.jsx";

function Header() {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef(null);
  const btnRef = useRef(null);
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname, search, hash]);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onClick = (event) => {
      const target = event.target;
      if (
        drawerRef.current &&
        !drawerRef.current.contains(target) &&
        btnRef.current &&
        !btnRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  // “Kontakter” -> jump to footer
  const handleContacts = async (e) => {
    e.preventDefault();
    if (pathname !== "/") {
      navigate("/", { replace: false });
      // wait a tick for the home to render before scrolling
      setTimeout(() => {
        document
          .getElementById("contact")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 0);
    } else {
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <header className={styles.headerContainer} aria-label="Sidhuvud">
      <div className={styles.headerLogoContainer}>
        <Logo variant="default" />
        <p className={styles.slogan} aria-label="Slogan">
          - pajer för alla
        </p>
      </div>

      {/* Desktop nav */}
      <nav className={styles.headerNav} aria-label="Huvudnavigation">
        <Link to={{ pathname: "/", search: "" }} className={styles.navBtn}>
          Hem
        </Link>
        <a href="#contact" onClick={handleContacts} className={styles.navBtn}>
          Kontakter
        </a>
      </nav>

      {/* Burger (visible <768px) */}
      <button
        ref={btnRef}
        className={`${styles.navToggle} ${open ? styles.active : ""}`}
        aria-label="Öppna meny"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
      </button>

      {/* Right drawer */}
      <aside
        id="mobile-menu"
        ref={drawerRef}
        className={`${styles.mobileMenu} ${open ? styles.open : ""}`}
        aria-hidden={!open}
      >
        <ul className={styles.mobileList}>
          <li>
            <Link
              to={{ pathname: "/", search: "" }}
              className={styles.navBtn}
              onClick={() => setOpen(false)}
            >
              Hem
            </Link>
          </li>
          <li>
            <a
              href="#contact"
              className={styles.navBtn}
              onClick={handleContacts}
            >
              Kontakter
            </a>
          </li>
        </ul>
      </aside>
    </header>
  );
}

export default Header;
