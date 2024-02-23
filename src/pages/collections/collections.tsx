import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../features/rootReducer";
import { useEffect, useState } from "react";
import { ProductList } from "../../components/productList";

export const Collections = () => {
  const { category } = useParams<{ category: string }>();
  const products: Product[] = useSelector(
    (state: RootState) => state.products.products
  );
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (category == "all") {
      setCategoryProducts(products);
    } else if (category == "new-arrivals") {
      //limit it to 6 products
    } else {
      const filteredProducts: Product[] = products.filter(
        (product) => product.type == category
      );
      setCategoryProducts(filteredProducts);
      console.log(category);
      console.log(products);
      console.log(filteredProducts);
    }
  }, [products]);

  return (
    <div>
      <ProductList data={categoryProducts} />
    </div>
  );
};
