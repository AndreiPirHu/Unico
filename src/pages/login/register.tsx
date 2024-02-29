import { useEffect, useState } from "react";
import { Footer } from "../../components/footer/footer";
import { Navbar } from "../../components/navbar/navbar";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { SiteLoader } from "../../components/siteLoader";

export const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleRegister = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/account");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //redirect to account if logged in
    if (auth.currentUser) {
      navigate("/account");
    }
  }, []);

  return (
    <div>
      <SiteLoader />
      <Navbar solidBg={true} />
      <div className="grid justify-center py-5 montserrat-regular ">
        <form
          onSubmit={handleRegister}
          className=" flex flex-col justify-center w-[500px]  text-center p-10 "
        >
          <h1 className="text-base">Register</h1>
          <div className="text-start pt-7 pb-3 ">
            <h2 className="text-xs font-semibold">First Name</h2>
          </div>
          <input
            type="text"
            className="border px-5 py-3 rounded-sm"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <div className="text-start pt-7 pb-3 ">
            <h2 className="text-xs font-semibold">Last Name</h2>
          </div>
          <input
            type="text"
            className="border px-5 py-3 rounded-sm"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
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
            Create Account
          </button>
          <div className="flex pt-3">
            <h3 className="text-base">Already have an account?</h3>
            <Link
              to="/login"
              className="text-base font-semibold pl-2 underline underline-offset-2 cursor-pointer hover:opacity-75"
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};
