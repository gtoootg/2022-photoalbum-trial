import {
  useGetAlbumPosts,
  useGetAlbumPostsSelector,
} from "../../../api/album-posts/use-get-album-posts.hooks";
import { useRouter } from "next/router";
import { useGetExifData } from "../../../api/flickr-images/use-get-exif-data.hooks";
import { useMemo } from "react";
import { useFlickrImagesSelector } from "../../../api/flickr-images/use-get-flickr-images.hooks";
import { useQueryClient } from "react-query";
import { AxiosResponse } from "axios";
import { GetAlbumPostsResponse } from "../../../api/album-posts/album-posts.api.types";

const transformExifDataForAlbumPostContent = (exifData) => {
  if (!exifData) {
    return undefined;
  }

  const filterExifData = (tagName) => {
    return exifData.photo.exif.filter((data) => data.tag === tagName)[0]?.raw[
      "_content"
    ];
  };

  return {
    camera: exifData.photo.camera,
    iso: filterExifData("ISO"),
    fNumber: filterExifData("FNumber"),
    exposure: filterExifData("ExposureTime"),
    focalLength: filterExifData("FocalLength"),
  };
};

export const filterImageSourcesOfPostForMediaCard = (
  flickrImages,
  uploadedPost
) => {
  return (flickrImages || []).filter((flickrImage) => {
    const flickrPhotoIdOfUploadedPostInArray = uploadedPost?.imageIds?.map(
      (e) => e.toString()
    );
    const flickrImageId = flickrImage.id.toString();

    return flickrPhotoIdOfUploadedPostInArray?.includes(flickrImageId);
  });
};

export const useGetAlbumPostData = (indexOfMainImage: number) => {
  const router = useRouter();
  // const albumPosts = useGetAlbumPosts();
  const { postId } = router.query;
  const flickrImages = useFlickrImagesSelector();

  const queryClient = useQueryClient();
  console.log("aaa", queryClient.getQueryData("albumPosts"));
  // return useMemo(() => {
  const albumPost = queryClient
    .getQueryData("albumPosts")
    ?.data?.find(({ id }) => id === Number(postId));
  const mainImageId = albumPost?.imageIds[indexOfMainImage];
  const { data: exifDataOfMainImage } = useGetExifData(mainImageId);
  const exifDataToUse =
    transformExifDataForAlbumPostContent(exifDataOfMainImage);
  const imageSrcs = filterImageSourcesOfPostForMediaCard(
    flickrImages,
    albumPost
  ).map((flickrImage) => flickrImage["url_h"]);

  console.log("albumPost", albumPost);
  console.log("mainImageId", mainImageId);
  console.log("imageSrcs", imageSrcs);

  return { albumPost, mainImageId, imageSrcs, exifDataToUse };
  // }, [postId, albumPosts, flickrImages]);
};

export const useExifDataOfAlbumPost = (indexOfMainImage: number) => {
  const { mainImageId } = useGetAlbumPostData(indexOfMainImage);

  const { data: exifDataOfMainImage } = useGetExifData(mainImageId);

  return useMemo(
    () => transformExifDataForAlbumPostContent(exifDataOfMainImage),
    [mainImageId, exifDataOfMainImage]
  );
};
