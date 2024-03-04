import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type SiteLoaderProps = {
  duration?: number;
};

export const SiteLoader: React.FC<SiteLoaderProps> = ({ duration }) => {
  const [active, setActive] = useState<boolean>(true);
  const { pathname } = useLocation();

  if (duration) {
    useEffect(() => {
      setActive(true);
      setTimeout(() => {
        setActive(false);
      }, duration);
    }, []);
  } else {
    useEffect(() => {
      setActive(true);
      setTimeout(() => {
        setActive(false);
      }, 700);
    }, []);
  }

  useEffect(() => {
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 700);
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
