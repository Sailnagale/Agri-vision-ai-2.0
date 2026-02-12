// src/types/index.ts

export type DangerLevel = "None" | "Low" | "Medium" | "High";

export interface TreatmentInfo {
  name: string;
  treatment: string;
  danger: DangerLevel;
  actions: string[]; // Immediate steps for the farmer
}

export interface DiseaseRecord {
  en: TreatmentInfo;
  mr: TreatmentInfo; // Marathi support
  hi?: TreatmentInfo; // Hindi (optional)
}

export interface TreatmentDatabase {
  [key: string]: DiseaseRecord;
}
