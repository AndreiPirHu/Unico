import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/home/home";
import "./index.css";
import { useDispatch } from "react-redux";
import { actions } from "./features/products";
import { getFirestoreProducts } from "./components/getFirestoreProducts";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  const getProductsFromDatabase = async () => {
    //has to await the promise to resolve
    const products = await getFirestoreProducts();

    let fetchedProducts: Products = {
      products: products,
    };
    dispatch(actions.addProducts(fetchedProducts));
  };

  useEffect(() => {
    getProductsFromDatabase();
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
