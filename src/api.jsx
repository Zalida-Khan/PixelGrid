import axios from "axios";

const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
const API_URL = "https://api.unsplash.com/search/photos";

const searchImages = async (term, page = 1, perPage = 30) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Client-ID ${API_KEY}`,
      },
      params: {
        query: term,
        page,
        per_page: perPage,
      },
    });
    return {
      images: response.data.results,
      totalPages: Math.ceil(response.data.total / perPage),
    };
  } catch (error) {
    console.error("Error fetching images:", error);
    return { images: [], totalPages: 0 };
  }
};

export default searchImages;
