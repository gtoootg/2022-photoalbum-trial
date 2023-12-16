import { useMutation } from "react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import {
  useUploadingCategories,
  useUploadingCountry,
  useUploadingDescription,
  useUploadingImages,
  useUploadingLocation,
  useUploadingTitle,
} from "../../feature/upload/state/use-upload-data.reactive-vars";
import { useMemo } from "react";
import { UploadAlbumPostRequest } from "./album-posts.api.types";
import {
  useAuthAccessToken,
  useAuthUserId,
} from "../../app/auth/state/use-auth.reactive-vars";
import { useShowSnackbar } from "../../components/snackbar/use-show-snackbar.hooks";
import { StatusAndMessageResponse } from "../ApiResponse.types";

export const useUploadAlbumPost = () => {
  const showSnackbar = useShowSnackbar();
  const [token] = useAuthAccessToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const { mutate, isLoading } = useMutation<
    AxiosResponse<StatusAndMessageResponse>,
    AxiosError<StatusAndMessageResponse>,
    UploadAlbumPostRequest
  >({
    mutationFn: (payload) => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/albumpost`,
        payload,
        config
      );
    },
    onSuccess: () => {
      showSnackbar({ message: "Successfully uploaded!", status: 200 });
    },
    onError: (e) => {
      showSnackbar({ status: e.response?.status });
    },
  });

  return { mutate, isLoading };
};

export const useComposeUploadingAlbumPostPayload = () => {
  const [images] = useUploadingImages();
  const [title] = useUploadingTitle();
  const [description] = useUploadingDescription();
  const [country] = useUploadingCountry();
  const [location] = useUploadingLocation();
  const [categories] = useUploadingCategories();

  return useMemo(() => {
    if (images.length === 0 || !title || !country || location === null) {
      return undefined;
    }

    return {
      title,
      description,
      country,
      lat: location.lat,
      lng: location.lng,
      imageIds: images,
      categoryIds: categories,
    };
  }, [images, title, description, country, location, categories]);
};
