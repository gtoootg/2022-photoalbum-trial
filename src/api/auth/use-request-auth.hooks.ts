import { useMutation } from "react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import {
  useAuthAccessToken,
  useAuthUserId,
} from "../../app/auth/state/use-auth.reactive-vars";

interface AuthRequest {
  username: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
  tokenType: "Bearer";
  userId: number;
}

export const useRequestAuth = () => {
  const [, setAuthUserId] = useAuthUserId();
  const [, setAccessToken] = useAuthAccessToken();

  const { mutate, data } = useMutation<
    AxiosResponse<AuthResponse>,
    AxiosError,
    AuthRequest
  >({
    mutationFn: (payload) => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
        payload
      );
    },
    onSuccess: (data) => {
      setAuthUserId(data.data.userId);
      setAccessToken(data.data.accessToken);
    },
    onError: () => {
      setAuthUserId(null);
      setAccessToken(null);
    },
  });

  return { mutate, data };
};
