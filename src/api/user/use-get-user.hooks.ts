import axios, { AxiosError, AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { useAuthAccessToken, useAuthUserId } from "../../app/auth/state/use-auth.reactive-vars";
import { GetUserResponse } from "./user.api.types";


export const useGetUser = ()=>{

  const [authUserId] = useAuthUserId()
  const [token] = useAuthAccessToken()

  const config = {
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type':'application/json' }
  };

  const {isLoading, error,data} = useQuery<AxiosResponse<GetUserResponse>,AxiosError>(
    "user",
    () =>
        axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`, { userId: authUserId },config),
    {enabled:Boolean(authUserId)}
    )

  const result = data

  return {isLoading, error, result, data:result?.data}

}