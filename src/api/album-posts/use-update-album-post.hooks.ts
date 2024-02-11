import { UpdateAlbumPostRequest } from "./album-posts.api.types";
import { useMutation } from "react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useShowSnackbar } from "../../components/snackbar/use-show-snackbar.hooks";
import { StatusAndMessageResponse } from "../ApiResponse.types";
import { useApiConfig } from "../use-api-config.hooks";

export const useUpdateAlbumPost = ({
  onSuccessCallback,
}: {
  onSuccessCallback?: () => void;
}) => {
  const config = useApiConfig();
  const showSnackbar = useShowSnackbar();

  const { mutate, isLoading } = useMutation<
    AxiosResponse<StatusAndMessageResponse>,
    AxiosError<StatusAndMessageResponse>,
    UpdateAlbumPostRequest
  >({
    mutationFn: (payload) => {
      return axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/albumpost`,
        payload,
        config
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
