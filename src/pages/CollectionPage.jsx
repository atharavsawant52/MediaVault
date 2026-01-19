import { useDispatch, useSelector } from "react-redux";
import { clearCollection } from "../store/features/collectionSlice";
import CollectionCard from "../components/CollectionCard";

const CollectionPage = () => {
  const collection = useSelector((state) => state.collection.items);
  const dispatch = useDispatch();

  return (
    <div className="px-4 md:px-10 py-6 md:py-8 min-h-[calc(100vh-80px)]">
      
      {/* HEADER */}
      {collection.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">
              Your Collection
            </h2>
            <p className="text-gray-400 mt-1 text-sm md:text-base">
              {collection.length} item{collection.length > 1 ? "s" : ""}
            </p>
          </div>

          <button
            onClick={() => dispatch(clearCollection())}
            className="
              bg-red-600/90 hover:bg-red-700
              px-5 py-2
              rounded-lg
              text-sm font-medium
              active:scale-95 transition
              self-start sm:self-auto
            "
          >
            Clear All
          </button>
        </div>
      )}

      {/* EMPTY STATE */}
      {collection.length === 0 && (
        <div className="text-center mt-20 text-gray-500 px-2">
          <h2 className="text-3xl md:text-4xl font-semibold mb-3">
            No Saved Media
          </h2>
          <p className="text-base md:text-lg">
            Start saving images, videos & GIFs to build your collection.
          </p>
        </div>
      )}

      {/* GRID */}
      {collection.length > 0 && (
        <div
          className="
            grid
            grid-cols-[repeat(auto-fill,minmax(200px,1fr))]
            sm:grid-cols-[repeat(auto-fill,minmax(240px,1fr))]
            gap-4 sm:gap-6
          "
        >
          {collection.map((item) => (
            <CollectionCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionPage;
