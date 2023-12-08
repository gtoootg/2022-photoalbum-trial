import { UpdateAlbumPostRequest } from "./album-posts.api.types";
import { useMutation } from "react-query";
import axios from "axios";

export const useUpdateAlbumPost = ({
  onSuccessCallback,
}: {
  onSuccessCallback?: () => void;
}) => {
  const { mutate, isLoading } = useMutation<
    unknown,
    unknown,
    UpdateAlbumPostRequest,
    unknown
  >({
    mutationFn: (payload) => {
      return axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/albumpost`,
        payload
      );
    },
    onSuccess: (data) => {
      onSuccessCallback && onSuccessCallback();
    },
  });

  return { mutate, isLoading };
};
