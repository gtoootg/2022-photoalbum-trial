import { useQuery, useQueryClient } from "react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { GetAlbumPostsResponse } from "./album-posts.api.types";
import { useMemo } from "react";

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

export const useGetAlbumPostsSelector =
  (): AxiosResponse<GetAlbumPostsResponse> => {
    const queryClient = useQueryClient();
    return queryClient.getQueryData("albumPosts");
  };
