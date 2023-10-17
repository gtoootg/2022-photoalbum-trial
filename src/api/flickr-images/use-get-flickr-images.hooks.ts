import axios, { AxiosError } from "axios";
import { useQuery, useQueryClient } from "react-query";
import { FlickrImageProps } from "./flickr-images.api.types";

export const useFlickrImages = () => {
  const { isLoading, error, data } = useQuery<FlickrImageProps[], AxiosError>({
    queryKey: ["flickrImages"],
    queryFn: () =>
      axios
        .get(process.env.NEXT_PUBLIC_CLIENT_API_URL + "/flickrImages")
        .then((res) => res.data.photos.photo),
  });

  return { isLoading, error, data };
};

export const useFlickrImagesSelector = (): FlickrImageProps[] => {
  const queryClient = useQueryClient();

  return queryClient.getQueryData("flickrImage");
};
