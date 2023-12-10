import { useMutation } from "react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

export interface RegisterUserRequest {
  username: string;
  email: string;
  password: string;
}

export const useRegisterUser = () => {
  const { mutate, isLoading } = useMutation<
    AxiosResponse,
    AxiosError,
    RegisterUserRequest
  >({
    mutationFn: (payload) =>
      axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
        payload
      ),
  });

  return { mutate, isLoading };
};
