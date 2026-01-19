import { useDispatch } from "react-redux";
import { removeCollection, removeToast } from "../store/features/collectionSlice";
import { downloadMedia } from "../utils/downloadMedia";

const CollectionCard = ({ item }) => {
  const dispatch = useDispatch();

  const removeFromCollection = () => {
    dispatch(removeCollection(item.id));
    dispatch(removeToast());
  };

  return (
    <div
      className="
        group relative
        w-full sm:w-auto
        h-72 sm:h-80
        rounded-xl overflow-hidden
        bg-zinc-900
      "
    >
      {/* MEDIA */}
      <a href={item.url} target="_blank" rel="noreferrer">
        {item.type === "video" ? (
          <video
            src={item.src}
            muted
            preload="metadata"
            className="h-full w-full object-cover"
          />
        ) : (
          <img
            src={item.src}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        )}
      </a>

      {/* OVERLAY */}
      <div
        className="
          absolute inset-0
          bg-black/60
          opacity-100 sm:opacity-0
          sm:group-hover:opacity-100
          transition
          flex flex-col justify-between
          p-3 sm:p-4
        "
      >
        <h2 className="text-xs sm:text-sm font-semibold line-clamp-2">
          {item.title || "Untitled"}

        </h2>

        <div className="flex gap-2">
          <button
            onClick={() =>
              downloadMedia(item.src, `${item.type}-${item.id}`)
            }
            className="
              flex-1 bg-emerald-600
              py-1.5 sm:py-1
              rounded text-xs sm:text-sm
              font-medium
            "
          >
            Download
          </button>

          <button
            onClick={removeFromCollection}
            className="
              flex-1 bg-red-600
              py-1.5 sm:py-1
              rounded text-xs sm:text-sm
              font-medium
            "
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
