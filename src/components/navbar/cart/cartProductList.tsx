import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../features/rootReducer";
import { actions } from "../../../features/cart";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

type CartProductListProps = {
  setTotalAmount: React.Dispatch<React.SetStateAction<number>>;
};

export const CartProductList: React.FC<CartProductListProps> = ({
  setTotalAmount,
}) => {
  const [productNodeList, setProductNodeList] = useState<React.ReactNode[]>([]);
  const [groupedCartProducts, setGroupedCartProducts] = useState<{
    [key: string]: CartProduct[];
  }>({});

  const cartProducts = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const createGroupedCartProducts = () => {
    // Convert cart into an object for grouping
    const newGroupedCartObject: { [key: string]: CartProduct[] } = {};

    // Iterate over each item in the cart
    for (const product of cartProducts) {
      const key = `${product.name}-${product.size}`;

      // If the key exists, push the item to the existing array
      if (newGroupedCartObject[key]) {
        newGroupedCartObject[key].push(product);
      } else {
        // Otherwise, create a new array with the item
        newGroupedCartObject[key] = [product];
      }
    }

    setGroupedCartProducts(newGroupedCartObject);
  };

  //adds product to redux which automatically updates localstorage
  const handleIncreaseAmount = (key: string) => {
    const product = groupedCartProducts[key][0];

    const extraProduct = { ...product, id: uuidv4() };

    dispatch(actions.addToCart(extraProduct));
  };

  //removes product from redux which automatically updates localstorage
  const handleReduceAmount = (key: string) => {
    const removedProduct = groupedCartProducts[key][0];
    dispatch(actions.removeFromCart(removedProduct));
    //send the new list to firebase/
  };

  const handleRemoveSeveralItems = (name: string, size: string) => {
    dispatch(actions.removeSeveralFromCart({ name: name, size: size }));
  };

  const handleQuickNavigateToProduct = (name: string) => {
    navigate(`/products/${name}`);
  };

  const createProductNodeList = () => {
    //resets the usestates before refilling them
    setProductNodeList([]);
    setTotalAmount(0);
    //creates one node for each key in the groupedCartProducts object
    //it is sorted so that an update like changing quantity does not change their position
    Object.keys(groupedCartProducts)
      .sort((a, b) => a.localeCompare(b))
      .map((key) => {
        const products = groupedCartProducts[key];
        const amount = products?.length || 0;

        if (amount >= 1 && products) {
          const product = products[0];
          //updating the cost
          setTotalAmount((prevState) => prevState + product.price * amount);
          const newNode: React.ReactNode = (
            <div key={key} className=" py-4 mx-2 border-b ">
              <div className="flex">
                <div>
                  <img
                    src={`${product.images.front}`}
                    alt={`Image of ${product.name}`}
                    onClick={() => handleQuickNavigateToProduct(product.name)}
                    className="h-32 min-w-[86px] cursor-pointer"
                  />
                </div>
                <div className="pl-3 flex-auto">
                  <h2
                    onClick={() => handleQuickNavigateToProduct(product.name)}
                    className=" cursor-pointer font-medium"
                  >
                    {product.name}
                  </h2>
                  <h2 className=" mt-2 ">{product.size}</h2>
                </div>
                <div className=" min-w-10 max-[500px]:min-w-8  items-top grid ">
                  <button
                    onClick={() =>
                      handleRemoveSeveralItems(product.name, product.size)
                    }
                    className="h-10 max-[500px]:h-8 "
                  >
                    <img
                      src="/src/assets/trash-icon.svg"
                      alt="Trash icon"
                      className="h-10 max-[500px]:h-8 bg-white  border border-gray-400 rounded-full p-1 hover:invert"
                    />
                  </button>
                  <button className="h-10 max-[500px]:h-8 ">
                    <img
                      src="/src/assets/heart-icon.svg"
                      alt="heart-icon"
                      className="h-10 max-[500px]:h-8 bg-white  border border-gray-400 rounded-full p-1 hover:invert "
                    />
                  </button>
                </div>
              </div>
              <div className="flex justify-between pt-4">
                <div className="flex">
                  <button onClick={() => handleReduceAmount(key)}>
                    <img
                      src="/src/assets/minus-icon.svg"
                      alt="minus icon"
                      className="h-6 border   hover:border-black"
                    />
                  </button>

                  <div className="mx-3 ">{amount}</div>

                  <button onClick={() => handleIncreaseAmount(key)}>
                    <img
                      src="/src/assets/plus-icon.svg"
                      alt="plus icon"
                      className="h-6 border  hover:border-black"
                    />
                  </button>
                </div>
                <div>€{product.price * amount}</div>
              </div>
            </div>
          );

          setProductNodeList((prevState) => [...prevState, newNode]);
        }
      });
  };

  useEffect(() => {
    createGroupedCartProducts();
  }, [cartProducts]);

  useEffect(() => {
    createProductNodeList();
  }, [groupedCartProducts]);

  return (
    <div>
      {productNodeList.length > 0 ? (
        productNodeList
      ) : (
        <div className=" flex justify-center font-medium text-xl mt-20">
          Your cart is currently empty
        </div>
      )}
    </div>
  );
};
