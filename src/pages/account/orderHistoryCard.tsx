import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type OrderHistoryCardProps = {
  cartProducts: CartProduct[];
};

export const OrderHistoryCard: React.FC<OrderHistoryCardProps> = ({
  cartProducts,
}) => {
  const [groupedCartProducts, setGroupedCartProducts] = useState<{
    [key: string]: CartProduct[];
  }>({});
  const [summaryExpanded, setSummaryExpanded] = useState<boolean>(false);

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

  const handleQuickNavigateToProduct = (name: string) => {
    navigate(`/products/${name.replace(/ /g, "-")}`);
  };

  useEffect(() => {
    createGroupedCartProducts();
  }, []);

  return (
    <div>
      <div
        className="pt-4 flex cursor-pointer hover:opacity-75 mb-7"
        onClick={() => setSummaryExpanded(!summaryExpanded)}
      >
        <h2>Order summary</h2>
        <img
          src="/src/assets/arrow-icon.svg"
          alt="arrow icon"
          className={`w-4 ml-3  transition-all duration-300 ${
            summaryExpanded ? "rotate-[270deg]" : "rotate-90"
          }`}
        />
      </div>
      <div id="order-summary" className={`${summaryExpanded ? "" : "hidden"}`}>
        {Object.keys(groupedCartProducts)
          .sort((a, b) => a.localeCompare(b))
          .map((key) => {
            const products = groupedCartProducts[key];
            const amount = products?.length || 0;

            if (amount >= 1 && products) {
              const product = products[0];
              //updating the cost

              return (
                <div key={product.id} className="py-4 mx-2 border-b">
                  <div className="flex">
                    <div>
                      <img
                        src={`${product.images.front}`}
                        alt={`Image of ${product.name}`}
                        onClick={() =>
                          handleQuickNavigateToProduct(product.name)
                        }
                        className="h-32 min-w-[86px] cursor-pointer"
                      />
                    </div>
                    <div className="pl-3 flex-auto">
                      <h2
                        onClick={() =>
                          handleQuickNavigateToProduct(product.name)
                        }
                        className="cursor-pointer font-medium"
                      >
                        {product.name}
                      </h2>
                      <h3 className="mt-2 text-sm">Size: {product.size}</h3>
                      <h3 className="mt-2 text-sm">Quantity: {amount}</h3>
                      <h3 className="mt-2 text-sm">Price: €{product.price}</h3>
                      <h3 className="mt-2 text-sm">
                        Total: €{product.price * amount}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
      </div>
    </div>
  );
};
