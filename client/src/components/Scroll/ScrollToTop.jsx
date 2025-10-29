import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const lastPath = sessionStorage.getItem("lastPath");

    if (lastPath !== pathname) {
      sessionStorage.setItem("lastPath", pathname);
      window.location.reload();
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;
