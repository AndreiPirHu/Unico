import { useEffect, useState } from "react";

export const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState<boolean>(false);

  const handleScroll = () => {
    setScrollPosition(() => {
      if (window.scrollY > 0) {
        return true;
      } else {
        return false;
      }
    });
  };

  useEffect(() => {
    //change background color when scrolling
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={` flex h-24 z-50 fixed w-screen transition-colors duration-500 font-light whitespace-nowrap ${
        scrollPosition
          ? "bg-white text-gray-600 border-b border-#e2e2e2"
          : "bg-transparent text-white"
      }  `}
    >
      <div className=" flex flex-1  my-auto ml-20">
        <a href="" className={` group ml-5 `}>
          Shop
          <span
            className={`block h-0.5 ${
              scrollPosition ? " bg-gray-600" : "bg-white "
            }   scale-x-0 duration-500 group-hover:scale-x-100`}
          ></span>
        </a>
        <a href="" className={`group ml-5 `}>
          Pre-order
          <span
            className={`block h-0.5 ${
              scrollPosition ? " bg-gray-600" : "bg-white "
            }   scale-x-0 duration-500 group-hover:scale-x-100`}
          ></span>
        </a>
        <a href="" className={`group ml-5 `}>
          Journal
          <span
            className={`block h-0.5 ${
              scrollPosition ? " bg-gray-600" : "bg-white "
            }   scale-x-0 duration-500 group-hover:scale-x-100`}
          ></span>
        </a>
        <a href="" className={`group ml-5  `}>
          About
          <span
            className={`block h-0.5 ${
              scrollPosition ? " bg-gray-600" : "bg-white "
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
              scrollPosition ? " bg-gray-600" : "bg-white "
            }   scale-x-0 duration-500 group-hover:scale-x-100`}
          ></span>
        </a>

        <a href="" className={`group mr-5 `}>
          Search
          <img
            src="/src/assets/search-icon.svg"
            alt=""
            className={` inline h-6 ml-1 ${scrollPosition ? "" : "invert "}`}
          />
          <span
            className={`block h-0.5 ${
              scrollPosition ? " bg-gray-600" : "bg-white "
            }   scale-x-0 duration-500 group-hover:scale-x-100`}
          ></span>
        </a>
        <a href="" className={`group mr-5 `}>
          Cart
          <img
            src="/src/assets/basket-icon.svg"
            alt=""
            className={` inline h-6 ml-1  ${scrollPosition ? "" : "invert"}`}
          />
          <span
            className={`block h-0.5 ${
              scrollPosition ? " bg-gray-600" : "bg-white "
            }   scale-x-0 duration-500 group-hover:scale-x-100`}
          ></span>
        </a>
      </div>
    </nav>
  );
};
