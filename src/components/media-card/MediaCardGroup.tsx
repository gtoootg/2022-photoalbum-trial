import { Grid } from "@mui/material";
import MediaCard from "./MediaCard";
import { GetAlbumPostsResponse } from "../../api/album-posts/album-posts.api.types";
import { filterImageSourcesOfPostForMediaCard } from "../../feature/album-post/hooks/use-get-album-post.hooks";
import { FlickrImageProps } from "../../api/flickr-images/flickr-images.api.types";
import { useBreakPoints } from "../../helper/responsive/use-break-points.hooks.ts.";

export const MediaCardGroup = ({
  flickrImages,
  uploadedPosts,
}: {
  flickrImages: FlickrImageProps[];
  uploadedPosts: GetAlbumPostsResponse;
}) => {
  return (
    <Grid container spacing={2} sx={{ marginTop: "3rem" }}>
      {uploadedPosts.map((uploadedPost, index) => {
        const imageSrcForMediaCard = filterImageSourcesOfPostForMediaCard(
          flickrImages,
          uploadedPost
        )[0]?.["url_n"];

        return (
          <Grid item md={6} lg={4} sm={12} key={index}>
            <MediaCard
              imageSrc={imageSrcForMediaCard}
              title={uploadedPost.title}
              description={uploadedPost.description}
              index={uploadedPost.id}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
