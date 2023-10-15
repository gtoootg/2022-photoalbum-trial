import axios, { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { AxiosError } from "axios/index";
import { GetCommonCountriesResponse } from "./common-countries.api.types";

export const useGetCommonCountries = ()=>{

  const {isLoading,error,data}=useQuery<AxiosResponse<GetCommonCountriesResponse>,AxiosError>({
    queryKey:["commonCountries"],
    queryFn:()=>axios.get(process.env.NEXT_PUBLIC_COUNTRY_LIST)
  })

  const result = data

  return {isLoading,error,result, data:result?.data}

}