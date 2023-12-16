import { useMutation } from "react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useShowSnackbar } from "../../components/snackbar/use-show-snackbar.hooks";
import { StatusAndMessageResponse } from "../ApiResponse.types";

export interface RegisterUserRequest {
  username: string;
  email: string;
  password: string;
}

export const useRegisterUser = () => {
  const showSnackbar = useShowSnackbar();
  const { mutate, isLoading } = useMutation<
    AxiosResponse<StatusAndMessageResponse>,
    AxiosError<StatusAndMessageResponse>,
    RegisterUserRequest
  >({
    mutationFn: (payload) =>
      axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
        payload
      ),
    onSuccess: () => {
      showSnackbar({ message: "user is registered", status: 200 });
    },
    onError: (status) => {
      const message = status.response?.data.message;
      showSnackbar({ message, status: 400 });
    },
  });

  return { mutate, isLoading };
};
