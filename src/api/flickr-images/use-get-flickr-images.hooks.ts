import axios, { AxiosError, AxiosResponse } from "axios";
import { useQuery, useQueryClient } from "react-query";
import { FlickrImageProps } from "./flickr-images.api.types";
import { QueryState } from "react-query/types/core/query";

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

export const useFlickrImagesSelector = () => {
  const queryClient = useQueryClient();

  const result: QueryState<FlickrImageProps[]> | undefined =
    queryClient.getQueryState("flickrImages");

  const data = result?.data;
  const isLoading = result?.status === "loading";

  return { data, isLoading };
};
