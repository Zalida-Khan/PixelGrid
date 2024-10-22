import axios from "axios";
import React from "react";

const SearchImages = async (term) => {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    headers: {
      Authorization: "Client-ID 0VBZyg4tb-uhou4s-FpemyHtlsQl9WCagGjX9zzD_Tc",
    },
    params: {
      query: term,
    },
  });
  return response.data.results;
};

export default SearchImages;
