export const Footer = () => {
  return (
    <div className="flex gap-14 mx-9 my-16 montserrat-regular max-lg:grid max-lg:grid-cols-2 max-md:grid-cols-1">
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
          <div className=" h-7 w-7 mr-3">
            <img src="/src/assets/socials-fb-icon.svg" alt="" />
          </div>
          <div className=" h-7 w-7 mr-3">
            <img src="/src/assets/socials-ig-icon.svg" alt="" />
          </div>
          <div className=" h-7 w-7 mr-3">
            <img src="/src/assets/socials-tt-icon.svg" alt="" />
          </div>
        </div>
      </div>

      <div className=" whitespace-nowrap">
        <h3 className="mb-7 text-sm max-md:mb-3">Connect</h3>
        <ul className=" text-xs">
          <li className=" mb-2">Contact Us</li>
          <li className=" mb-2">Careers</li>
          <li className=" mb-2">Customer Service</li>
        </ul>
      </div>
      <div className=" whitespace-nowrap">
        <h3 className="mb-7 text-sm max-md:mb-3">Company</h3>
        <ul className="text-xs">
          <li className=" mb-2">About us</li>
          <li className=" mb-2">Sustainability</li>
          <li className=" mb-2">Returns & Exchanges</li>
        </ul>
      </div>
      <div>
        <h3 className="mb-7 text-sm max-md:mb-3">Newsletter</h3>
        <p className=" text-xs">
          Sign up for exclusive offers, original stories, events and more.
        </p>
        <input
          type="text"
          placeholder="Enter email"
          className=" border border-gray-500 rounded-sm my-4 p-3 text-xs w-96 max-lg:w-10/12"
        />
        <button className=" block border border-black py-2 px-5 rounded-sm text-sm hover:bg-black hover:text-white">
          Sign up
        </button>
      </div>
    </div>
  );
};
