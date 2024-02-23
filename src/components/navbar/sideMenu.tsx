import React, { useState } from "react";
import { Link } from "react-router-dom";

type sideMenuProps = {
  sideMenuActive: boolean;
  setSideMenuActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SideMenu: React.FC<sideMenuProps> = ({
  sideMenuActive,
  setSideMenuActive,
}) => {
  const [shopExpanded, setShopExpanded] = useState<boolean>(false);

  return (
    <menu
      className={`fixed w-full h-full bg-[rgba(0,0,0,.3)] flex z-50 transition-all  ${
        sideMenuActive
          ? " opacity-100"
          : "opacity-0 pointer-events-none duration-[1200ms]"
      } `}
    >
      <div
        className={` bg-white w-[75vw] transition-all duration-500 ${
          sideMenuActive ? " translate-x-0" : " -translate-x-full"
        }`}
      >
        <div className="flex justify-end border-b  h-14">
          <img
            src="/src/assets/close-icon.svg"
            alt=""
            className="p-2 h-14 cursor-pointer"
            onClick={() => setSideMenuActive(false)}
          />
        </div>

        <div className="montserrat-bold py-3 flex-auto">
          <div>
            <div
              className="py-3 px-4 flex justify-between cursor-pointer"
              onClick={() => setShopExpanded(!shopExpanded)}
            >
              <div>Shop</div>

              <img
                src="/src/assets/arrow-icon.svg"
                alt=""
                className={`h-5 transition-all duration-300 ${
                  shopExpanded ? "rotate-[270deg]" : "rotate-90 "
                }`}
              />
            </div>
            <ul
              className={`montserrat-regular whitespace-nowrap transition-transform duration-500 origin-top ${
                shopExpanded
                  ? "scale-y-100 opacity-100"
                  : "scale-y-0 opacity-0 "
              }`}
            >
              <li
                className="py-3 px-4"
                onClick={() => setSideMenuActive(false)}
              >
                <Link to="/collections/new-arrivals">New Arrivals</Link>
              </li>
              <li
                className="py-3 px-4"
                onClick={() => setSideMenuActive(false)}
              >
                <Link to="/collections/all">Shop All</Link>
              </li>
              <li
                className="py-3 px-4"
                onClick={() => setSideMenuActive(false)}
              >
                <Link to="/collections/embroidery">Embroidered Tops</Link>
              </li>
              <li
                className="py-3 px-4"
                onClick={() => setSideMenuActive(false)}
              >
                <Link to="/collections/crochet">Crocheted Tops</Link>
              </li>
              <li
                className="py-3 px-4"
                onClick={() => setSideMenuActive(false)}
              >
                <Link to="/collections/stitch">Stitched Tops</Link>
              </li>
            </ul>
          </div>

          <div
            className={`py-3 px-4 flex justify-between cursor-pointer transition-all duration-500 ${
              shopExpanded ? "translate-y-0" : "-translate-y-[500%]"
            } `}
          >
            <Link to="">About</Link>
          </div>
        </div>
      </div>
      <div
        className={`flex-1 z-50`}
        onClick={() => setSideMenuActive(false)}
      ></div>
    </menu>
  );
};
