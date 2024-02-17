import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const SiteLoader = () => {
  const [active, setActive] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 700);
  }, []);

  useEffect(() => {
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 600);
  }, [pathname]);

  return (
    <div
      className={`fixed h-full w-full z-50  ${
        active
          ? "bg-white"
          : "bg-transparent pointer-events-none transition-colors duration-500 ease-in-out"
      }`}
    ></div>
  );
};
