import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

// Scrolls the viewport to top on every route change
export default function ScrollToTop() {
  const { pathname, search } = useLocation();

  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      const scrollers = [
        document.querySelector("main"),
        document.querySelector(".page"),
      ].filter(Boolean);

      for (const el of scrollers) {
        try {
          el.scrollTo?.({ top: 0, left: 0, behavior: "auto" });
        } catch {}
      }
    });
  }, [pathname, search]);

  return null;
}
