import React, { useEffect, useState } from "react";
import { CartProductList } from "./cartProductList";
import { useNavigate } from "react-router-dom";

type cartProps = {
  cartActive: boolean;
  setCartActive: React.Dispatch<React.SetStateAction<boolean>>;
};
export const Cart: React.FC<cartProps> = ({ cartActive, setCartActive }) => {
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [shippingAmount, setShippingAmount] = useState<number>(5);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleNavigateToCheckout = () => {
    setCartActive(false);
    //timeout to give time for setCartActive to go through
    setTimeout(() => {
      navigate("/checkout");
    }, 100);
  };

  useEffect(() => {
    if (totalAmount >= 150) {
      setShippingAmount(0);
    } else {
      setShippingAmount(5);
    }

    if (totalAmount > 5) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [totalAmount]);

  return (
    <menu
      className={`fixed w-full h-full flex z-50 bg-[rgba(0,0,0,.3)] transition-all  ${
        cartActive
          ? " opacity-100"
          : " opacity-0 pointer-events-none duration-[1200ms]"
      }`}
    >
      <div
        className={` flex-1 z-50 `}
        onClick={() => setCartActive(false)}
      ></div>

      <div
        className={` bg-white w-[400px] max-[500px]:w-[75vw] flex flex-col transition-all duration-500 ${
          cartActive ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex border-b  h-14 flex-none">
          <img
            src="Unico/src/assets/close-icon.svg"
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
            <h2>{totalAmount >= 150 ? "Free" : `€ ${shippingAmount}`}</h2>
          </div>
          <div className="flex justify-between">
            <h2>Total:</h2>
            <h2>
              €
              {totalAmount >= 150
                ? `${totalAmount}`
                : `${totalAmount + shippingAmount}`}
            </h2>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleNavigateToCheckout}
              className="bg-black w-full text-white mb-4 py-1 px-4 hover:opacity-75 disabled:bg-gray-400  disabled:hover:opacity-100"
              disabled={buttonDisabled}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </menu>
  );
};
