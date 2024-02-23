import { useSelector } from "react-redux";
import { Footer } from "../../components/footer/footer";
import { Navbar } from "../../components/navbar/navbar";
import { ProductList } from "../../components/productList";
import { RootState } from "../../features/rootReducer";
import { SiteLoader } from "../../components/siteLoader";

export const Home = () => {
  let productsFromRedux: Products = useSelector(
    (state: RootState) => state.products
  );

  return (
    <div id="Home" className="overflow-hidden">
      <SiteLoader />
      <Navbar solidBg={false} />

      <div id="hero">
        <picture>
          <source
            media="(max-width:640px)"
            srcSet="/src/assets/hero-image-small.webp"
          />
          <source
            media="(min-width:641px)"
            //Change src to /src/assets/hero-image.png if it stops working
            srcSet="https://www.yitai.la/cdn/shop/files/Frame_357.jpg?v=1651694659"
          />
          <img
            src="/src/assets/hero-image.png"
            alt=""
            className=" w-full max-md:h-screen max-md:object-cover max-sm:h-[100vh] object-top"
          />
        </picture>
      </div>
      <div className=" grid justify-items-center my-4 montserrat-regular">
        <h3 className=" text-base">New Arrivals</h3>
        <p className=" underline text-gray-700 text-sm  ">View all</p>
        <p className=" text-center text-xs w-2/4">
          Elevate your style with our range of exquisite embroidered sweaters.
          Each piece is adorned with unique embroidery, showcasing a blend of
          artistry and comfort. Indulge in the luxury of premium materials such
          as soft cotton and fine merino wool. Explore the entire assortment in
          our latest arrivals and embrace the art of embroidered knitwear.
        </p>
      </div>
      <div>
        <ProductList data={productsFromRedux.products} />
      </div>
      <div className="flex max-h-[760px] mt-9 max-sm:max-h-[400px]">
        <div className=" flex-1 ">
          <img
            src="/src/assets/home-promo-image.png"
            alt=""
            className=" object-cover h-full w-full"
          />
        </div>
        <div className="flex-1 max-sm:hidden ">
          <img
            src="/src/assets/home-promo-image-2.png"
            alt=""
            className=" object-cover h-full w-full border-t "
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};
