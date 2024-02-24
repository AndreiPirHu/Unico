import { Link } from "react-router-dom";
import { CartProductList } from "../../components/navbar/cart/cartProductList";
import { useState } from "react";
import { SiteLoader } from "../../components/siteLoader";

export const Checkout = () => {
  const [totalAmount, setTotalAmount] = useState<number>(0);
  return (
    <div className="montserrat-regular relative bg-[#F7F7F7] py-20 ">
      <SiteLoader />
      <div
        id="header-container "
        className="fixed top-0 flex border-b w-full bg-white"
      >
        <div id="back-container" className="flex flex-1 my-auto ml-5">
          <img
            src="/src/assets/arrow-icon.svg"
            alt="Arrow icon"
            className="h-5 rotate-180 pb-1 "
          />
          <h1 className="ml-1 ">Back</h1>
        </div>
        <div
          id="logo-container"
          className=" flex flex-1 h-20 justify-center py-3"
        >
          <Link to="/">
            <img src="/src/assets/logo-icon.svg" alt="Unico icon" />
          </Link>
        </div>
        <div className="flex-1"></div>
      </div>

      <div id="title-container" className="flex justify-center py-8 ">
        <h1 className="text-2xl font-medium">Checkout</h1>
      </div>

      <div id="section-container" className="grid justify-center gap-10 ">
        <div id="cart-section">
          <div id="cart-title">
            <h2 className="font-medium">1. Your Cart</h2>
          </div>
          <div id="cart-content" className="w-[80vw] max-md:w-screen bg-white ">
            <CartProductList setTotalAmount={setTotalAmount} />
            <div className="flex justify-between py-5 mx-2 font-bold ">
              <h2>Total Amount</h2>
              <h2>€ {totalAmount}</h2>
            </div>
          </div>
        </div>

        <div id="information-section">
          <div id="information-title">
            <h2 className="font-medium">2. Your information</h2>
          </div>
          <div
            id="information-content"
            className="w-[80vw] max-md:w-screen bg-white grid justify-center py-4"
          >
            <div className="w-[50vw] ">
              <form id="information-form" className="grid gap-1">
                <h2>Delivery information</h2>
                <div id="name-input" className="flex w-full">
                  <input
                    type="text"
                    placeholder="Name*"
                    className="flex-1 border p-3 pt-5"
                  />
                  <input
                    type="text"
                    placeholder="Last name*"
                    className="flex-1 border p-3 pt-5"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Address*"
                  className="border p-3 pt-5"
                />
                <div id="city-input" className="flex">
                  <input
                    type="text"
                    placeholder="City*"
                    className="flex-1 border p-3 pt-5"
                  />
                  <input
                    type="number"
                    placeholder="Postal Code*"
                    className="flex-1 border p-3 pt-5"
                  />
                </div>

                <h2 className="mt-10">Contact Information</h2>
                <input
                  type="email"
                  placeholder="Email*"
                  className="border p-3 pt-5"
                  required
                />
                <input
                  type="number"
                  placeholder="Phone Number*"
                  className="border p-3 pt-5"
                  required
                />
                <button className="p-5 my-2 bg-black  text-white font-semibold hover:opacity-75">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>

        <div id="delivery-section">
          <div id="delivery-title">
            <h2 className="font-medium">3. Delivery Options</h2>
          </div>
          <div
            id="delivery-content"
            className="w-[80vw] max-md:w-screen bg-white grid justify-center"
          >
            <div className="w-[50vw] ">
              <div className=" border">
                <label className=" flex ">
                  <input type="radio" className=" accent-black" />
                  <h2>hello there</h2>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div id="payment-section">
          <div id="payment-title">
            <h2 className="font-medium">4. Payment</h2>
          </div>
          <div
            id="payment-content"
            className="w-[80vw] max-md:w-screen bg-white grid justify-center"
          >
            <div className="w-[50vw] ">hello</div>
          </div>
        </div>
      </div>
    </div>
  );
};
