import axios from "axios";

const analyzeImage = async (imageUrl) => {
  try {
    const response = await axios.post("/api/analyze-image", { imageUrl });
    return response.data.labels;
  } catch (error) {
    console.error("Error analyzing image:", error);
    return [];
  }
};

export default analyzeImage;
