import { useQuery } from "react-query";
import axios, { AxiosError } from "axios/index";
import { AxiosResponse } from "axios";
import { GetCommonCategoriesResponse } from "./common-categories.api.types";

export const useGetCommonCategories = () => {
  const { isLoading, error, data } = useQuery<
    AxiosResponse<GetCommonCategoriesResponse[]>,
    AxiosError
  >({
    queryKey: ["commonCategories"],
    queryFn: () =>
      axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`),
  });

  const result = data;

  return { isLoading, error, result, data: result?.data };
};
