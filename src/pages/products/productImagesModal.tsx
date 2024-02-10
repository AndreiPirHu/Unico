import React, { useRef, useState } from "react";

type ProductImagesModalProps = {
  selectedImage: string | undefined;
  setProductImagesModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  productImagesModalActive: boolean;
  picturesNodeList: React.ReactNode[];
};
export const ProductImagesModal: React.FC<ProductImagesModalProps> = ({
  selectedImage,
  setProductImagesModalActive,
  productImagesModalActive,
  picturesNodeList,
}) => {
  const [imageZoomed, setImageZoomed] = useState<boolean>(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleImageZooming = (
    event: React.MouseEvent<HTMLImageElement, Event>
  ) => {
    const delta = 3; // Adjust scrolling speed as needed
    const deltaX = event.movementX * delta;
    const deltaY = event.movementY * delta;

    if (imageRef.current !== undefined && imageRef.current !== null) {
      imageRef.current.scrollTop += deltaY;
      imageRef.current.scrollLeft += deltaX;
    }
  };

  return (
    <div className=" z-50 grid justify-center fixed h-screen w-screen bg-white py-10 ">
      <img
        src="/src/assets/close-icon.svg"
        alt="X icon for closing"
        className="z-50 h-20 fixed right-0 p-3 cursor-pointer "
        onClick={() => setProductImagesModalActive(false)}
      />
      <div className=" overflow-auto " ref={imageRef}>
        <img
          src={selectedImage}
          alt="picture of clothing product"
          className={`h-[600px] origin-top-left    ${
            imageZoomed
              ? " cursor-zoom-out scale-[2.5] h-[800px] "
              : " cursor-zoom-in"
          }

         `}
          onMouseMove={handleImageZooming}
          onClick={() => setImageZoomed(!imageZoomed)}
        />
      </div>

      <div className="flex justify-center">
        <div
          className="bg-white p-1 absolute bottom-3 flex gap-2 my-5  max-w-full  overflow-auto "
          onClick={() => {
            setImageZoomed(false);
          }}
        >
          {picturesNodeList} {picturesNodeList} {picturesNodeList}{" "}
          {picturesNodeList}
        </div>
      </div>
    </div>
  );
};
