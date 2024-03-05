import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NewsletterModal } from "./newsletterModal";

export const Footer = () => {
  const [newsletterModalActive, setNewsletterModalActive] =
    useState<boolean>(false);

  const handleNewsletterSignup = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setNewsletterModalActive(true);
  };

  useEffect(() => {
    if (newsletterModalActive) {
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "scroll";
    return () => {};
  }, [newsletterModalActive]);

  return (
    <div className="flex gap-14 px-9 py-16  montserrat-regular max-lg:grid max-lg:grid-cols-2 max-md:grid-cols-1 border-t">
      {newsletterModalActive ? (
        <NewsletterModal setNewsletterModalActive={setNewsletterModalActive} />
      ) : (
        ""
      )}
      <div>
        <h3 className="  text-sm  mb-7 max-md:mb-3">About UNICO</h3>
        <p className=" text-xs mb-7">
          UNICO is your bridge between the spheres of adventure and tradition.
          We fuse unorthodox details and vibrant colors with classic silhouettes
          to produce perfectly balanced pieces. Effortlessly bring artistic
          expression into your every day with us. <br />
          <br />
          We pride ourselves on our quality products and sustainable sourcing.
          Our products will always be progressive and accessible.
        </p>
        <div className="flex">
          <div className=" h-7 w-7 mr-3 cursor-pointer hover:opacity-65">
            <img src="Unico/src/assets/socials-fb-icon.svg" alt="" />
          </div>
          <div className=" h-7 w-7 mr-3 cursor-pointer hover:opacity-65">
            <img src="Unico/src/assets/socials-ig-icon.svg" alt="" />
          </div>
          <div className=" h-7 w-7 mr-3 cursor-pointer hover:opacity-65">
            <img src="Unico/src/assets/socials-tt-icon.svg" alt="" />
          </div>
        </div>
      </div>

      <div className=" whitespace-nowrap">
        <h3 className="mb-7 text-sm max-md:mb-3">Connect</h3>
        <ul className=" text-xs">
          <li className=" mb-2 hover:opacity-65">
            <Link to="">Contact Us</Link>
          </li>
          <li className=" mb-2 hover:opacity-65">
            <Link to="">Careers</Link>
          </li>
          <li className=" mb-2 hover:opacity-65">
            <Link to="">Customer Service</Link>
          </li>
        </ul>
      </div>
      <div className=" whitespace-nowrap">
        <h3 className="mb-7 text-sm max-md:mb-3">Company</h3>
        <ul className="text-xs">
          <li className=" mb-2 hover:opacity-65">
            <Link to="">About us</Link>
          </li>
          <li className=" mb-2 hover:opacity-65">
            <Link to="">Sustainability</Link>
          </li>
          <li className=" mb-2 hover:opacity-65">
            <Link to="">Returns & Exchanges</Link>
          </li>
        </ul>
      </div>
      <div>
        <form onSubmit={handleNewsletterSignup}>
          <h3 className="mb-7 text-sm max-md:mb-3">Newsletter</h3>
          <p className=" text-xs">
            Sign up for exclusive offers, original stories, events and more.
          </p>
          <input
            type="email"
            placeholder="Enter email"
            className=" border border-gray-500 rounded-sm my-4 p-3 text-xs w-96 max-lg:w-10/12"
            required
          />
          <button className=" block border border-black py-2 px-5 rounded-sm text-sm hover:bg-black hover:text-white">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};
