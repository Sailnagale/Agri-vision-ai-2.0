import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_HF_API_URL;

export interface PredictionResponse {
  disease: string;
  confidence: number;
  status: string;
}

export const getDiagnosis = async (
  imageFile: File,
): Promise<PredictionResponse> => {
  const formData = new FormData();
  formData.append("file", imageFile);

  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Diagnosis Error:", error);
    throw new Error("Failed to connect to the Digital Lab backend.");
  }
};
