import express from "express";
import bodyParser from "body-parser";
import { ImageAnnotatorClient } from "@google-cloud/vision";

const app = express();
app.use(bodyParser.json());

// Google Vision API Client
const client = new ImageAnnotatorClient();

// Endpoint for reverse image search using Google Vision API
app.post("/api/analyze-image", async (req, res) => {
  const { imageUrl } = req.body;
  try {
    const [result] = await client.labelDetection(imageUrl);
    const labels = result.labelAnnotations.map((label) => label.description);
    res.status(200).json({ labels });
  } catch (error) {
    console.error("Error analyzing image:", error);
    res.status(500).json({ error: "Failed to analyze image." });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
