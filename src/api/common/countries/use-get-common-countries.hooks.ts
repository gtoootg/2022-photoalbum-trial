import axios, { AxiosResponse } from "axios";
import { useQuery, useQueryClient } from "react-query";
import { AxiosError } from "axios/index";
import { GetCommonCountriesResponse } from "./common-countries.api.types";

export const useGetCommonCountries = () => {
  const url = process.env.NEXT_PUBLIC_COUNTRY_LIST;

  const { isLoading, error, data } = useQuery<
    AxiosResponse<GetCommonCountriesResponse> | void,
    AxiosError
  >({
    queryKey: ["getCommonCountries"],
    queryFn: () => {
      if (!url) {
        return;
      }
      return axios.get(url);
    },
  });

  const result = data;

  return { isLoading, error, result, data: result?.data };
};

export const useGetCommonCountriesSelector = ():
  | AxiosResponse<GetCommonCountriesResponse>
  | undefined => {
  const queryClient = useQueryClient();

  return queryClient.getQueryData("getCommonCountries");
};
