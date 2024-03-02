import { useEffect, useState } from "react";
import { Footer } from "../../components/footer/footer";
import { Navbar } from "../../components/navbar/navbar";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { SiteLoader } from "../../components/siteLoader";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSignIn = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      await handleCartsSync(user.uid);

      navigate("/account");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCartsSync = async (uid: string) => {
    let offlineCart = [];

    //get current localstorage cart
    const offlineCartString = localStorage.getItem("cartItems");

    if (offlineCartString) {
      offlineCart = JSON.parse(offlineCartString);
    }

    //send cart to firebase by adding to the current online cart array and not overwriting
    await updateDoc(doc(db, "users", uid), {
      ["cart"]: arrayUnion(...offlineCart),
    });

    //clears the offline cart
    localStorage.removeItem("cartItems");
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  useEffect(() => {
    //checks if user is logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/account");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <SiteLoader />
      <Navbar solidBg={true} />
      <div className="grid justify-center py-5 montserrat-regular ">
        <form
          onSubmit={handleSignIn}
          className=" flex flex-col justify-center w-[500px] max-sm:w-[400px] max-[450px]:w-[350px]  text-center p-10 "
        >
          <h1 className="text-base">Login</h1>
          <div className="text-start pt-7 pb-3 ">
            <h2 className="text-xs font-semibold">Email</h2>
          </div>
          <input
            type="email"
            className="border px-5 py-3 rounded-sm"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="text-start pt-7 pb-3 ">
            <h2 className="text-xs font-semibold">Password</h2>
          </div>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              className="border px-5 py-3 rounded-sm w-full"
              onChange={(e) => setPassword(e.target.value)}
              pattern=".{6,}"
              title="Password must be at least 6 characters long"
              required
            />
            <h3
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute bg-white right-2 top-3 p-2 text-sm font-medium cursor-pointer"
            >
              {passwordVisible ? "HIDE" : "SHOW"}
            </h3>
          </div>

          <button
            type="submit"
            className="text-white text-sm bg-black mt-8 py-5 rounded-sm hover:opacity-75 font-semibolds"
          >
            Sign in
          </button>
          <button
            onClick={navigateToRegister}
            className="text-black text-sm bg-white border border-black mt-5 py-5 rounded-sm hover:opacity-75 font-semibold"
          >
            Register
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};
