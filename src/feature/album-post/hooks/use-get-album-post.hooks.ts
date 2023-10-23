import {
  useGetAlbumPosts,
  useGetAlbumPostsSelector,
} from "../../../api/album-posts/use-get-album-posts.hooks";
import { useRouter } from "next/router";
import { useGetExifData } from "../../../api/flickr-images/use-get-exif-data.hooks";
import { useEffect, useMemo } from "react";
import {
  useFlickrImages,
  useFlickrImagesSelector,
} from "../../../api/flickr-images/use-get-flickr-images.hooks";
import { useQueryClient } from "react-query";
import { AxiosResponse } from "axios";
import {
  GetAlbumPostResponse,
  GetAlbumPostsResponse,
} from "../../../api/album-posts/album-posts.api.types";
import {
  ExifData,
  FlickrImageProps,
  GetExifDataResponse,
} from "../../../api/flickr-images/flickr-images.api.types";

const transformExifDataForAlbumPostContent = (
  exifData?: GetExifDataResponse
) => {
  if (!exifData) {
    return undefined;
  }

  const filterExifData = (tagName: string) => {
    return exifData.photo.exif.find((data) => data.tag === tagName)?.raw[
      "_content"
    ];
  };

  return {
    camera: exifData.photo.camera,
    iso: filterExifData("ISO") || "---",
    fNumber: filterExifData("FNumber") || "---",
    exposure: filterExifData("ExposureTime") || "---",
    focalLength: filterExifData("FocalLength") || "---",
  };
};

export const filterImageSourcesOfPostForMediaCard = (
  flickrImages?: FlickrImageProps[],
  uploadedPost?: GetAlbumPostResponse
) => {
  if (!uploadedPost || !flickrImages) {
    return [];
  }

  return flickrImages.filter((flickrImage) => {
    const flickrPhotoIdOfUploadedPostInArray = uploadedPost?.imageIds?.map(
      (e) => e.toString()
    );
    const flickrImageId = flickrImage.id.toString();

    return flickrPhotoIdOfUploadedPostInArray?.includes(flickrImageId);
  });
};

export const useGetAlbumPostData = () => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: albumPosts } = useGetAlbumPosts();
  const { data: flickrImages } = useFlickrImages();

  const albumPost = albumPosts?.find(({ id }) => id === Number(postId));

  const imageSrcs = filterImageSourcesOfPostForMediaCard(
    flickrImages,
    albumPost
  ).map((flickrImage) => flickrImage["url_h"]);

  return { albumPost, imageSrcs };
};

export const useExifDataOfAlbumPost = (indexOfMainImage: number) => {
  const { albumPost } = useGetAlbumPostData();

  const mainImageId = useMemo(
    () => albumPost?.imageIds[indexOfMainImage],
    [albumPost, indexOfMainImage]
  );

  const { data: exifDataOfMainImage } = useGetExifData(mainImageId);

  return useMemo(() => {
    return transformExifDataForAlbumPostContent(exifDataOfMainImage);
  }, [exifDataOfMainImage]);
};
