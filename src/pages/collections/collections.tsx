import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { RootState } from "../../features/rootReducer";
import { useEffect, useState } from "react";
import { ProductList } from "../../components/productList";
import { Navbar } from "../../components/navbar/navbar";
import { Footer } from "../../components/footer/footer";
import { SiteLoader } from "../../components/siteLoader";
import { Error } from "../error/error";

export const Collections = () => {
  const { pathname } = useLocation();
  const { category } = useParams<{ category: string }>();
  const products: Product[] = useSelector(
    (state: RootState) => state.products.products
  );
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [title, setTitle] = useState<string>();
  const [productsAmount, setProductsAmount] = useState<number>();
  const [categoryDescription, setCategoryDescription] = useState<string>();
  const [categoryExists, setCategoryExists] = useState<boolean>(true);

  const getDescription = (category: string) => {
    return {
      all: "Embark on a journey of sartorial excellence with our curated collection, featuring a harmonious blend of crocheted, embroidered, and stitched tops. Each piece is a symphony of craftsmanship, meticulously crafted to elevate your style with timeless elegance and sophistication.",
      "new-arrivals":
        "Introducing our latest arrivals, a captivating ensemble of sartorial wonders designed to ignite your sense of style and elevate your wardrobe to new heights. Immerse yourself in a world of timeless elegance and modern sophistication as you explore our meticulously curated collection, brimming with exquisite pieces that exude charm and refinement.",
      embroidery:
        "Elevate your style with our range of exquisite embroidered sweaters. Each piece is adorned with unique embroidery, showcasing a blend of artistry and comfort. Indulge in the luxury of premium materials such as soft cotton and fine merino wool. Explore the entire assortment and embrace the art of embroidered knitwear.",
      stitch:
        "Discover a new dimension of style with our captivating stitched tops. Every piece is a masterpiece of craftsmanship, boasting intricate shale stitch patterns that blend creativity with coziness effortlessly. Uncover the full spectrum of our collection and immerse yourself in the allure of shale stitch knitwear artistry.",
      crochet:
        "Embark on a journey of elegance with our exclusive collection of crocheted tops, where each stitch tells a story of artisanal mastery. Immerse yourself in the intricate beauty of crochet craftsmanship, where delicate patterns and textures elevate your style to new heights. Luxuriate in the embrace of premium yarns, chosen for their sumptuous feel and exquisite drape, ensuring unparalleled comfort and sophistication. Explore our handpicked selection and indulge in the timeless allure of crocheted knitwear.",
    }[category];
  };

  useEffect(() => {
    if (category !== undefined) {
      const newTitle = category.charAt(0).toUpperCase() + category.slice(1);
      setTitle(newTitle);
    }

    if (category == "all") {
      setCategoryProducts(products);
      setProductsAmount(products.length);
    } else if (category == "new-arrivals") {
      setCategoryProducts(products.slice(0, 6));
      setProductsAmount(6);
      setTitle("New Arrivals");
    } else {
      const filteredProducts: Product[] = products.filter(
        (product) => product.type == category
      );
      setCategoryProducts(filteredProducts);
      setProductsAmount(filteredProducts.length);
    }
    if (category) {
      setCategoryDescription(getDescription(category));
    }
  }, [products, pathname]);

  useEffect(() => {
    if (productsAmount && productsAmount > 0) {
      setCategoryExists(true);
    } else {
      setCategoryExists(false);
    }
  }, [productsAmount]);

  if (categoryExists) {
    return (
      <div>
        <SiteLoader />
        <Navbar solidBg={true} />
        <div
          id="information-container"
          className=" grid justify-center mt-10 text-center montserrat-regular"
        >
          <div className="grid justify-center">
            <h1 className="text-xl">{title}</h1>
            <p className=" text-center text-sm max-w-[600px] mx-10 my-5">
              {categoryDescription}
            </p>
          </div>
          <div className="text-sm mt-5">
            <h2>{productsAmount} products</h2>
          </div>
        </div>

        <div id="products-container" className=" mb-10">
          <ProductList data={categoryProducts} />
        </div>

        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <Error />
      </div>
    );
  }
};
