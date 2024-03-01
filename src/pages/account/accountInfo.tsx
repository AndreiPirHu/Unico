import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";

type userInformation = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phoneNumber: number;
};

export const AccountInfo = () => {
  const [buttonInactive, setButtonInactive] = useState<boolean>(true);
  const [userInformation, setUserInformation] = useState<userInformation>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phoneNumber: 0,
  });

  const updateUserInfoFirebase = async () => {
    if (auth.currentUser) {
      try {
        await updateDoc(doc(db, "users", auth.currentUser.uid), {
          firstName: userInformation.firstName,
          lastName: userInformation.lastName,
          address: userInformation.address,
          phoneNumber: userInformation.phoneNumber,
        });

        setButtonInactive(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchFirebaseData = async () => {
    if (auth.currentUser) {
      try {
        const data = await getDoc(doc(db, "users", auth.currentUser.uid));
        const userData = data.data();

        if (userData) {
          const userInfo: userInformation = {
            firstName: userData.firstName ?? "",
            lastName: userData.lastName ?? "",
            email: auth.currentUser.email ?? "",
            address: userData.address ?? "",
            phoneNumber: userData.phoneNumber ?? 0,
          };

          setUserInformation(userInfo);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    //checks if user is logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchFirebaseData();
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <form className=" flex flex-col justify-center w-[500px]  text-center p-10 ">
        <h1 className="text-base">Account Information</h1>
        <div className="text-start pt-7 pb-3 ">
          <h2 className="text-xs font-semibold">First Name</h2>
        </div>
        <input
          type="text"
          className="border px-5 py-2 rounded-sm"
          onChange={(e) => {
            setUserInformation({
              ...userInformation,
              ["firstName"]: e.target.value,
            });
            setButtonInactive(false);
          }}
          value={userInformation.firstName}
          required
        />

        <div className="text-start pt-7 pb-3 ">
          <h2 className="text-xs font-semibold">Last Name</h2>
        </div>
        <input
          type="text"
          className="border px-5 py-2 rounded-sm"
          onChange={(e) => {
            setUserInformation({
              ...userInformation,
              ["lastName"]: e.target.value,
            });
            setButtonInactive(false);
          }}
          value={userInformation.lastName}
          required
        />

        <div className="text-start pt-7 pb-3 ">
          <h2 className="text-xs font-semibold">Email</h2>
        </div>
        <input
          type="email"
          className="border px-5 py-2 rounded-sm"
          onChange={(e) => {
            setUserInformation({
              ...userInformation,
              ["email"]: e.target.value,
            });
            setButtonInactive(false);
          }}
          disabled
        />

        <div className="text-start pt-7 pb-3 ">
          <h2 className="text-xs font-semibold">Address</h2>
        </div>
        <input
          type="text"
          className="border px-5 py-2 rounded-sm"
          onChange={(e) => {
            setUserInformation({
              ...userInformation,
              ["address"]: e.target.value,
            });
            setButtonInactive(false);
          }}
          value={userInformation.address}
          required
        />

        <button
          type="submit"
          className="text-white text-sm bg-black mt-8 py-5 rounded-sm hover:opacity-75 font-semibolds disabled:bg-gray-600 disabled:hover:opacity-100"
          disabled={buttonInactive}
          onClick={updateUserInfoFirebase}
        >
          Save changes
        </button>
      </form>
    </div>
  );
};
