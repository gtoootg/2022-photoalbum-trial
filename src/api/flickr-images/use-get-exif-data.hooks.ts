import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";

export const useGetExifData = (imageId?: number) => {
  const { isLoading, error, data } = useQuery<any, AxiosError>({
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
