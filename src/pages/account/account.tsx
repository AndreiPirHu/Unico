import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useEffect, useState } from "react";
import { SiteLoader } from "../../components/siteLoader";
import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../components/footer/footer";
import { AccountInfo } from "./accountInfo";
import { OrderHistory } from "./orderHistory";

export const Account = () => {
  const [activeTab, setActiveTab] = useState<string>("account");

  const navigate = useNavigate();

  const handleLogOut = () => {
    auth.signOut();
    navigate("/login");
  };

  useEffect(() => {
    //checks if user is logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <SiteLoader />
      <Navbar solidBg={true} />
      <div className="flex  my-10 px-5 montserrat-regular max-sm:flex-col ">
        <div id="menu-small" className="sm:hidden text-base font-semibold ">
          <ul className="flex whitespace-nowrap justify-between mx-5 mb-10 border-y py-5">
            <li
              onClick={() => setActiveTab("account")}
              className=" cursor-pointer hover:opacity-75"
            >
              Account
            </li>
            <li
              onClick={() => setActiveTab("orders")}
              className=" cursor-pointer hover:opacity-75"
            >
              Orders
            </li>

            <li
              className="underline underline-offset-2 cursor-pointer font-bold text-red-600 hover:opacity-75"
              onClick={handleLogOut}
            >
              Log Out
            </li>
          </ul>
        </div>
        <div id="menu" className="max-sm:hidden">
          <ul className="border-t w-[200px]  ">
            <li
              onClick={() => setActiveTab("account")}
              className={`text-base border-b py-5 text-center cursor-pointer hover:opacity-75 ${
                activeTab === "account" ? "font-semibold hover:opacity-100" : ""
              }`}
            >
              My Account
            </li>
            <li
              onClick={() => setActiveTab("orders")}
              className={`text-base border-b py-5 text-center cursor-pointer hover:opacity-75 ${
                activeTab === "orders" ? "font-semibold hover:opacity-100" : ""
              }`}
            >
              Order History
            </li>

            <li
              onClick={handleLogOut}
              className="text-base border-b py-5 text-center cursor-pointer bg-red-500 hover:opacity-75"
            >
              Log out
            </li>
          </ul>
        </div>
        <div id="content" className="pl-5 w-full">
          {activeTab === "account" && <AccountInfo />}
          {activeTab === "orders" && <OrderHistory />}
        </div>
      </div>

      <Footer />
    </div>
  );
};
