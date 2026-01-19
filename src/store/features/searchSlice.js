import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
  activeTab: "photos",
  results: [],
  loading: false,
  error: null,

  // 🔽 Infinite scroll state
  page: 1,
  hasMore: true,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },

    setActiveTabs(state, action) {
      state.activeTab = action.payload;
      state.results = [];
      state.page = 1;
      state.hasMore = true;
    },

    setLoading(state) {
      state.loading = true;
      state.error = null;
    },

    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    setResults(state, action) {
      state.results = action.payload;
      state.loading = false;
    },

    appendResults(state, action) {
      state.results = [...state.results, ...action.payload];
      state.loading = false;
    },

    incrementPage(state) {
      state.page += 1;
    },

    setHasMore(state, action) {
      state.hasMore = action.payload;
    },

    resetSearch(state) {
      state.results = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
  },
});

export const {
  setQuery,
  setActiveTabs,
  setLoading,
  setError,
  setResults,
  appendResults,
  incrementPage,
  setHasMore,
  resetSearch,
} = searchSlice.actions;

export default searchSlice.reducer;
