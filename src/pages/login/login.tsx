import { useState } from "react";
import { Footer } from "../../components/footer/footer";
import { Navbar } from "../../components/navbar/navbar";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const navigate = useNavigate();

  const handleLogin = () => {};

  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <div>
      <Navbar solidBg={true} />
      <div className="grid justify-center py-5 montserrat-regular ">
        <form className=" flex flex-col justify-center w-[500px]  text-center p-10 ">
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
          <input
            type="text"
            className="border px-5 py-3 rounded-sm"
            onChange={(e) => setPassword(e.target.value)}
            pattern=".{6,}"
            title="Password must be at least 6 characters long"
            required
          />
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
