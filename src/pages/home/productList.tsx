import React, { useEffect, useState } from "react";

type productListProps = {
  data: Product[];
};

export const ProductList: React.FC<productListProps> = ({ data }) => {
  const [nodeList, setNodeList] = useState<React.ReactNode>([]);

  const createNodeList = () => {
    setNodeList([]);
    for (let product of data) {
      let newItem: React.ReactNode = (
        <div className=" cursor-pointer">
          <img
            src={product.images.front}
            alt=""
            onMouseEnter={(e) => handleImgHoverOn(e, product.images.back)}
            onMouseLeave={(e) => handleImgHoverOut(e, product.images.front)}
            className=""
          />
        </div>
      );
      setNodeList((prevState) => {
        return [prevState, newItem];
      });
    }
  };

  const handleImgHoverOn = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
    imgUrl: string
  ) => {
    const imgElement = event.currentTarget;
    imgElement.src = imgUrl;
  };
  const handleImgHoverOut = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
    imgUrl: string
  ) => {
    const imgElement = event.currentTarget;
    imgElement.src = imgUrl;
  };

  useEffect(() => {
    createNodeList();
  }, []);

  return (
    <div className=" grid max-md:grid-cols-2 md:grid-cols-4 gap-4 mt-6 mx-4">
      {nodeList}
    </div>
  );
};
