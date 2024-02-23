export const Checkout = () => {
  return (
    <div className="montserrat-regular">
      <div id="header-container" className="flex ">
        <div id="back-container" className="flex flex-1 my-auto">
          <img
            src="/src/assets/arrow-icon.svg"
            alt="Arrow icon"
            className="h-5 rotate-180 pb-1 "
          />
          <h1 className="ml-1 ">Back</h1>
        </div>
        <div id="logo-container" className="flex-1">
          <img src="/src/assets/logo-icon.svg" alt="Unico icon" />
        </div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
};
