import { CircularProgress, Grid } from "@mui/material";
import { useContext } from "react";
import {
  flickrImagesContext,
  uploadedPostsContext,
} from "../../../../pages/_app";
import MediaCard from "./MediaCard";

export const MediaCardGroup = () => {
  const [flickrImages, setFlickrImages] = useContext(flickrImagesContext);
  const [uploadedPosts, setUploadedPosts] = useContext(uploadedPostsContext);

  if (flickrImages === undefined || uploadedPosts === undefined) {
    return <CircularProgress />;
  }

  return (
    <Grid container spacing={2}>
      {uploadedPosts?.map((uploadedPost, index) => {
        const imageSrcForMediaCard = filterImageSourcesOfPostForMediaCard(
          flickrImages,
          uploadedPost
        )[0]["url_h"];

        return (
          <Grid item xs={4} key={index}>
            <MediaCard
              imageSrc={imageSrcForMediaCard}
              title={uploadedPost.title}
              description={uploadedPost.description}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

const filterImageSourcesOfPostForMediaCard = (flickrImages, uploadedPost) => {
  return flickrImages.filter((flickrImage) => {
    const flickrPhotoIdOfUploadedPostInArray = uploadedPost?.flickrPhotoId?.map(
      (e) => e.toString()
    );
    const flickrImageId = flickrImage.id.toString();

    return flickrPhotoIdOfUploadedPostInArray?.includes(flickrImageId);
  });
};
