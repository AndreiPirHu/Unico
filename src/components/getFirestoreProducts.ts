import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const getFirestoreProducts = async () => {
  let firestoreProducts: Product[] = [];

  //get all the products from db
  const firestoreProductsData = await getDocs(collection(db, "mockProducts"));

  //decode all the products
  firestoreProductsData.forEach((doc) => {
    const data = doc.data();
    const product: Product = {
      name: data.name,
      price: data.price,
      type: data.type,
      description: data.description,
      images: data.images,
    };
    firestoreProducts.push(product);
  });

  return firestoreProducts;
};
