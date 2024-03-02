import { Footer } from "../../components/footer/footer";
import { Navbar } from "../../components/navbar/navbar";
import { SiteLoader } from "../../components/siteLoader";

export const Error = () => {
  return (
    <div>
      <SiteLoader />
      <Navbar solidBg={true} />
      <div className="montserrat-regular grid justify-center my-20 gap-10 text-center">
        <h1 className="text-base font-medium">404 Page not found</h1>
        <h2 className="text-sm">
          You may want to return to the home page or try a search.
        </h2>
      </div>
      <Footer />
    </div>
  );
};
