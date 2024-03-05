import { useState } from "react";

export const GeneralInfoAccordions = () => {
  const [shippingIsToggled, setShippingIsToggled] = useState<boolean>(false);

  return (
    <div className="montserrat-regular text-sm font-medium  mt-7 relative">
      <span className="block h-px bg-gray-300 "></span>
      <div
        className="flex items-center my-3 relative cursor-pointer"
        onClick={() => setShippingIsToggled(!shippingIsToggled)}
      >
        <img
          src="Unico/src/assets/plane-icon.svg"
          alt="Airplane icon"
          className=" h-6 p-1"
        />
        <h2>Shipping & Return</h2>

        <span
          className={`block bg-black w-[13px] h-px absolute right-6 transition-all duration-300 ease-in-out max-[260px]:hidden
          ${shippingIsToggled ? " rotate-180" : ""}`}
        ></span>
        <span
          className={`block  w-px h-[13px] absolute right-[30px] transition-all duration-300 ease-in-out max-[260px]:hidden ${
            shippingIsToggled ? "bg-transparent rotate-90" : "bg-black"
          }`}
        ></span>
      </div>

      <div
        className={`transition-all duration-150 ${
          shippingIsToggled ? ` text-black  ` : " text-transparent "
        }`}
      >
        <ul
          className={` list-disc font-normal pl-6 text-gray-700 transition-all duration-500 origin-top  ${
            shippingIsToggled
              ? " scale-y-100 opacity-100 max-[325px]:h-auto  max-[345px]:h-[220px] max-[450px]:h-[180px]  max-sm:h-[160px] sm:h-[110px] md:h-[170px] lg:h-[140px]"
              : "scale-y-0 opacity-0  h-0"
          }`}
        >
          <li className="mt-3">
            <p>
              Standard delivery: Free shipping on purchases over 150 Euro, 3-5
              working days. Read more about delivery here.
            </p>
          </li>
          <li className="mt-3">
            <p>
              14-day return policy. For more information about exchanges and
              returns, click here.
            </p>
          </li>
          <li className="mt-3">
            <p>
              Secure payments: Choose between credit card payment, direct
              payment, invoice, account/installment payment, or PayPal. Read
              more about payments here.
            </p>
          </li>
        </ul>
      </div>

      <span
        className={`block h-px w-full bg-gray-300 mt-3 transition-all duration-500 absolute  ${
          shippingIsToggled ? " top-full" : "top-9  "
        }`}
      ></span>
    </div>
  );
};
