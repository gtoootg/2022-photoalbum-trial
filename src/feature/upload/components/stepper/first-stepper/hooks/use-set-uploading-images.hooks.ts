import { useUploadingImages } from "../../../../state/use-upload-data.reactive-vars";
import { useCallback } from "react";

export const useSetUploadingImages = () => {
  const [uploadingImages, setUploadingImages] = useUploadingImages();

  const imageIdsToSet = new Set(uploadingImages);

  return useCallback(
    (imageId: string) => {
      if (imageIdsToSet.has(imageId)) {
        imageIdsToSet.delete(imageId);
        setUploadingImages(Array.from(imageIdsToSet));
        return;
      }

      if (uploadingImages.length === 5) {
        return;
      }

      imageIdsToSet.add(imageId);
      setUploadingImages(Array.from(imageIdsToSet));
    },
    [imageIdsToSet, setUploadingImages, uploadingImages]
  );
};
