import { createGlobalState } from "react-use";

export const useUploadActiveStep = createGlobalState<number>(0);

export const useUploadingImages = createGlobalState<string[]>([]);

export const useUploadingTitle = createGlobalState<string>("");

export const useUploadingDescription = createGlobalState<string>("");

export const useUploadingCountry = createGlobalState<string>("");

export const useUploadingLocation = createGlobalState<{
  lat: number;
  lng: number;
} | null>(null);
