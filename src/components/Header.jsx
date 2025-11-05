import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import Logo from "./Logo.jsx";
import CategoryList from "./CategoryList.jsx";

function Header() {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef(null);
  const btnRef = useRef(null);
  const { pathname, search, hash } = useLocation();

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
    globalThis.addEventListener("keydown", onKey);
    return () => globalThis.removeEventListener("keydown", onKey);
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

  const scrollToFooter = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
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
        <a href="#contact" onClick={scrollToFooter} className={styles.navBtn}>
          Kontakt
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
              onClick={scrollToFooter}
            >
              Kontakt
            </a>
          </li>

          {/* Categories shown directly in the drawer (mobile only) */}
          <li className={styles.catsBlock}>
            <h3 className={styles.catsTitle}>Kategorier</h3>
            <div className={styles.catsPanelAlways}>
              <CategoryList />
            </div>
          </li>
        </ul>
      </aside>
    </header>
  );
}

export default Header;
