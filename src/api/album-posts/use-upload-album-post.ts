import { useMutation } from "react-query";
import axios from "axios";
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

export const useUploadAlbumPost = () => {
  const { mutate, isLoading } = useMutation<
    unknown,
    unknown,
    UploadAlbumPostRequest,
    unknown
  >((payload) => {
    return axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/albumposts`,
      payload
    );
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
    if (
      images.length === 0 ||
      !title ||
      !country ||
      Object.values(location).length === 0 ||
      Object.values(location).length === 0
    ) {
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
