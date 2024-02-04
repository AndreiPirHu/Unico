import { useEffect, useRef, useState } from "react";

export const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);
  let hoverTimeout = useRef<number | null>(null);

  const handleScroll = () => {
    setScrollPosition(() => {
      if (window.scrollY > 0) {
        return true;
      } else {
        return false;
      }
    });
  };

  const handleHoverOn = () => {
    if (hoverTimeout.current !== null) {
      clearTimeout(hoverTimeout.current);
    }
    setHovered(true);
  };

  const handleHoverOff = () => {
    hoverTimeout.current = window.setTimeout(() => setHovered(false), 400);
  };

  useEffect(() => {
    //change background color when scrolling
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav>
      <div
        className={` flex h-24 z-50 fixed w-screen transition-colors duration-200 font-light whitespace-nowrap ${
          scrollPosition || hovered
            ? "bg-white text-gray-600 border-b border-#e2e2e2"
            : "bg-transparent text-white"
        }  `}
      >
        <div className=" flex flex-1  my-auto ml-20">
          <a
            href=""
            className={` group ml-5 `}
            onMouseEnter={handleHoverOn}
            onMouseLeave={handleHoverOff}
          >
            Shop
            <span
              className={`block h-0.5 ${
                scrollPosition || hovered ? " bg-gray-600" : "bg-white "
              }   scale-x-0 duration-500 group-hover:scale-x-100`}
            ></span>
          </a>

          <a href="" className={`group ml-5 `}>
            Journal
            <span
              className={`block h-0.5 ${
                scrollPosition || hovered ? " bg-gray-600" : "bg-white "
              }   scale-x-0 duration-500 group-hover:scale-x-100`}
            ></span>
          </a>
          <a href="" className={`group ml-5  `}>
            About
            <span
              className={`block h-0.5 ${
                scrollPosition || hovered ? " bg-gray-600" : "bg-white "
              }   scale-x-0 duration-500 group-hover:scale-x-100 `}
            ></span>
          </a>
        </div>
        <div className=" flex flex-1 justify-center my-auto">
          <img src="/src/assets/react.svg" alt="" className=" h-10" />
        </div>
        <div className="flex flex-1 justify-end my-auto mr-20 ">
          <a href="" className={`group mr-5 `}>
            Account
            <span
              className={`block h-0.5 ${
                scrollPosition || hovered ? " bg-gray-600" : "bg-white "
              }   scale-x-0 duration-500 group-hover:scale-x-100`}
            ></span>
          </a>

          <a href="" className={`group mr-5 `}>
            Search
            <img
              src="/src/assets/search-icon.svg"
              alt=""
              className={` inline h-6 ml-1 ${
                scrollPosition || hovered ? "" : "invert "
              }`}
            />
            <span
              className={`block h-0.5 ${
                scrollPosition || hovered ? " bg-gray-600" : "bg-white "
              }   scale-x-0 duration-500 group-hover:scale-x-100`}
            ></span>
          </a>
          <a href="" className={`group mr-5 `}>
            Cart
            <img
              src="/src/assets/basket-icon.svg"
              alt=""
              className={` inline h-6 ml-1  ${
                scrollPosition || hovered ? "" : "invert"
              }`}
            />
            <span
              className={`block h-0.5 ${
                scrollPosition || hovered ? " bg-gray-600" : "bg-white "
              }   scale-x-0 duration-500 group-hover:scale-x-100`}
            ></span>
          </a>
        </div>
      </div>

      <div
        className={` flex top-24 h-72 z-50 fixed w-screen font-light whitespace-nowrap scale-y-0 duration-200 origin-top bg-white text-gray-600 border-b border-#e2e2e2 ${
          hovered ? "scale-y-100 " : ""
        }`}
        onMouseEnter={handleHoverOn}
        onMouseLeave={handleHoverOff}
      >
        <div className=" flex flex-1">
          <div className="grid m-auto">
            <h6>Categories</h6>
            <ul>
              <li>New Arrivals</li>
              <li>Shop All</li>
              <li>Embroidered Tops</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-1 bg-cover bg-center bg-[linear-gradient(to_right,rgba(255,255,255,1),rgba(255,255,255,0.5),rgba(255,255,255,0.0),rgba(255,255,255,0)),url('../src/assets/navbar-shop-image.jpeg')]"></div>
      </div>
    </nav>
  );
};
