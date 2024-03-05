import { useSelector } from "react-redux";
import { Footer } from "../../components/footer/footer";
import { Navbar } from "../../components/navbar/navbar";
import { ProductList } from "../../components/productList";
import { RootState } from "../../features/rootReducer";
import { SiteLoader } from "../../components/siteLoader";
import { Link } from "react-router-dom";

export const Home = () => {
  const products: Products = useSelector((state: RootState) => state.products);

  return (
    <div id="Home" className="overflow-hidden">
      <SiteLoader />
      <Navbar solidBg={false} />

      <div id="hero">
        <picture>
          <source
            media="(max-width:640px)"
            srcSet="Unico/src/assets/hero-image-small.webp"
          />
          <source
            media="(min-width:641px)"
            //Change src to /src/assets/hero-image.png if it stops working
            srcSet="https://www.yitai.la/cdn/shop/files/Frame_357.jpg?v=1651694659"
          />
          <img
            src="Unico/src/assets/hero-image.png"
            alt=""
            className=" w-full max-md:h-screen max-md:object-cover max-sm:h-[100vh] object-top"
          />
        </picture>
      </div>
      <div className=" grid justify-items-center my-10 montserrat-regular">
        <h3 className=" text-3xl">New Arrivals</h3>

        <p className=" underline font-medium text-gray-700 text-lg mt-2 hover:opacity-75 ">
          <Link to="/collections/all">View all</Link>
        </p>
      </div>
      <div>
        <ProductList data={products.products.slice(0, 6)} />
      </div>
      <div className="flex max-h-[760px] mt-9 max-sm:max-h-[400px]">
        <div className=" flex-1 ">
          <img
            src="Unico/src/assets/home-promo-image.png"
            alt=""
            className=" object-cover h-full w-full"
          />
        </div>
        <div className="flex-1 max-sm:hidden ">
          <img
            src="Unico/src/assets/home-promo-image-2.png"
            alt=""
            className=" object-cover h-full w-full border-t "
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};
