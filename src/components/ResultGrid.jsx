import { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setError,
  setResults,
  appendResults,
  incrementPage,
  setHasMore,
} from "../store/features/searchSlice";
import { fetchGIF, fetchImage, fetchVideo } from "../api/mediaApi";
import ResultCard from "./ResultCard";

const ResultGrid = () => {
  const dispatch = useDispatch();
  const observer = useRef();

  const {
    query,
    activeTab,
    results,
    loading,
    error,
    page,
    hasMore,
  } = useSelector((state) => state.search);

  const lastItemRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(incrementPage());
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, dispatch]
  );

  useEffect(() => {
    if (!query) return;

    const loadData = async () => {
      dispatch(setLoading());

      try {
        let data = [];

        if (activeTab === "photos") {
          const res = await fetchImage(query, page, 12);
          data = res.results.map((item) => ({
            id: item.id,
            type: "photo",
            title: item.alt_description || "Photo",
            src: item.urls.regular,
            url: item.links.html,
          }));
          if (res.results.length === 0) dispatch(setHasMore(false));
        }

        if (activeTab === "videos") {
          const res = await fetchVideo(query, page, 12);
          data = res.videos.map((item) => ({
            id: item.id,
            type: "video",
            title: item.user?.name || "Video",
            src: item.video_files[0]?.link,
            url: item.url,
          }));
          if (res.videos.length === 0) dispatch(setHasMore(false));
        }

        if (activeTab === "gif") {
          const res = await fetchGIF(query, page, 12);
          data = res.map((item) => ({
            id: item.id,
            type: "gif",
            title: item.title || "GIF",
            src: item.file.hd.gif.url,
            url: item.file.hd.gif.url,
          }));
          if (res.length === 0) dispatch(setHasMore(false));
        }

        page === 1
          ? dispatch(setResults(data))
          : dispatch(appendResults(data));
      } catch {
        dispatch(setError("Failed to load data"));
      }
    };

    loadData();
  }, [query, activeTab, page, dispatch]);

  if (error)
    return (
      <div className="text-red-500 text-center py-10">{error}</div>
    );

  return (
    <div
      className="
        grid
        grid-cols-[repeat(auto-fill,minmax(200px,1fr))]
        sm:grid-cols-[repeat(auto-fill,minmax(240px,1fr))]
        gap-4 sm:gap-6
        px-4 md:px-10
        pb-12
        mt-4
      "
    >
      {results.map((item, index) => {
        if (index === results.length - 1) {
          return (
            <div ref={lastItemRef} key={item.id}>
              <ResultCard item={item} />
            </div>
          );
        }
        return <ResultCard key={item.id} item={item} />;
      })}

      {loading && (
        <div className="col-span-full text-center text-gray-400 py-6">
          Loading more...
        </div>
      )}
    </div>
  );
};

export default ResultGrid;
