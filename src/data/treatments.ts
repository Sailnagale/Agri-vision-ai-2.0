// src/data/treatments.ts
import { TreatmentDatabase } from "@/types";

export const treatmentData: TreatmentDatabase = {
  Soybean___healthy: {
    en: {
      name: "Healthy Soybean",
      treatment: "Maintain current irrigation.",
      danger: "None",
      actions: ["Continue monitoring", "Soil check in 7 days"],
    },
    mr: {
      name: "निरोगी सोयाबीन",
      treatment: "सिंचन चालू ठेवा.",
      danger: "None",
      actions: ["नियमित तपासणी", "७ दिवसात माती परीक्षण"],
    },
  },
  // The compiler will now alert you if "hi" or "mr" is missing or malformed!
};
