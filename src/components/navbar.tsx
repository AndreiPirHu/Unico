import { useEffect, useRef, useState } from "react";
import { SearchBar } from "./searchBar";

export const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);
  const [searchBarActive, setSearchBarActive] = useState<boolean>(false);
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
    <nav className=" montserrat-regular">
      <SearchBar
        setSearchBarActive={setSearchBarActive}
        searchBarActive={searchBarActive}
      />

      <div
        className={` flex h-24 z-40 fixed w-screen transition-colors duration-200  text-sm font-light whitespace-nowrap ${
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
          <a href="" className={`group mr-5  my-auto`}>
            Account
            <span
              className={`block h-0.5 ${
                scrollPosition || hovered ? " bg-gray-600" : "bg-white "
              }   scale-x-0 duration-500 group-hover:scale-x-100`}
            ></span>
          </a>
          <div
            className={`group mr-5 cursor-pointer`}
            onClick={() => setSearchBarActive(true)}
          >
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
          </div>

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
        className={` flex top-24 h-72 z-50 fixed w-screen montserrat-regular font-light whitespace-nowrap scale-y-0 duration-200 origin-top bg-white text-gray-600 border-b border-#e2e2e2 ${
          hovered ? "scale-y-100 " : ""
        }`}
        onMouseEnter={handleHoverOn}
        onMouseLeave={handleHoverOff}
      >
        <div className=" flex flex-1 ">
          <div className="grid my-auto ml-auto mr-28">
            <h3 className=" text-base mb-4 text-gray-400">Categories</h3>
            <ul>
              <li className="text-sm mb-1 hover:opacity-65">
                <a href="">New Arrivals</a>
              </li>
              <li className="text-sm mb-1 hover:opacity-65">
                <a href="">Shop All</a>
              </li>
              <li className="text-sm mb-1 hover:opacity-65">
                <a href="">Embroidered Tops</a>
              </li>
              <li className="text-sm mb-1 hover:opacity-65">
                <a href="">4</a>
              </li>
              <li className="text-sm mb-1 hover:opacity-65">
                <a href="">5</a>
              </li>
              <li className="text-sm mb-1 hover:opacity-65">
                <a href="">6</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-1 bg-no-repeat bg-cover bg-center bg-[linear-gradient(to_right,rgba(255,255,255,1),rgba(255,255,255,0.5),rgba(255,255,255,0.0),rgba(255,255,255,0)),url('../src/assets/navbar-shop-image.jpeg')]"></div>
      </div>
    </nav>
  );
};
