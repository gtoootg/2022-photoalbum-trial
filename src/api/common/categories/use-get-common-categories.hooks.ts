import { useQuery, useQueryClient } from "react-query";
import axios, { AxiosResponse, AxiosError } from "axios";
import { GetCommonCategoriesResponse } from "./common-categories.api.types";
import { QueryState } from "react-query/types/core/query";

export const useGetCommonCategories = () => {
  const { isLoading, error, data } = useQuery<
    AxiosResponse<GetCommonCategoriesResponse[]>,
    AxiosError
  >({
    queryKey: ["getCommonCategories"],
    queryFn: () =>
      axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/common/categories`),
  });

  const result = data;

  return { isLoading, error, result, data: result?.data };
};

export const useGetCommonCategoriesSelector = () => {
  const queryClient = useQueryClient();

  const result:
    | QueryState<AxiosResponse<GetCommonCategoriesResponse[]>>
    | undefined = queryClient.getQueryState("getCommonCategories");

  const data = result?.data?.data;
  const isLoading = result?.status === "loading";
  return { data, isLoading };
};
