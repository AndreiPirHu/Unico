import React, { useState } from "react";

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
      className={`fixed w-full h-full flex z-50 transition-all duration-500  ${
        sideMenuActive ? " translate-x-0" : " -translate-x-full"
      }`}
    >
      <div className=" bg-white w-[75vw]">
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
              <li className="py-3 px-4">New Arrivals</li>
              <li className="py-3 px-4">Shop All</li>
              <li className="py-3 px-4">Embroidered Tops</li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>

          <div
            className={`py-3 px-4 flex justify-between cursor-pointer transition-all duration-300 ${
              shopExpanded ? "translate-y-0" : "-translate-y-[300%]"
            } `}
          >
            <a href="">About</a>
          </div>
        </div>
      </div>
      <div
        className={` flex-1 z-0 bg-[rgba(0,0,0,.3)] transition-all duration-500 origin-left ${
          sideMenuActive ? "scale-x-100 " : "scale-x-0"
        }`}
        onClick={() => setSideMenuActive(false)}
      ></div>
    </menu>
  );
};