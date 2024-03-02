import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { OrderHistoryCard } from "./orderHistoryCard";

type Order = {
  date: string;
  orderID: string;
  payment: string;
  delivery: string;
  deliveryCost: number;
  totalAmount: number;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  email: string;
  phoneNumber: string;
  order: CartProduct[];
};

export const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchFirebaseOrders = async (uid: string) => {
    let firestoreOrders: Order[] = [];

    //get all orders from db
    const firestoreOrdersData = await getDocs(
      collection(db, "users", uid, "orderHistory")
    );

    //decode all the cart products
    firestoreOrdersData.forEach((doc) => {
      const data = doc.data();
      const order: Order = {
        date: data.date,
        orderID: data.orderID,
        payment: data.payment,
        delivery: data.delivery,
        deliveryCost: data.deliveryCost,
        totalAmount: data.totalAmount,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        city: data.city,
        postalCode: data.postalCode,
        email: data.email,
        phoneNumber: data.phoneNumber,
        order: data.order,
      };

      firestoreOrders.push(order);
    });
    setOrders(firestoreOrders);
  };

  useEffect(() => {
    //checks if user is logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchFirebaseOrders(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <div className=" flex flex-col ">
      <div id="header" className="border-b-2 mb-10 ">
        <h1 className="text-xl font-semibold  ">My Orders</h1>
        <h2 className="text-base text-gray-700 pt-2 pb-5">
          Here you can find past orders
        </h2>
      </div>

      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div key={index} className="border-b">
            <h2 className="font-semibold text-lg mt-7">
              Order Total €{" "}
              {order.totalAmount > 150
                ? order.totalAmount
                : order.totalAmount + order.deliveryCost}
            </h2>
            <div id="order-info" className="mt-3">
              <div className="flex pb-px">
                <h3 className="text-sm font-semibold">Order Date: </h3>
                <h3 className="text-sm font-medium pl-2"> {order.date}</h3>
              </div>
              <div className="flex pb-px">
                <h3 className="text-sm font-semibold">Payment Method:</h3>
                <h3 className="text-sm font-medium pl-2"> {order.payment}</h3>
              </div>
              <div className="flex pb-px">
                <h3 className="text-sm font-semibold">Order Number: </h3>
                <h3 className="text-sm font-medium pl-2"> {order.orderID}</h3>
              </div>
              <div className="flex pb-px">
                <h3 className="text-sm font-semibold">Delivery Method: </h3>
                <h3 className="text-sm font-medium pl-2"> {order.delivery}</h3>
              </div>
            </div>
            <OrderHistoryCard cartProducts={order.order} />
            <div id="order-items"></div>
          </div>
        ))
      ) : (
        <h1>No orders available.</h1>
      )}
    </div>
  );
};
