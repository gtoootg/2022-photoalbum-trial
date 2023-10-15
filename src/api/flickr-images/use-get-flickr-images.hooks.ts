import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { FlickrImageProps } from "./flickr-images.api.types";

export const useFlickrImages = () => {
  const { isLoading, error, data } = useQuery<FlickrImageProps[], AxiosError>({
    queryKey: ["flickrImages"],
    queryFn: () =>
      axios
        .get(process.env.NEXT_PUBLIC_FLICKR_API_URL)
        .then((res) => res.data.photos.photo),
  });

  return { isLoading, error, data };
};
