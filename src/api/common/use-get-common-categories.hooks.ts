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
    queryFn: () => axios.get("http://localhost:8080/api/common/categories"),
  });

  const result = data;

  return { isLoading, error, result, data: result?.data };
};
