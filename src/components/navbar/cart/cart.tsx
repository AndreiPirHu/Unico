import React from "react";
import { CartProductList } from "./cartProductList";

type cartProps = {
  cartActive: boolean;
  setCartActive: React.Dispatch<React.SetStateAction<boolean>>;
};
export const Cart: React.FC<cartProps> = ({ cartActive, setCartActive }) => {
  return (
    <menu
      className={`fixed w-full h-full flex z-50 transition-all duration-500  ${
        cartActive ? " translate-x-0" : " translate-x-full"
      }`}
    >
      <div
        className={` flex-1 z-0 bg-[rgba(0,0,0,.3)] transition-all duration-500 origin-right ${
          cartActive ? "scale-x-100 " : "scale-x-0"
        }`}
        onClick={() => setCartActive(false)}
      ></div>
      <div className=" bg-white w-[400px] max-[500px]:w-[75vw]  ">
        <div className="flex border-b  h-14">
          <img
            src="/src/assets/close-icon.svg"
            alt=""
            className="p-2 h-14 cursor-pointer"
            onClick={() => setCartActive(false)}
          />
        </div>
        <CartProductList />
      </div>
    </menu>
  );
};
