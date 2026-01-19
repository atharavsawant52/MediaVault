import { useDispatch, useSelector } from "react-redux";
import { setActiveTabs } from "../store/features/searchSlice";

const Tabs = () => {
  const tabs = ["photos", "videos", "gif"];
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.search.activeTab);

  return (
    <div className="px-4 md:px-10 py-4 md:py-6 flex justify-center">
      <div className="inline-flex bg-zinc-900 rounded-xl p-1 gap-1 border border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => dispatch(setActiveTabs(tab))}
            className={`
              px-4 md:px-6 py-2
              rounded-lg text-sm font-medium capitalize
              transition
              ${
                activeTab === tab
                  ? "bg-indigo-600 text-white"
                  : "text-gray-400 hover:text-white"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
