import axios from "axios";
import React from "react";

const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
const API_URL = "https://api.unsplash.com/search/photos";

const SearchImages = async (term) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Client-ID ${API_KEY}`,
      },
      params: {
        query: term,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
};

export default SearchImages;
