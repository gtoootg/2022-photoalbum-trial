import { useMutation } from "react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import {
  useAuthAccessToken,
  useAuthUserId,
} from "../../app/auth/state/use-auth.reactive-vars";
import { useShowSnackbar } from "../../components/snackbar/use-show-snackbar.hooks";
import { StatusAndMessageResponse } from "../ApiResponse.types";
import { useRouter } from "next/router";

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
  const showSnackbar = useShowSnackbar();
  const [, setAuthUserId] = useAuthUserId();
  const [, setAccessToken] = useAuthAccessToken();
  const router = useRouter();

  const { mutate, data } = useMutation<
    AxiosResponse<AuthResponse>,
    AxiosError<StatusAndMessageResponse>,
    AuthRequest
  >({
    mutationFn: (payload) => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
        payload
      );
    },
    onSuccess: (data) => {
      showSnackbar({ message: "Login is successful", status: 200 });
      setAuthUserId(data.data.userId);
      setAccessToken(data.data.accessToken);
      router.push("/");
    },
    onError: (error) => {
      showSnackbar({
        message: error.response?.data.message,
        status: error.response?.status,
      });
      setAuthUserId(null);
      setAccessToken(null);
    },
  });

  return { mutate, data };
};
