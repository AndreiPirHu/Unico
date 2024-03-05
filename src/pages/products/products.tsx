import { Link, useLocation, useParams } from "react-router-dom";
import { Footer } from "../../components/footer/footer";
import { Navbar } from "../../components/navbar/navbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/rootReducer";
import React, { useEffect, useRef, useState } from "react";
import { ProductImagesModal } from "./productImagesModal";
import { SiteLoader } from "../../components/siteLoader";
import { GeneralInfoAccordions } from "./generalInfoAccordions";
import { actions } from "../../features/cart";
import { v4 as uuidv4 } from "uuid";
import { Error } from "../error/error";

export const Products = () => {
  const { name } = useParams<{ name: string }>();
  const products: Products = useSelector((state: RootState) => state.products);
  const [currentProduct, setCurrentProduct] = useState<Product>();
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const [picturesNodeList, setPicturesNodeList] = useState<React.ReactNode[]>(
    []
  );
  const [ProductImagesModalActive, setProductImagesModalActive] =
    useState<boolean>(false);
  const [chosenSize, setChosenSize] = useState<string>("");
  const [chosenQuantity, setChosenQuantity] = useState<number>(1);
  const [cartButtonValue, setCartButtonValue] = useState<string>("Add to Cart");
  const [buyIsVisible, setBuyIsVisible] = useState<boolean>(false);
  const [productAdded, setProductAdded] = useState<boolean>(false);
  const [productExists, setProductExists] = useState<boolean>(true);

  const { pathname } = useLocation();

  const getCurrentProduct = () => {
    if (name) {
      //replaces all instances of hyphen (-) with space
      let modifiedName = name.replace(/-/g, " ");

      // Replace specific phrases that contain hyphens!
      modifiedName = modifiedName.replace(/\bT shirt\b/g, "T-shirt");
      modifiedName = modifiedName.replace(/\bButton up\b/g, "Button-up");

      //find the correct product
      setCurrentProduct(
        products.products.find((product) => product.name == modifiedName)
      );
    }
  };

  let hoverTimeout = useRef<number | null>(null);
  const changeImage = (imageUrl: string | undefined) => {
    setSelectedImage(imageUrl);
  };
  const buyButtonRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const createPicturesNodeList = () => {
    setPicturesNodeList([]);
    if (currentProduct?.imagesAll) {
      for (const pictureUrl of currentProduct?.imagesAll) {
        const newPicture: React.ReactNode = (
          <div className="pb-2" key={pictureUrl}>
            <img
              src={pictureUrl}
              alt="picture of clothing product"
              className=" h-32 min-w-[86px]  cursor-pointer"
              onClick={() => changeImage(pictureUrl)}
            />
            <span
              className={` transition-colors duration-300 ${
                selectedImage == pictureUrl ? "block h-1 bg-gray-600" : ""
              } `}
            ></span>
          </div>
        );
        setPicturesNodeList((prevState) => {
          return [...prevState, newPicture];
        });
      }
    }
  };

  const handleSizeNotChosenEnter = () => {
    if (!chosenSize) {
      setCartButtonValue("Please Select a Size");
      if (hoverTimeout.current !== null) {
        clearTimeout(hoverTimeout.current);
      }
    }
  };
  const handleSizeNotChosenLeave = () => {
    hoverTimeout.current = window.setTimeout(() => {
      setCartButtonValue("Add to Cart");
    }, 1000);
  };

  const handleScroll = () => {
    const buyButton: HTMLDivElement | null = buyButtonRef.current;
    if (buyButton) {
      const { bottom } = buyButton.getBoundingClientRect();

      setBuyIsVisible(bottom <= window.innerHeight);
    }
  };

  const handleAddToCart = () => {
    if (currentProduct && chosenSize) {
      for (let i = 0; i < chosenQuantity; i++) {
        const newCartProduct: CartProduct = {
          ...currentProduct,
          id: uuidv4(),
          size: chosenSize,
        };
        setChosenQuantity(1);
        //sending to redux, localstorage updates automatically
        dispatch(actions.addToCart(newCartProduct));
      }
      setProductAdded(true);
    } else {
      return;
    }
  };

  useEffect(() => {
    getCurrentProduct();
  }, [products, pathname]);

  useEffect(() => {
    setSelectedImage(currentProduct?.images.front);
    createPicturesNodeList();
    if (currentProduct) {
      setProductExists(true);
    } else {
      setProductExists(false);
    }
  }, [currentProduct]);

  useEffect(() => {
    createPicturesNodeList();
  }, [selectedImage]);

  useEffect(() => {
    if (ProductImagesModalActive) {
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "scroll";
    return () => {};
  }, [ProductImagesModalActive]);

  useEffect(() => {
    setCartButtonValue("Add to Cart");
  }, [chosenSize]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    setBuyIsVisible(false);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (productExists) {
    return (
      <div>
        <SiteLoader />
        {ProductImagesModalActive ? (
          <ProductImagesModal
            selectedImage={selectedImage}
            setProductImagesModalActive={setProductImagesModalActive}
            picturesNodeList={picturesNodeList}
          />
        ) : (
          ""
        )}

        <Navbar
          solidBg={true}
          productAdded={productAdded}
          setProductAdded={setProductAdded}
        />
        <div className="grid grid-cols-2 my-14 px-9  max-md:grid-cols-1 max-[540px]:mt-0 ">
          <div
            id="breadcrumbs"
            className="flex text-xs pb-3 gap-1 max-md:hidden"
          >
            <Link to={"/collections/" + currentProduct?.type}>
              <h1>{currentProduct?.type.toUpperCase()} </h1>
            </Link>

            <img
              src="Unico/src/assets/arrow-icon.svg"
              alt="arrow icon"
              className="w-2"
            />
            <Link to={"/products/" + currentProduct?.name}>
              <h1>{currentProduct?.name.toUpperCase()}</h1>
            </Link>
          </div>
          <div></div>
          <div className="grid justify-center">
            <img
              src={selectedImage}
              alt="picture of clothing product"
              className=" min-[541px]:max-h-[600px] max-[540px]:max-w-[100vw] cursor-pointer"
              onClick={() => {
                setProductImagesModalActive(true);
              }}
            />
            <div className="flex gap-2 my-5 max-w-[400px] overflow-scroll">
              {picturesNodeList}
            </div>
          </div>
          <div className="md:pl-10 lg:mr-[15%]">
            <div className="montserrat-regular">
              <h1 className=" text-2xl ">{currentProduct?.name}</h1>
              <h2 className=" text-xl my-1">€{currentProduct?.price}</h2>
              <span className=" block h-px bg-gray-400 my-5  "></span>
              <h3 className="text-sm montserrat-bold">Size</h3>
              <div className=" flex flex-wrap gap-2 my-3">
                <button
                  className={`w-10 h-10 rounded-sm border hover:border-gray-800 text-sm ${
                    chosenSize == "XS" ? "border-gray-800" : " "
                  }`}
                  onClick={() => setChosenSize("XS")}
                >
                  XS
                </button>
                <button
                  className={`w-10 h-10 rounded-sm border hover:border-gray-800 text-sm ${
                    chosenSize == "S" ? "border-gray-800" : " "
                  }`}
                  onClick={() => setChosenSize("S")}
                >
                  S
                </button>
                <button
                  className={`w-10 h-10 rounded-sm border hover:border-gray-800 text-sm ${
                    chosenSize == "M" ? "border-gray-800" : " "
                  }`}
                  onClick={() => setChosenSize("M")}
                >
                  M
                </button>
                <button
                  className={`w-10 h-10 rounded-sm border hover:border-gray-800 text-sm ${
                    chosenSize == "L" ? "border-gray-800" : " "
                  }`}
                  onClick={() => setChosenSize("L")}
                >
                  L
                </button>
                <button
                  className={`w-10 h-10 rounded-sm  border hover:border-gray-800 text-sm ${
                    chosenSize == "XL" ? "border-gray-800" : " "
                  }`}
                  onClick={() => setChosenSize("XL")}
                >
                  XL
                </button>
              </div>

              <h3 className="text-sm montserrat-bold mt-5 mb-3">Quantity</h3>
              <div className="flex">
                <button
                  onClick={() =>
                    setChosenQuantity((prevValue) => {
                      if (prevValue > 1) {
                        return prevValue - 1;
                      } else {
                        return prevValue;
                      }
                    })
                  }
                >
                  <img
                    src="Unico/src/assets/minus-icon.svg"
                    alt=""
                    className="h-10 w-10 border hover:border-gray-800"
                  />
                </button>
                <h3 className=" flex h-10 w-10 items-center justify-center border  mx-3">
                  {chosenQuantity}
                </h3>
                <button
                  onClick={() =>
                    setChosenQuantity((prevValue) => {
                      return prevValue + 1;
                    })
                  }
                >
                  <img
                    src="Unico/src/assets/plus-icon.svg"
                    alt=""
                    className="h-10 w-10 border hover:border-gray-800"
                  />
                </button>
              </div>

              <div ref={buyButtonRef}>
                <button
                  className=" w-full h-14 my-10 bg-white text-base border border-gray-800 rounded-sm hover:invert  "
                  onMouseEnter={handleSizeNotChosenEnter}
                  onMouseLeave={handleSizeNotChosenLeave}
                  onClick={handleAddToCart}
                >
                  {cartButtonValue}
                </button>
              </div>

              <p className=" text-sm/[25px] ">{currentProduct?.description}</p>
              <GeneralInfoAccordions />
            </div>
          </div>
        </div>
        {buyIsVisible ? (
          ""
        ) : (
          <div className=" md:hidden montserrat-regular fixed bottom-0 px-9 border-t w-screen py-3  bg-white">
            <div className="flex justify-between my-3">
              <p>
                {currentProduct?.name}
                {chosenSize ? ` ${chosenSize}` : ""}
                {chosenQuantity > 1 ? ` (${chosenQuantity})` : ""}
              </p>
              <p>{currentProduct?.price} €</p>
            </div>

            <button
              className=" w-full h-14   bg-white text-base border border-gray-800 rounded-sm hover:invert   "
              onMouseEnter={handleSizeNotChosenEnter}
              onMouseLeave={handleSizeNotChosenLeave}
              onClick={handleAddToCart}
            >
              {cartButtonValue}
            </button>
          </div>
        )}
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <SiteLoader duration={5000} />
        <Error />
      </div>
    );
  }
};
