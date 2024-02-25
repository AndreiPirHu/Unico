import { Link, useNavigate } from "react-router-dom";
import { CartProductList } from "../../components/navbar/cart/cartProductList";
import React, { useEffect, useState } from "react";
import { SiteLoader } from "../../components/siteLoader";

export const Checkout = () => {
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [chosenDeliveryCost, setChosenDeliveryCost] = useState<number>(0);
  const [chosenPaymentMethod, setChosenPaymentMethod] = useState<string>("");
  const [informationDone, setInformationDone] = useState<boolean>(false);
  const [cartEmpty, setCartEmpty] = useState<boolean>(false);
  const navigate = useNavigate();

  const deliveryCost: { [key: string]: number } = {
    postnord: 3,
    DHL: 5,
    instabox: 6,
  };

  const handleInformationDone = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setInformationDone(!informationDone);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handlePurchaseCompleted = (event: React.SyntheticEvent) => {
    event.preventDefault();
    navigate("/checkout/completed");
  };

  useEffect(() => {
    if (cartEmpty) {
      navigate("/");
    }
  }, [cartEmpty]);

  return (
    <div className="montserrat-regular relative bg-[#F7F7F7] pb-20  ">
      <SiteLoader />
      <div
        id="header-container "
        className="sticky top-0 flex border-b w-full bg-white"
      >
        <div id="back-container" className="flex flex-1 my-auto ml-5 ">
          <div className="flex cursor-pointer" onClick={handleGoBack}>
            <img
              src="/src/assets/arrow-icon.svg"
              alt="Arrow icon"
              className="h-5 rotate-180 pb-1 "
            />
            <h1 className="ml-1 ">Back</h1>
          </div>
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
        <h1 className="text-3xl font-medium">Checkout</h1>
      </div>

      <div id="section-container" className="grid justify-center gap-10 ">
        <div id="cart-section">
          <div id="cart-title">
            <h2 className="font-semibold  max-md:ml-3">1. Your Cart</h2>
          </div>
          <div
            id="cart-content"
            className="lg:w-[970px] md:w-[730px] max-md:w-screen bg-white "
          >
            <CartProductList
              setTotalAmount={setTotalAmount}
              setCartEmpty={setCartEmpty}
            />
            <div className="flex justify-between py-5 mx-2 font-bold ">
              <h2>Total Amount</h2>
              <h2>€ {totalAmount}</h2>
            </div>
          </div>
        </div>

        <div id="information-section">
          <div id="information-title">
            <h2 className="font-semibold  max-md:ml-3">2. Your information</h2>
          </div>
          <div
            id="information-content"
            className="lg:w-[970px] md:w-[730px] max-md:w-screen bg-white grid justify-center py-4"
          >
            <div className="w-[500px] max-sm:w-[90vw]  ">
              <form
                id="information-form"
                onSubmit={(e) => handleInformationDone(e)}
                className="grid  gap-1"
              >
                <h2 className="mt-8">Delivery information</h2>
                <div id="name-input" className="flex max-sm:w-[90vw]">
                  <input
                    type="text"
                    placeholder="Name*"
                    className="w-[50%] border p-3 pt-5"
                    required
                    disabled={informationDone}
                  />
                  <input
                    type="text"
                    placeholder="Last name*"
                    className="w-[50%] border p-3 pt-5"
                    required
                    disabled={informationDone}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Address*"
                  className="border p-3 pt-5"
                  required
                  disabled={informationDone}
                />
                <div id="city-input" className="flex max-sm:w-[90vw]">
                  <input
                    type="text"
                    placeholder="City*"
                    className="w-[50%] border p-3 pt-5"
                    required
                    disabled={informationDone}
                  />
                  <input
                    type="number"
                    placeholder="Postal Code*"
                    className="w-[50%]  border p-3 pt-5"
                    required
                    disabled={informationDone}
                  />
                </div>

                <h2 className="mt-10">Contact Information</h2>
                <input
                  type="email"
                  placeholder="Email*"
                  className="border p-3 pt-5"
                  required
                  disabled={informationDone}
                />
                <input
                  type="number"
                  placeholder="Phone Number*"
                  className="border p-3 pt-5"
                  required
                  disabled={informationDone}
                />
                <button
                  type="submit"
                  className="p-5 my-2 bg-black  text-white font-semibold hover:opacity-75"
                >
                  {informationDone ? "Edit Information" : "Continue"}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div id="delivery-section">
          <div id="delivery-title">
            <h2 className="font-semibold  max-md:ml-3">3. Delivery Options</h2>
          </div>
          <div
            id="delivery-content"
            className={`lg:w-[970px] md:w-[730px] max-md:w-screen bg-white grid justify-center py-4 pb-8 transition-all duration-500 origin-top ${
              informationDone
                ? "scale-y-100 opacity-100 "
                : "scale-y-0 h-0 opacity-0"
            }`}
          >
            <div className=" w-[500px] max-sm:w-[90vw] grid gap-2  ">
              <div className="flex justify-center my-2">
                <h2 className="text-2xl font-semibold">
                  Choose delivery method
                </h2>
              </div>
              <div
                className={` border  ${
                  chosenDeliveryCost == deliveryCost.postnord
                    ? " border-black"
                    : ""
                }`}
              >
                <label
                  htmlFor="postnord"
                  className=" flex py-2 cursor-pointer "
                >
                  <div>
                    <input
                      id="postnord"
                      type="radio"
                      name="delivery"
                      className=" w-5 h-5 mx-1 accent-black"
                      onChange={() =>
                        setChosenDeliveryCost(deliveryCost.postnord)
                      }
                    />
                  </div>

                  <div className="px-2 flex-1">
                    <h2 className="text-lg font-medium">Postnord</h2>
                    <p className="text-base text-gray-600">
                      Delivered to the mailbox/door, 3-5 weekdays. Larger
                      packages are sent to your pickup location.
                    </p>
                  </div>
                  <div className="flex flex-col h-full  my-3 mx-2">
                    <h2 className="text-center font-medium mb-2">
                      {totalAmount >= 150
                        ? "€ 0"
                        : `€ ${deliveryCost.postnord}`}
                    </h2>

                    <img
                      src="/src/assets/logos/postnord-logo.svg"
                      alt="Postnord logo"
                      className="w-[100px]"
                    />
                  </div>
                </label>
              </div>
              <div
                className={` border  ${
                  chosenDeliveryCost == deliveryCost.DHL ? " border-black" : ""
                }`}
              >
                <label htmlFor="DHL" className=" flex py-2 cursor-pointer ">
                  <div>
                    <input
                      id="DHL"
                      type="radio"
                      name="delivery"
                      className=" w-5 h-5 mx-1 accent-black"
                      onChange={() => setChosenDeliveryCost(deliveryCost.DHL)}
                    />
                  </div>

                  <div className="px-2 flex-1">
                    <h2 className="text-lg font-medium ">DHL</h2>
                    <p className="text-base text-gray-600">
                      Delivered to the nearest DHL pickup location, 2-4
                      weekdays.
                    </p>
                  </div>
                  <div className="flex flex-col h-full  my-3 mx-2">
                    <h2 className="text-center font-medium mb-2">
                      {totalAmount >= 150 ? "€ 0" : `€ ${deliveryCost.DHL}`}
                    </h2>

                    <img
                      src="/src/assets/logos/dhl-logo.svg"
                      alt="DHL logo"
                      className="w-[100px]  bg-yellow-300 p-[4px] "
                    />
                  </div>
                </label>
              </div>

              <div
                className={` border  ${
                  chosenDeliveryCost == deliveryCost.instabox
                    ? " border-black"
                    : ""
                }`}
              >
                <label
                  htmlFor="instabox"
                  className=" flex  py-2 cursor-pointer "
                >
                  <div>
                    <input
                      id="instabox"
                      type="radio"
                      name="delivery"
                      className=" w-5 h-5 mx-1 accent-black"
                      onChange={() =>
                        setChosenDeliveryCost(deliveryCost.instabox)
                      }
                    />
                  </div>

                  <div className="px-2 flex-1">
                    <h2 className="text-lg font-medium">Instabox</h2>
                    <p className="text-base text-gray-600">
                      Delivered to the nearest Instabox pickup location, 1-2
                      weekdays.
                    </p>
                  </div>
                  <div className="flex flex-col h-full  my-3 mx-2">
                    <h2 className="text-center font-medium mb-2">
                      {totalAmount >= 150
                        ? "€ 0"
                        : `€ ${deliveryCost.instabox}`}
                    </h2>

                    <img
                      src="/src/assets/logos/instabox-logo.svg"
                      alt="Instabox logo"
                      className="w-[100px]"
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div id="payment-section">
          <div id="payment-title">
            <h2 className="font-semibold  max-md:ml-3">4. Payment</h2>
          </div>
          <div
            id="payment-content"
            className={`lg:w-[970px] md:w-[730px] max-md:w-screen bg-white grid justify-center transition-all duration-300 origin-top ${
              informationDone && chosenDeliveryCost > 0
                ? "scale-y-100 opacity-100"
                : "scale-y-0 h-0 opacity-0"
            }`}
          >
            <div className=" w-[500px] max-sm:w-[90vw] grid  my-4 ">
              <form onSubmit={(e) => handlePurchaseCompleted(e)}>
                <div className="flex justify-center my-2">
                  <h2 className="text-2xl font-semibold">
                    Choose payment method
                  </h2>
                </div>
                <div
                  className={` border mb-2 ${
                    chosenPaymentMethod == "swish" ? " border-black" : ""
                  }`}
                >
                  <label htmlFor="swish" className=" flex py-2 items-center ">
                    <div>
                      <input
                        id="swish"
                        type="radio"
                        name="payment"
                        className=" w-5 h-5 mx-1 accent-black"
                        onChange={() => setChosenPaymentMethod("swish")}
                      />
                    </div>

                    <div className="px-2 flex-1">
                      <h2 className="text-lg font-medium">Pay with Swish</h2>
                    </div>
                    <div className="flex my-3 mx-2">
                      <img
                        src="/src/assets/logos/swish-logo.svg"
                        alt="Swish logo"
                        className="w-[100px]"
                      />
                    </div>
                  </label>
                  <div
                    id="payment-information"
                    className={`flex transition-all duration-300 origin-top ${
                      chosenPaymentMethod == "swish"
                        ? "scale-y-100 h-[78px] opacity-100 "
                        : "scale-y-0 h-0 opacity-0"
                    }`}
                  >
                    <input
                      type="number"
                      placeholder="Phone number for payment"
                      className="w-full mx-10 p-5 mb-3 border border-black"
                      required={chosenPaymentMethod == "swish"}
                    />
                  </div>
                </div>
                <div
                  className={` border  ${
                    chosenPaymentMethod == "card" ? " border-black" : ""
                  }`}
                >
                  <label htmlFor="card" className=" flex py-2 items-center ">
                    <div>
                      <input
                        id="card"
                        type="radio"
                        name="payment"
                        className=" w-5 h-5 mx-1 accent-black"
                        onChange={() => setChosenPaymentMethod("card")}
                      />
                    </div>

                    <div className="px-2 flex-1">
                      <h2 className="text-lg font-medium">Pay with Card</h2>
                    </div>
                    <div className="flex my-3 mx-2">
                      <img
                        src="/src/assets/card-icon.svg"
                        alt="Credit card icon"
                        className="w-[100px] px-8 py-4"
                      />
                    </div>
                  </label>
                  <div
                    className={`grid justify-center gap-2  transition-all duration-300 origin-top ${
                      chosenPaymentMethod == "card"
                        ? "scale-y-100 h-[174px] opacity-100"
                        : "scale-y-0 h-0 opacity-0"
                    }`}
                  >
                    <div className="max-sm:w-[80vw]">
                      <input
                        type="number"
                        placeholder="Card number"
                        className="border border-black p-5 w-full "
                        required={chosenPaymentMethod == "card"}
                      />
                    </div>
                    <div className="flex gap-2 max-sm:w-[80vw] my-4 ">
                      <input
                        type="date"
                        placeholder="MM/YY"
                        className="border border-black p-5 w-1/2 "
                        required={chosenPaymentMethod == "card"}
                      />
                      <input
                        type="number"
                        placeholder="CVC/CVV"
                        className="border border-black p-5 w-1/2 "
                        required={chosenPaymentMethod == "card"}
                      />
                    </div>
                  </div>
                </div>

                <div
                  id="final-total"
                  className="grid justify-center mt-10 border-y text-center py-6"
                >
                  <h3 className=" text-sm">To pay including VAT:</h3>
                  <h2 className=" text-5xl font-bold pt-4 ">
                    €
                    {totalAmount >= 150
                      ? totalAmount
                      : totalAmount + chosenDeliveryCost}
                  </h2>
                </div>
                <button
                  type="submit"
                  disabled={!informationDone && chosenDeliveryCost == 0}
                  className="p-5 my-5 w-full bg-black text-white font-semibold hover:opacity-75 disabled:bg-gray-400 disabled:hover:opacity-100"
                >
                  Pay Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
