import { Grid } from "@mui/material";
import MediaCard from "./MediaCard";
import { GetAlbumPostsResponse } from "../../api/album-posts/album-posts.api.types";
import { filterImageSourcesOfPostForMediaCard } from "../../feature/album-post/hooks/use-get-album-post.hooks";

export const MediaCardGroup = ({
  flickrImages,
  uploadedPosts,
  uniqueId,
}: {
  flickrImages: any;
  uploadedPosts: GetAlbumPostsResponse;
  uniqueId: string;
}) => {
  if (!flickrImages) {
    return null;
  }

  return (
    <Grid container spacing={2} sx={{ marginTop: "3rem" }}>
      {uploadedPosts.map((uploadedPost, index) => {
        const imageSrcForMediaCard = filterImageSourcesOfPostForMediaCard(
          flickrImages,
          uploadedPost
        )[0]?.["url_n"];

        return (
          <Grid item xs={4} key={index}>
            <MediaCard
              imageSrc={imageSrcForMediaCard}
              title={uploadedPost.title}
              description={uploadedPost.description}
              index={uploadedPost[uniqueId]}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
