import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/home/home";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { actions as productsActions } from "./features/products";
import { actions as cartActions } from "./features/cart";
import { getFirestoreProducts } from "./components/getFirestoreProducts";
import { useEffect } from "react";
import { Products } from "./pages/products/products";
import ScrollToTop from "./components/scrollToTop";
import { RootState } from "./features/rootReducer";
import { Collections } from "./pages/collections/collections";
import { Checkout } from "./pages/checkout/checkout";
import { Completed } from "./pages/completed/completed";
import { Login } from "./pages/login/login";
import { Account } from "./pages/account/account";
import { Register } from "./pages/login/register";
import { auth, db } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Error } from "./pages/error/error";
import { SiteLoader } from "./components/siteLoader";

function App() {
  const cartProducts = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  //gets product list form firebase
  const getProductsFromDatabase = async () => {
    //has to await the promise to resolve
    const products = await getFirestoreProducts();

    let fetchedProducts: Products = {
      products: products,
    };
    dispatch(productsActions.addProducts(fetchedProducts));
  };

  //gets user cart from localstorage
  const getCartProducts = () => {
    //Fetching saved cart from localstorage
    //get the saved cart
    const currentLocalStorageCartString = localStorage.getItem("cartItems");
    //check if it existed (needed due to typescript)
    if (currentLocalStorageCartString) {
      //parses the saved cart
      const currentLocalStorageCart: CartProduct[] = JSON.parse(
        currentLocalStorageCartString
      );
      //empties the redux cart first
      dispatch(cartActions.clearCart());
      //sends the saved cart to redux
      for (let cartItem of currentLocalStorageCart) {
        dispatch(cartActions.addToCart(cartItem));
      }
    }
  };

  const getCartProductsFirebase = async (uid: string) => {
    const data = await getDoc(doc(db, "users", uid));
    const userData = data.data();

    dispatch(cartActions.clearCart());
    if (userData) {
      for (let cartItem of userData.cart) {
        dispatch(cartActions.addToCart(cartItem));
      }
    }
  };

  const updateLocalStorageCart = () => {
    localStorage.setItem("cartItems", JSON.stringify(cartProducts));
  };

  const updateFirebaseCart = async (uid: string) => {
    await updateDoc(doc(db, "users", uid), { cart: cartProducts });
  };

  useEffect(() => {
    //checks if user is logged in

    if (auth.currentUser) {
      //send to firebase
      setTimeout(() => {
        updateFirebaseCart(auth.currentUser!.uid);
      }, 100);
    } else {
      setTimeout(() => {
        updateLocalStorageCart();
      }, 100);
    }
  }, [cartProducts]);

  useEffect(() => {
    getProductsFromDatabase();
    //checks if user is logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        //get from firebase
        getCartProductsFirebase(user.uid);
      } else {
        getCartProducts();
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Router>
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:name" element={<Products />} />
          <Route path="/collections/:category" element={<Collections />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/completed/:orderID" element={<Completed />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
