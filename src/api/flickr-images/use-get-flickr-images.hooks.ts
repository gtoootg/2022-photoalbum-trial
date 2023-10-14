import axios, { AxiosResponse } from "axios";
import { AxiosError } from "axios/index";
import { useQuery } from "react-query";
import { FlickrImageProps } from "./flickr-images.api.types";

export const useGetFlickrImages = () => {
  const { isLoading, error, data } = useQuery<
    AxiosResponse<FlickrImageProps[]>,
    AxiosError
  >({
    queryKey: ["flickrImages"],
    queryFn: () =>
      axios
        .get("http://localhost:3000/api/flickrImages")
        .then((res) => res.data.photos.photo),
  });

  return { isLoading, error, data };
};

export function filterFlickrImagesByUploadDataImageId(
  uploadingDataImageIds: string[],
  flickrImages
): string[] {
  return flickrImages?.filter((flickrImage) =>
    uploadingDataImageIds.includes(flickrImage.id)
  );
}
