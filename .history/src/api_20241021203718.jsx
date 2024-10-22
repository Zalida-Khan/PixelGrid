const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
const API_URL = "https://api.unsplash.com";

const headers = {
  Authorization: `Client-ID ${API_KEY}`,
};

export const searchPhotos = async (query) => {
  try {
    const response = await fetch(`${API_URL}/search/photos?query=${query}&per_page=100`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching photos:", error);
    return [];
  }
};
