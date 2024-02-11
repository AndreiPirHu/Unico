import { useEffect, useState } from "react";

export const SiteLoader = () => {
  const [active, setActive] = useState<boolean>(true);

  useEffect(() => {
    setActive(true);
    setTimeout(() => {
      setActive(false);
    }, 700);
  }, []);

  return (
    <div
      className={`fixed h-full w-full z-50 transition-colors duration-500 ease-in-out ${
        active ? "bg-white" : "bg-transparent pointer-events-none"
      }`}
    ></div>
  );
};
