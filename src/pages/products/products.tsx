import { useLocation, useParams } from "react-router-dom";
import { Footer } from "../../components/footer/footer";
import { Navbar } from "../../components/navbar/navbar";
import { useSelector } from "react-redux";
import { RootState } from "../../features/rootReducer";
import React, { useEffect, useRef, useState } from "react";
import { ProductImagesModal } from "./productImagesModal";
import { SiteLoader } from "../../components/siteLoader";
import { GeneralInfoAccordions } from "./generalInfoAccordions";

export const Products = () => {
  const { id } = useParams<{ id: string }>();
  const products: Products = useSelector((state: RootState) => state.products);
  const [currentProduct, setCurrentProduct] = useState<Product>();
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const [picturesNodeList, setPicturesNodeList] = useState<React.ReactNode[]>(
    []
  );
  const [ProductImagesModalActive, setProductImagesModalActive] =
    useState<boolean>(false);
  const [chosenSize, setChosenSize] = useState<string>();
  const [chosenQuantity, setChosenQuantity] = useState<number>(1);
  const [cartButtonValue, setCartButtonValue] = useState<string>("Add to Cart");
  const [buyIsVisible, setBuyIsVisible] = useState<boolean>(false);

  const { pathname } = useLocation();

  const getCurrentProduct = () => {
    setCurrentProduct(products.products.find((product) => product.name == id));
  };
  let hoverTimeout = useRef<number | null>(null);
  const changeImage = (imageUrl: string | undefined) => {
    setSelectedImage(imageUrl);
  };
  const buyButtonRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    getCurrentProduct();
  }, [products, pathname]);

  useEffect(() => {
    setSelectedImage(currentProduct?.images.front);
    createPicturesNodeList();
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
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    setBuyIsVisible(false);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

      <Navbar solidBg={true} />
      <div className="grid grid-cols-2 my-16 px-9  max-md:grid-cols-1">
        <div className="grid justify-center">
          <img
            src={selectedImage}
            alt="picture of clothing product"
            className=" max-h-[600px] cursor-pointer"
            onClick={() => {
              setProductImagesModalActive(true);
            }}
          />
          <div className="flex gap-2 my-5">{picturesNodeList}</div>
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
                  src="/src/assets/minus-icon.svg"
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
                  src="/src/assets/plus-icon.svg"
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
          >
            {cartButtonValue}
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
};
