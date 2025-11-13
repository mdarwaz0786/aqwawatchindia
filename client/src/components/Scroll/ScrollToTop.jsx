import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Preloader from "./Preloader";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const lastPath = sessionStorage.getItem("lastPath");

    if (lastPath !== pathname) {
      sessionStorage.setItem("lastPath", pathname);
      setLoading(true);
      window.location.reload();
    }
  }, [pathname]);

  if (loading) return <Preloader />;

  return null;
};

export default ScrollToTop;
