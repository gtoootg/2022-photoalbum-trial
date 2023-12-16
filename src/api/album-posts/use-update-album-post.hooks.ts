import { UpdateAlbumPostRequest } from "./album-posts.api.types";
import { useMutation } from "react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useShowSnackbar } from "../../components/snackbar/use-show-snackbar.hooks";
import { StatusAndMessageResponse } from "../ApiResponse.types";

export const useUpdateAlbumPost = ({
  onSuccessCallback,
}: {
  onSuccessCallback?: () => void;
}) => {
  const showSnackbar = useShowSnackbar();
  const { mutate, isLoading } = useMutation<
    AxiosResponse<StatusAndMessageResponse>,
    AxiosError<StatusAndMessageResponse>,
    UpdateAlbumPostRequest
  >({
    mutationFn: (payload) => {
      return axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/albumpost`,
        payload
      );
    },
    onSuccess: () => {
      onSuccessCallback && onSuccessCallback();
      showSnackbar({ message: "Successfully updated!", status: 200 });
    },
    onError: (e) => {
      showSnackbar({ status: e.response?.status });
    },
  });

  return { mutate, isLoading };
};
