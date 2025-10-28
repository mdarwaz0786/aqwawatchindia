import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);

    // Check if we've already reloaded for this route
    const lastPath = sessionStorage.getItem("lastPath");

    if (lastPath !== pathname) {
      sessionStorage.setItem("lastPath", pathname);
      // ✅ Reload once
      window.location.reload();
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
