import {
  useUploadActiveStep,
  useUploadingCategories,
  useUploadingCountry,
  useUploadingDescription,
  useUploadingImages,
  useUploadingLocation,
  useUploadingTitle,
} from "./use-upload-data.reactive-vars";
import { useEffect } from "react";

export const useResetUploadState = () => {
  const [, setUploadActiveStep] = useUploadActiveStep();
  const [, setUploadingImages] = useUploadingImages();
  const [, setUploadingTitle] = useUploadingTitle();
  const [, setUploadingDescription] = useUploadingDescription();
  const [, setUploadingCountry] = useUploadingCountry();
  const [, setUploadingLocation] = useUploadingLocation();
  const [, setUploadingCategories] = useUploadingCategories();

  useEffect(() => {
    setUploadActiveStep(0);
    setUploadingImages([]);
    setUploadingTitle("");
    setUploadingDescription("");
    setUploadingCountry("");
    setUploadingLocation(null);
    setUploadingCategories({});
  }, [
    setUploadActiveStep,
    setUploadingImages,
    setUploadingTitle,
    setUploadingDescription,
    setUploadingCountry,
    setUploadingLocation,
    setUploadingCategories,
  ]);
};
