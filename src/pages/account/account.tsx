import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useEffect } from "react";
import { SiteLoader } from "../../components/siteLoader";

export const Account = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    auth.signOut();
    navigate("/login");
  };

  useEffect(() => {
    //redirect to login if not logged in
    if (!auth.currentUser) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <SiteLoader />
      {auth.currentUser?.email}
      <button onClick={handleLogOut}>Log out</button>
    </div>
  );
};
