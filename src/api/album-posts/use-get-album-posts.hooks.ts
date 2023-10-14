import { useQuery } from "react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { GetAlbumPostsResponse } from "./album-posts.api.types";

export const useGetAlbumPosts = () => {
  const { isLoading, error, data } = useQuery<
    AxiosResponse<GetAlbumPostsResponse>,
    AxiosError
  >({
    queryKey: ["albumPosts"],
    queryFn: () => axios.get("http://localhost:8080/api/albumposts"),
  });

  const result = data;

  return { isLoading, error, result, data: result?.data };
};
