import axios from "axios";
import Tesseract from "tesseract.js";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";


const UNSPLASH_API_URL = "https://api.unsplash.com/search/photos";
const GOOGLE_API_URL = "https://www.googleapis.com/customsearch/v1";

const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const GOOGLE_CX = import.meta.env.VITE_GOOGLE_CX;

const GOOGLE_VISION_API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_API_KEY}`;

const classifyImage = async (imageElement) => {
  try {
    const model = await mobilenet.load();

    const predictions = await model.classify(imageElement);

    console.log("Predictions:", predictions);
    return predictions;
  } catch (error) {
    console.error("Error classifying the image:", error);
    return [];
  }
};

export const searchUploadedImages = async (
  file,
  page,
  perPage,
  useGoogle = false,
  setSearchTerm,
) => {
  const img = document.createElement("img");
  img.src = URL.createObjectURL(file);

  const predictions = await new Promise((resolve, reject) => {
    img.onload = async () => {
      try {
        const preds = await classifyImage(img);
        resolve(preds);
      } catch (error) {
        reject(error); 
      }
    };

    img.onerror = (error) => reject(error); 
  });

  console.log("Image classification results:", predictions);

  if (predictions.length > 0) {
    const topPrediction = predictions[0].className;
    console.log(`Searching for: ${topPrediction}`);

    const result = await searchImages(topPrediction, page, perPage, useGoogle);
    setSearchTerm(topPrediction)
    console.log("Search results:", result);
    return result;
  }
};

export const searchImages = async (
  term,
  page = 1,
  perPage = 10,
  useGoogle = false,
) => {
  try {
    if (useGoogle) {
      const startIndex = (page - 1) * perPage + 1;
      const response = await axios.get(GOOGLE_API_URL, {
        params: {
          key: GOOGLE_API_KEY,
          cx: GOOGLE_CX,
          q: term,
          num: perPage, 
          start: startIndex,
          searchType: "image",
        },
      });
      return {
        images: response.data.items || [],
        totalPages: Math.ceil(
          parseInt(response.data.searchInformation.totalResults || 0, 10) / perPage
        ),
      };
    } else {
      const response = await axios.get(UNSPLASH_API_URL, {
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
    }
  } catch (error) {
    console.error("Error fetching images:", error);
    return { images: [], totalPages: 0 };
  }
};
