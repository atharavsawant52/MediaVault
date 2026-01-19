import { useState } from "react";
import { useDispatch } from "react-redux";
import { setQuery } from "../store/features/searchSlice";

const SearchBar = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(setQuery(text.trim()));
  };

  return (
    <div className="px-4 md:px-10 py-10 md:py-14 border-b border-white/10">
      <form
        onSubmit={submitHandler}
        className="
          max-w-3xl mx-auto
          flex flex-col md:flex-row
          items-stretch md:items-center
          gap-3 md:gap-4
        "
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="Search images, videos, GIFs..."
          className="
            w-full bg-zinc-900 text-white
            text-base md:text-lg
            px-4 md:px-6 py-3 md:py-4
            rounded-xl outline-none
            border border-white/10
            focus:border-indigo-500
            placeholder-gray-400
          "
        />

        <button
          type="submit"
          className="
            w-full md:w-auto
            bg-indigo-600
            px-4 md:px-6 py-3 md:py-4
            rounded-xl
            text-base md:text-lg font-medium
            hover:bg-indigo-700
            active:scale-95 transition
          "
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
