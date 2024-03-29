import React, { useEffect, useRef, useState } from "react";
import { SearchBar } from "./searchBar";
import { SideMenu } from "./sideMenu";
import { Link } from "react-router-dom";
import { Cart } from "./cart/cart";
import { useSelector } from "react-redux";
import { RootState } from "../../features/rootReducer";
import { auth } from "../../firebase";

type navbarProps = {
  solidBg: boolean;
  productAdded?: boolean;
  setProductAdded?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Navbar: React.FC<navbarProps> = ({
  solidBg,
  productAdded,
  setProductAdded,
}) => {
  const [scrollPosition, setScrollPosition] = useState<boolean>(false);
  const [hovered, setHovered] = useState<boolean>(false);
  const [searchBarActive, setSearchBarActive] = useState<boolean>(false);
  const [sideMenuActive, setSideMenuActive] = useState<boolean>(false);
  const [cartActive, setCartActive] = useState<boolean>(false);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  let hoverTimeout = useRef<number | null>(null);

  const cartProducts = useSelector((state: RootState) => state.cart);

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
    if (productAdded && setProductAdded) {
      setCartActive(true);
      setTimeout(() => {
        setCartActive(false);
        setProductAdded(false);
      }, 600);
    }
  }, [productAdded]);

  useEffect(() => {}, [cartProducts]);

  useEffect(() => {
    if (cartActive || sideMenuActive || searchBarActive) {
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "scroll";
    return () => {};
  }, [cartActive, sideMenuActive, searchBarActive]);

  useEffect(() => {
    if (solidBg) {
      setScrollPosition(true);
    } else {
      //change background color when scrolling
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }

    //checks if user is logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserLoggedIn(true);
      } else {
        setUserLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <nav className={`montserrat-regular ${solidBg ? "pb-24" : ""}`}>
      <Cart setCartActive={setCartActive} cartActive={cartActive} />
      <SideMenu
        setSideMenuActive={setSideMenuActive}
        sideMenuActive={sideMenuActive}
      />
      <SearchBar
        setSearchBarActive={setSearchBarActive}
        searchBarActive={searchBarActive}
      />
      <div
        className={` flex h-24 z-40 fixed w-screen transition-colors duration-200  text-sm font-light whitespace-nowrap ${
          scrollPosition || hovered
            ? "bg-white text-gray-950 border-b border-#e2e2e2"
            : "bg-transparent text-white"
        }  `}
      >
        <div className=" flex flex-1  my-auto ml-10 max-md:ml-5">
          <img
            src="https://raw.githubusercontent.com/AndreiPirHu/Unico/main/src/assets/hamburger-icon.svg"
            alt="three black horizontal lines"
            className={` inline cursor-pointer h-11 p-2 md:hidden  ${
              scrollPosition || hovered ? "" : "invert "
            }`}
            onClick={() => setSideMenuActive(!sideMenuActive)}
          />
          <img
            src="https://raw.githubusercontent.com/AndreiPirHu/Unico/main/src/assets/search-icon.svg"
            alt=""
            className={` inline cursor-pointer h-11 p-2  md:hidden ${
              scrollPosition || hovered ? "" : "invert "
            }`}
            onClick={() => setSearchBarActive(true)}
          />
          <div
            className={` group ml-5 max-md:hidden cursor-pointer`}
            onMouseEnter={handleHoverOn}
            onMouseLeave={handleHoverOff}
            onClick={() => setHovered(!hovered)}
          >
            Shop
            <span
              className={`block h-0.5 ${
                scrollPosition || hovered ? " bg-gray-600" : "bg-white "
              }   scale-x-0 duration-500 group-hover:scale-x-100`}
            ></span>
          </div>

          <Link to="" className={`group ml-5 max-md:hidden `}>
            Journal
            <span
              className={`block h-0.5 ${
                scrollPosition || hovered ? " bg-gray-600" : "bg-white "
              }   scale-x-0 duration-500 group-hover:scale-x-100`}
            ></span>
          </Link>
          <Link to="" className={`group ml-5 max-md:hidden `}>
            About
            <span
              className={`block h-0.5 ${
                scrollPosition || hovered ? " bg-gray-600" : "bg-white "
              }   scale-x-0 duration-500 group-hover:scale-x-100 `}
            ></span>
          </Link>
        </div>
        <div className=" flex flex-1 justify-center my-auto">
          <Link to="/">
            <img
              src="https://raw.githubusercontent.com/AndreiPirHu/Unico/main/src/assets/logo-icon.svg"
              alt=""
              className={`  cursor-pointer h-10 ${
                scrollPosition || hovered ? "" : "invert "
              }`}
            />
          </Link>
        </div>
        <div className="flex flex-1 justify-end my-auto mr-10 max-md:mr-5 ">
          <Link to={`${userLoggedIn ? "/account" : "/login"}`}>
            <img
              src="https://raw.githubusercontent.com/AndreiPirHu/Unico/main/src/assets/account-icon.svg"
              alt=""
              className={` inline cursor-pointer h-11 p-2  md:hidden ${
                scrollPosition || hovered ? "" : "invert "
              }`}
            />
          </Link>
          <div className="relative">
            <img
              src="https://raw.githubusercontent.com/AndreiPirHu/Unico/main/src/assets/basket-icon.svg"
              alt="basket icon"
              onClick={() => setCartActive(true)}
              className={` inline cursor-pointer h-11 p-2 md:hidden ${
                scrollPosition || hovered ? "" : "invert "
              }`}
            />
            {cartProducts.length > 0 ? (
              <div className="absolute top-1 -right-px bg-black text-white text-xs font-medium rounded-full px-2 py-1 md:hidden pointer-events-none ">
                {cartProducts.length}
              </div>
            ) : (
              ""
            )}
          </div>

          <Link
            to={`${userLoggedIn ? "/account" : "/login"}`}
            className={`group mr-5  my-auto max-md:hidden `}
          >
            Account
            <span
              className={`block h-0.5 ${
                scrollPosition || hovered ? " bg-gray-600" : "bg-white "
              }   scale-x-0 duration-500 group-hover:scale-x-100`}
            ></span>
          </Link>
          <div
            className={`group mr-5 cursor-pointer max-md:hidden`}
            onClick={() => setSearchBarActive(true)}
          >
            <div className="mt-[3px] ">
              Search
              <img
                src="https://raw.githubusercontent.com/AndreiPirHu/Unico/main/src/assets/search-icon.svg"
                alt=""
                className={` inline h-6 ml-1  ${
                  scrollPosition || hovered ? "" : "invert "
                }`}
              />
            </div>
            <span
              className={`block h-0.5 ${
                scrollPosition || hovered ? " bg-gray-600" : "bg-white "
              }   scale-x-0 duration-500 group-hover:scale-x-100`}
            ></span>
          </div>

          <div
            onClick={() => setCartActive(true)}
            className={`relative group mr-5 cursor-pointer max-md:hidden`}
          >
            <div className="mt-[3px] ">
              Cart
              <img
                src="https://raw.githubusercontent.com/AndreiPirHu/Unico/main/src/assets/basket-icon.svg"
                alt=""
                className={` inline h-6 ml-1  ${
                  scrollPosition || hovered ? "" : "invert"
                }`}
              />
              {cartProducts.length > 0 ? (
                <div className="absolute top-1 -right-3 bg-black text-white text-xs font-medium rounded-full px-2  ">
                  {cartProducts.length}
                </div>
              ) : (
                ""
              )}
            </div>

            <span
              className={`block h-0.5 ${
                scrollPosition || hovered ? " bg-gray-600" : "bg-white "
              }   scale-x-0 duration-500 group-hover:scale-x-100`}
            ></span>
          </div>
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
          <div className="grid my-auto mx-auto">
            <h3 className=" text-lg mb-4 text-gray-400">Categories</h3>
            <ul>
              <li className="text-base mb-1 hover:opacity-65">
                <Link
                  to="/collections/new-arrivals"
                  onClick={() => setHovered(false)}
                >
                  New Arrivals
                </Link>
              </li>
              <li className="text-base mb-1 hover:opacity-65">
                <Link to="/collections/all" onClick={() => setHovered(false)}>
                  Shop All
                </Link>
              </li>
              <li className="text-base mb-1 hover:opacity-65">
                <Link
                  to="/collections/embroidery"
                  onClick={() => setHovered(false)}
                >
                  Embroidered Tops
                </Link>
              </li>
              <li className="text-base mb-1 hover:opacity-65">
                <Link
                  to="/collections/crochet"
                  onClick={() => setHovered(false)}
                >
                  Crocheted Tops
                </Link>
              </li>
              <li className="text-base mb-1 hover:opacity-65">
                <Link
                  to="/collections/stitch"
                  onClick={() => setHovered(false)}
                >
                  Stitched Tops
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-1 bg-no-repeat bg-cover bg-center bg-[linear-gradient(to_right,rgba(255,255,255,1),rgba(255,255,255,0.5),rgba(255,255,255,0.0),rgba(255,255,255,0)),url('https://raw.githubusercontent.com/AndreiPirHu/Unico/main/src/assets/navbar-shop-image.jpeg')]"></div>
      </div>
    </nav>
  );
};
