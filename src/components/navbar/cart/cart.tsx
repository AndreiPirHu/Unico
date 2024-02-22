import React, { useState } from "react";
import { CartProductList } from "./cartProductList";

type cartProps = {
  cartActive: boolean;
  setCartActive: React.Dispatch<React.SetStateAction<boolean>>;
};
export const Cart: React.FC<cartProps> = ({ cartActive, setCartActive }) => {
  const [totalAmount, setTotalAmount] = useState<number>(0);
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

      <div className=" bg-white w-[400px] max-[500px]:w-[75vw] flex flex-col  ">
        <div className="flex border-b  h-14 flex-none">
          <img
            src="/src/assets/close-icon.svg"
            alt=""
            className="p-2 h-14 cursor-pointer"
            onClick={() => setCartActive(false)}
          />
        </div>
        <div className=" overflow-scroll flex-auto">
          <CartProductList setTotalAmount={setTotalAmount} />
        </div>

        <div className=" h-40 w-[400px] max-[500px]:w-[75vw] bg-[#F7F7F7] bottom-0 grid px-3 font-semibold flex-none">
          <div className="flex justify-between mt-4">
            <h2 className=" font-medium">Shipping:</h2>
            <h2>Free</h2>
          </div>
          <div className="flex justify-between">
            <h2>Total:</h2>
            <h2>€ {totalAmount}</h2>
          </div>
          <div className="flex justify-center">
            <button className="bg-black w-full text-white mb-4 py-1 px-4 hover:opacity-75">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </menu>
  );
};
