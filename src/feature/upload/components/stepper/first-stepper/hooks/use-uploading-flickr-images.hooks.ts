import { useFlickrImages } from "../../../../../../api/flickr-images/use-get-flickr-images.hooks";
import { useMemo } from "react";
import { useUploadingImages } from "../../../../state/use-upload-data.reactive-vars";

export const useUploadingFlickrImages = () => {
  const { data: flickrImages } = useFlickrImages();
  const [uploadingImages] = useUploadingImages();
  return useMemo(
    () => (flickrImages || []).filter(({ id }) => uploadingImages.includes(id)),
    [flickrImages, uploadingImages]
  );
};
