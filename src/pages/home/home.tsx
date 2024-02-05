import { Footer } from "../../components/footer";
import { Navbar } from "../../components/navbar";
import { ProductList } from "./productList";

export const Home = () => {
  //TODO: create custom interface/type for data!
  const mockData: Product[] = [
    {
      name: "Secret Garden Sweater",
      price: 160,
      description: "Really cool embroidery sweater",
      images: {
        front: "/src/assets/Sakura-front.webp",
        back: "/src/assets/Sakura-back.webp",
      },
    },
    {
      name: "Fine China Sherpa Fleece",
      price: 160,
      description: "Really cool embroidery sweater",
      images: {
        front: "/src/assets/Sakura-front.webp",
        back: "/src/assets/Sakura-back.webp",
      },
    },
    {
      name: "Hidden River Sweater",
      price: 160,
      description: "Really cool embroidery sweater, gotta love it broski",
      images: {
        front: "/src/assets/Sakura-front.webp",
        back: "/src/assets/Sakura-back.webp",
      },
    },
    {
      name: "Secret Garden Sweater",
      price: 160,
      description: "",
      images: {
        front: "/src/assets/Sakura-front.webp",
        back: "/src/assets/Sakura-back.webp",
      },
    },
    {
      name: "Mille Fleurs Sweater",
      price: 160,
      description: "",
      images: {
        front: "/src/assets/Sakura-front.webp",
        back: "/src/assets/Sakura-back.webp",
      },
    },
    {
      name: "Sakura Sweater",
      price: 160,
      description: "",
      images: {
        front: "/src/assets/Sakura-front.webp",
        back: "/src/assets/Sakura-back.webp",
      },
    },
    {
      name: "Spring revival Jumper",
      price: 160,
      description: "",
      images: {
        front: "/src/assets/Sakura-front.webp",
        back: "/src/assets/Sakura-back.webp",
      },
    },
    {
      name: "Verano en Tierra Sweater",
      price: 160,
      description: "",
      images: {
        front: "/src/assets/Sakura-front.webp",
        back: "/src/assets/Sakura-back.webp",
      },
    },
    {
      name: "Botanical Sherpa Fleece",
      price: 160,
      description: "",
      images: {
        front: "/src/assets/Sakura-front.webp",
        back: "/src/assets/Sakura-back.webp",
      },
    },
  ];

  return (
    <div id="Home" className="overflow-hidden ">
      <Navbar />
      <div id="hero">
        <img src="/src/assets/hero-image.png" alt="" className=" w-full" />
      </div>
      <div className=" grid justify-items-center my-4">
        <h3>New Arrivals</h3>
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
        <ProductList data={mockData} />
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
            className=" object-cover h-full w-full "
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};
