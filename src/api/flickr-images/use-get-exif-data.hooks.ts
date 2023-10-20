import axios, { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { ExifData, GetExifDataResponse } from "./flickr-images.api.types";

export const useGetExifData = (imageId?: number) => {
  const { isLoading, error, data } = useQuery<
    AxiosResponse<GetExifDataResponse>,
    AxiosError
  >({
    queryKey: ["getExifData"],
    queryFn: () =>
      axios.get(
        process.env.NEXT_PUBLIC_CLIENT_API_URL + `/get/exif/${imageId}`
      ),
    enabled: imageId !== undefined,
  });

  const result = data;

  return { data: result?.data, result, error, isLoading };
};
