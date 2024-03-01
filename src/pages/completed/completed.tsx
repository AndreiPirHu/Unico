import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../features/cart";
import { Navbar } from "../../components/navbar/navbar";
import { SiteLoader } from "../../components/siteLoader";
import { useNavigate, useParams } from "react-router-dom";
import { Footer } from "../../components/footer/footer";
import { RootState } from "../../features/rootReducer";

export const Completed = () => {
  const { orderID } = useParams<{ orderID: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const correctID = useSelector((state: RootState) => state.order);

  const handleContinueShopping = () => {
    navigate("/");
  };

  useEffect(() => {
    if (orderID !== correctID) {
      navigate("/");
    }
    dispatch(actions.clearCart());
  }, []);

  return (
    <div>
      <SiteLoader />
      <Navbar solidBg={true} />

      <div className="montserrat-regular py-52 grid justify-center items-center">
        <div className="sm:w-[500px]  max-sm:w-screen max-sm:px-5">
          <h1 className=" text-3xl font-medium">Purchase Successful</h1>
          <div className="flex items-end">
            <h2 className="text-xl">Order number: </h2>
            <h2 className="text-xl font-semibold pl-2">{orderID}</h2>
          </div>

          <h2 className="text-xl">Thank you for your purchase!</h2>
          <p className="text-base pt-2 text-gray-700">
            An order confirmation has been sent to your email
          </p>
          <div className="flex justify center ">
            <button
              onClick={handleContinueShopping}
              className="p-5 bg-black text-white font-semibold w-full my-5 hover:opacity-75"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
