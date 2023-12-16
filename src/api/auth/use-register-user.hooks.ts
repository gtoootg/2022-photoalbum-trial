import { useMutation } from "react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useShowSnackbar } from "../../components/snackbar/use-show-snackbar.hooks";
import { ErrorResponse } from "../error-response.types";

export interface RegisterUserRequest {
  username: string;
  email: string;
  password: string;
}

export const useRegisterUser = () => {
  const showSnackbar = useShowSnackbar();
  const { mutate, isLoading } = useMutation<
    AxiosResponse,
    AxiosError<ErrorResponse>,
    RegisterUserRequest
  >({
    mutationFn: (payload) =>
      axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
        payload
      ),
    onSuccess: () => {
      showSnackbar("user is registered", 200);
    },
    onError: (status) => {
      const message = status.response?.data.message || "";
      showSnackbar(message, 400);
    },
  });

  return { mutate, isLoading };
};
