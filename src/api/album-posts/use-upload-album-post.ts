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
import { useShowSnackbar } from "../../components/snackbar/use-show-snackbar.hooks";
import { StatusAndMessageResponse } from "../ApiResponse.types";
import { useApiConfig } from "../use-api-config.hooks";
import {useAuthUserId} from "../../app/auth/state/use-auth.reactive-vars";

export const useUploadAlbumPost = () => {
  const showSnackbar = useShowSnackbar();
  const config = useApiConfig();

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
  const [userId] = useAuthUserId()
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
      userId,
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
