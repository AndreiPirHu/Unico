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
        <div key={product.name} className=" relative cursor-pointer ">
          <img
            src={product.images.front}
            alt=""
            onMouseEnter={(e) => handleImgHoverOn(e, product.images.back)}
            onMouseLeave={(e) => handleImgHoverOut(e, product.images.front)}
            className=" peer "
          />

          <div className=" absolute origin-bottom scale-y-0 duration-500 peer-hover:scale-y-100 bottom-0.5 pointer-events-none w-auto ml-3 ">
            <h3 className="karantina-light text-3xl">{product.name}</h3>
            <p className=" inline-block">€</p>
            <p className="karantina-light inline-block ml-1 text-2xl ">
              {" "}
              {product.price}
            </p>
          </div>
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
    <div className=" grid max-md:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 mx-4">
      {nodeList}
    </div>
  );
};
