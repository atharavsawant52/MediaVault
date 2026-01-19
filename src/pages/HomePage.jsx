import { useSelector } from "react-redux";
import SearchBar from "../components/SearchBar";
import Tabs from "../components/Tabs";
import ResultGrid from "../components/ResultGrid";

const HomePage = () => {
  const { query } = useSelector((store) => store.search);

  return (
    <div className="min-h-[calc(100vh-80px)]">
      
      {/* SEARCH */}
      <SearchBar />

      {/* EMPTY STATE */}
      {!query && (
        <div className="text-center text-gray-500 mt-12 md:mt-20 px-4">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">
            Discover Stunning Media
          </h2>
          <p className="text-base md:text-lg max-w-xl mx-auto">
            Search images, videos & GIFs and build your personal collection.
          </p>
        </div>
      )}

      {/* RESULTS */}
      {query && (
        <>
          <Tabs />
          <ResultGrid />
        </>
      )}
    </div>
  );
};

export default HomePage;
