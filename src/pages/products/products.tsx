import { useParams } from "react-router-dom";
import { Footer } from "../../components/footer";
import { Navbar } from "../../components/navbar/navbar";
import { useSelector } from "react-redux";
import { RootState } from "../../features/rootReducer";
import React, { useEffect, useState } from "react";
import { ProductImagesModal } from "./productImagesModal";

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
  const getCurrentProduct = () => {
    setCurrentProduct(products.products.find((product) => product.name == id));
  };

  const changeImage = (imageUrl: string | undefined) => {
    setSelectedImage(imageUrl);
  };

  const createPicturesNodeList = () => {
    setPicturesNodeList([]);
    if (currentProduct?.imagesAll) {
      for (const pictureUrl of currentProduct?.imagesAll) {
        const newPicture: React.ReactNode = (
          <div className="pb-2" key={pictureUrl}>
            <img
              src={pictureUrl}
              alt="picture of clothing product"
              className=" min-w-[86px]  cursor-pointer"
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

  useEffect(() => {
    getCurrentProduct();
  }, [products]);

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

  return (
    <div className=" ">
      {ProductImagesModalActive ? (
        <ProductImagesModal
          selectedImage={selectedImage}
          setProductImagesModalActive={setProductImagesModalActive}
          productImagesModalActive={ProductImagesModalActive}
          picturesNodeList={picturesNodeList}
        />
      ) : (
        ""
      )}

      <Navbar solidBg={true} />
      <div className="grid grid-cols-2  mt-20">
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
        <div>
          <div>{currentProduct?.name}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
