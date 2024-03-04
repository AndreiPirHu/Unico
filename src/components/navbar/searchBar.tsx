import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../features/rootReducer";
import { Link, useLocation } from "react-router-dom";

type searchBarProps = {
  searchBarActive: boolean;
  setSearchBarActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SearchBar: React.FC<searchBarProps> = ({
  setSearchBarActive,
  searchBarActive,
}) => {
  const products: Product[] = useSelector(
    (state: RootState) => state.products.products
  );

  const [nodeList, setNodeList] = useState<React.ReactNode>([]);

  const searchRef = useRef<HTMLInputElement>(null);

  const { pathname } = useLocation();

  const handleExitSearchBar = () => {
    setSearchBarActive(false);
  };

  const searchProducts = (searchQuery: string) => {
    if (searchQuery.length > 2) {
      const filteredProducts = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.type.includes(searchQuery.toLowerCase())
      );
      createNodeList(filteredProducts);
    } else {
      setNodeList([]);
    }
  };

  const loadingNode: React.ReactNode = (
    <div className=" absolute w-full h-full flex justify-center -top-1/4">
      <div className="w-12 h-12 border-8 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-black rounded-full"></div>
    </div>
  );

  const createNodeList = (filteredProducts: Product[]) => {
    setNodeList(loadingNode);
    setTimeout(() => {
      setNodeList([]);
      if (filteredProducts.length != 0) {
        for (let i = 0; i < Math.min(6, filteredProducts.length); i++) {
          const product = filteredProducts[i];
          let newProduct: React.ReactNode = (
            <div key={product.name} className=" relative cursor-pointer   ">
              <Link
                to={`/products/${product.name.replace(/ /g, "-")}`}
                className="grid justify-center"
              >
                <img
                  src={product.images.front}
                  alt=""
                  onMouseEnter={(e) => handleImgHoverOn(e, product.images.back)}
                  onMouseLeave={(e) =>
                    handleImgHoverOut(e, product.images.front)
                  }
                  className=" max-h-[350px]   "
                />

                <div className="   pointer-events-none w-auto ">
                  <h3 className="karantina-light text-3xl max-lg:text-2xl">
                    {product.name}
                  </h3>
                  <p className=" inline-block text-lg">€</p>
                  <p className="karantina-light inline-block ml-1 text-2xl ">
                    {product.price}
                  </p>
                </div>
              </Link>
            </div>
          );
          setNodeList((prevState) => {
            return [prevState, newProduct];
          });
        }
      } else {
        let noResultsNode: React.ReactNode = (
          <div className="absolute w-full flex justify-center items-center top-1/4">
            <p className="montserrat-regular">
              Sorry, we couldn't find any results
            </p>
          </div>
        );
        setNodeList(noResultsNode);
      }
    }, 300);
  };

  const handleImgHoverOn = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
    imgUrl: string
  ) => {
    const imgElement = event.currentTarget;
    imgElement.src = imgUrl;
  };

  const handleImgHoverOut = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
    imgUrl: string
  ) => {
    const imgElement = event.currentTarget;
    imgElement.src = imgUrl;
  };

  useEffect(() => {
    setTimeout(() => {
      searchRef.current?.focus();
    }, 300);

    setNodeList([]);
    if (searchRef.current) {
      searchRef.current.value = "";
    }
  }, [searchBarActive]);

  useEffect(() => {
    setSearchBarActive(false);
  }, [pathname]);

  return (
    <search
      className={`grid grid-rows-[auto,1fr] z-50 fixed w-full h-full transition-all duration-200 max-md:overflow-scroll   ${
        searchBarActive
          ? "opacity-100 visible pointer-events-auto"
          : "invisible pointer-events-none opacity-0  "
      } `}
    >
      <div className="z-50 grid">
        <div className="flex justify-center items-center h-40 bg-white ">
          <input
            ref={searchRef}
            type="text"
            placeholder="Search..."
            className={`bg-[#F2F2F2] rounded-sm h-12 w-6/12 max-sm:max-w-[500px] max-sm:w-10/12 py-3 px-6`}
            onChange={(e) => {
              searchProducts(e.target.value);
            }}
            autoFocus
          />

          <button className=" absolute right-1/4 mr-4 max-sm:right-[10%]">
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
              className=" p-2 h-14 absolute top-12 right-[5%] max-sm:right-0 max-sm:top-0"
              onClick={handleExitSearchBar}
            />
          </button>
        </div>

        <div className="relative bg-white flex gap-5 justify-center py-10 px-10 max-md:flex-wrap max-sm:px-3 max-sm:grid max-sm:grid-cols-2">
          {nodeList}
        </div>
      </div>

      <div
        className={` bg-[rgba(0,0,0,.3)] w-screen z-10 transition-opacity duration-300 ${
          searchBarActive
            ? "opacity-100 visible pointer-events-auto"
            : "invisible pointer-events-none opacity-0  "
        } `}
        onClick={handleExitSearchBar}
      ></div>
    </search>
  );
};
