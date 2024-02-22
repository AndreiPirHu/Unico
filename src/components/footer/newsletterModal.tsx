import React from "react";

type NewsletterModalProps = {
  setNewsletterModalActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NewsletterModal: React.FC<NewsletterModalProps> = ({
  setNewsletterModalActive,
}) => {
  const handleClick = () => {
    setNewsletterModalActive(false);
  };

  return (
    <div
      onClick={handleClick}
      className="top-0 left-0 fixed h-screen w-screen  bg-[rgba(0,0,0,.3)] z-50 grid justify-center items-center montserrat-regular "
    >
      <div className="  w-96 h-64 bg-white grid justify-center px-10 border border-gray-600 rounded-sm max-[410px]:w-72">
        <h1 className=" text-center my-10 text-2xl font-bold">
          Thank you for signing up to our newsletter!
        </h1>
        <button
          onClick={handleClick}
          className=" border border-black bg-white h-14 mx-10 mb-10 hover:invert"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};
