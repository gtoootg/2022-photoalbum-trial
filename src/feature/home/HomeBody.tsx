"use client";

import { MediaCardGroup } from "../../components/media-card/MediaCardGroup";
import { useGetAlbumPosts } from "../../api/album-posts/use-get-album-posts.hooks";
import { useFlickrImages } from "../../api/flickr-images/use-get-flickr-images.hooks";
import { GetAlbumPostsResponse } from "../../api/album-posts/album-posts.api.types";
import { FlickrImageProps } from "../../api/flickr-images/flickr-images.api.types";

export const HomeBody = () => {
  const { data: albumPosts } = useGetAlbumPosts();

  const { data: flickrImages } = useFlickrImages();

  if (!albumPosts || !flickrImages) {
    return null;
  }

  return (
    <MediaCardGroup flickrImages={flickrImages} uploadedPosts={albumPosts} />
  );
};
