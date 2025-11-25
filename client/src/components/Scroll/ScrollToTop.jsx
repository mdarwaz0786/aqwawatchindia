import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Preloader from "./Preloader";

const ScrollToTop = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location]);

  if (loading) return <Preloader />;

  return null;
};

export default ScrollToTop;
