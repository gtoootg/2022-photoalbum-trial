import { useQuery, useQueryClient } from "react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { GetAlbumPostsResponse } from "./album-posts.api.types";
import { QueryState } from "react-query/types/core/query";

export const useGetAlbumPosts = () => {
  const { isLoading, error, data } = useQuery<
    AxiosResponse<GetAlbumPostsResponse>,
    AxiosError
  >("albumPosts", () =>
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/albumposts`)
  );

  const result = data;

  return { isLoading, error, result, data: result?.data };
};

export const useGetAlbumPostsSelector = () => {
  const queryClient = useQueryClient();
  const result: QueryState<AxiosResponse<GetAlbumPostsResponse>> | undefined =
    queryClient?.getQueryState("albumPosts");

  const data = result?.data?.data;
  const isLoading = result?.status === "loading";

  return { data, isLoading };
};
