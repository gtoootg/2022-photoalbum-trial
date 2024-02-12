"use client";

import { MediaCardGroup } from "../../components/media-card/MediaCardGroup";
import { useGetAlbumPosts } from "../../api/album-posts/use-get-album-posts.hooks";
import { useFlickrImages } from "../../api/flickr-images/use-get-flickr-images.hooks";
import { Box } from "@mui/material";
import { useCurrentWidth } from "../../helper/responsive/use-break-points.hooks";

export const HomeBody = () => {
  const { data: albumPosts } = useGetAlbumPosts();
  const { data: flickrImages } = useFlickrImages();
  const currentWidth = useCurrentWidth();

  if (!albumPosts || !flickrImages) {
    return null;
  }

  return (
    <Box maxWidth={currentWidth}>
      <MediaCardGroup flickrImages={flickrImages} uploadedPosts={albumPosts} />
    </Box>
  );
};
