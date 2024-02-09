import React from "react";

type searchBarProps = {
  searchBarActive: boolean;
  setSearchBarActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SearchBar: React.FC<searchBarProps> = ({
  setSearchBarActive,
  searchBarActive,
}) => {
  const handleExitSearchBar = () => {
    setSearchBarActive(false);
  };

  return (
    <search
      className={`grid fixed z-50 w-full h-full transition-all duration-200  ${
        searchBarActive
          ? "opacity-100 visible pointer-events-auto"
          : "invisible pointer-events-none opacity-0  "
      } `}
    >
      <div className="">
        <div className="flex justify-center items-center h-40 bg-white ">
          <input
            type="text"
            placeholder="Search..."
            className="bg-[#F2F2F2] rounded-sm h-12 w-6/12 max-sm:max-w-[500px] max-sm:w-10/12 py-3 px-6"
          />
          <button className=" fixed right-1/4 mr-4 max-sm:right-[10%]">
            <img
              src="/src/assets/search-icon.svg"
              alt="search icon"
              className=" h-8"
            />
          </button>
          <button>
            <img
              src="/src/assets/close-icon.svg"
              alt="Big X icon"
              className=" p-2 h-14 fixed top-12 right-[5%] max-sm:right-0 max-sm:top-0"
              onClick={handleExitSearchBar}
            />
          </button>
        </div>
        <div className="bg-white h-40"></div>
      </div>
      <div
        className="bg-[rgba(0,0,0,.3)] h-screen"
        onClick={handleExitSearchBar}
      ></div>
    </search>
  );
};
