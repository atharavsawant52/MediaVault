import axios from "axios";

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY;
const PEXELS_KEY = import.meta.env.VITE_PEXELS_KEY;
const KLIPY_APP_KEY = import.meta.env.VITE_KLIPY_KEY;


export const fetchImage = async (query, page = 1, per_page = 12) => {
  try {
    const res = await axios.get(
      "https://api.unsplash.com/search/photos",
      {
        params: { query, page, per_page },
        headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
      }
    );
    return res.data;
  } catch (err) {
    throw new Error("Failed to fetch images");
  }
};


export const fetchVideo = async (query, page = 1, per_page = 12) => {
  try {
    const res = await axios.get(
      "https://api.pexels.com/videos/search",
      {
        params: { query, page, per_page },
        headers: { Authorization: PEXELS_KEY },
      }
    );
    return res.data;
  } catch (err) {
    throw new Error("Failed to fetch videos");
  }
};


export const fetchGIF = async (query, page = 1, per_page = 12) => {
  try {
    const res = await axios.get(
      `https://api.klipy.com/api/v1/${KLIPY_APP_KEY}/gifs/search`,
      {
        params: { q: query, page, per_page },
      }
    );
    return res.data.data.data;
  } catch (err) {
    throw new Error("Failed to fetch GIFs");
  }
};
