import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../features/cart";
import { Navbar } from "../../components/navbar/navbar";
import { SiteLoader } from "../../components/siteLoader";
import { useNavigate } from "react-router-dom";

export const Completed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate("/");
  };

  useEffect(() => {
    ///send order to firebase?
    //clear cart
    dispatch(actions.clearCart());
  }, []);

  return (
    <div>
      <SiteLoader />
      <Navbar solidBg={true} />

      <div className="montserrat-regular h-[calc(100vh-96px)] pb-20 grid justify-center items-center">
        <div className="sm:w-[500px]  max-sm:w-screen max-sm:px-5">
          <h1 className=" text-3xl font-medium">Purchase Successful</h1>
          <h2 className="text-xl">Order number: </h2>
          <h2 className="text-xl">Thank you for your purchase!</h2>
          <div className="flex justify center ">
            <button
              onClick={handleContinueShopping}
              className="p-5 bg-black text-white font-semibold w-full my-5"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
