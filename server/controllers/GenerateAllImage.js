import * as dotenv from "dotenv";
import OpenAI from "openai"; // Default import from openai package

dotenv.config();

// Initialize OpenAI instance with API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Controller to generate Image
export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    // Use openai.images.generate instead of createImage
    const response = await openai.images.generate({
      prompt: prompt,
      n: 1, // Number of images to generate
      size: "1024x1024",
    });

    const generatedImage = response.data[0].b64_json; // Access the generated image
    res.status(200).json({ photo: generatedImage });
  } catch (error) {
    // Handle errors and pass them to Express middleware
    next(
      createError(
        error.status || 500,
        error?.response?.data?.error?.message || error.message
      )
    );
  }
};

export const createError = (status, message) => {
  const err = new Error();
  err.status = status;
  err.message = message;
  return err;
};

export default generateImage;
