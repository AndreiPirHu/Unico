import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useEffect, useState } from "react";
import { SiteLoader } from "../../components/siteLoader";
import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../components/footer/footer";
import { AccountInfo } from "./accountInfo";

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
      <div className="flex my-10 px-5 montserrat-regular ">
        <div id="menu">
          <ul className="border-t w-[200px] ">
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
              onClick={() => setActiveTab("favorites")}
              className={`text-base border-b py-5 text-center cursor-pointer hover:opacity-75 ${
                activeTab === "favorites"
                  ? "font-semibold hover:opacity-100"
                  : ""
              }`}
            >
              Favorites
            </li>
            <li
              onClick={handleLogOut}
              className="text-base border-b py-5 text-center cursor-pointer bg-red-500 hover:opacity-75"
            >
              Log out
            </li>
          </ul>
        </div>
        <div id="content" className="pl-5">
          <AccountInfo />
        </div>
      </div>

      <Footer />
    </div>
  );
};
