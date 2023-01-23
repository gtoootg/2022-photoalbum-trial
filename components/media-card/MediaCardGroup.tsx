import { CircularProgress, Grid } from "@mui/material";
import MediaCard from "./MediaCard";

export const MediaCardGroup = ({ flickrImages, uploadedPosts }) => {
  if (flickrImages === undefined || uploadedPosts === undefined) {
    return <CircularProgress />;
  }

  return (
    <Grid container spacing={2} sx={{ marginTop: "3rem" }}>
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
              index={index}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export const filterImageSourcesOfPostForMediaCard = (
  flickrImages,
  uploadedPost
) => {
  return (flickrImages || []).filter((flickrImage) => {
    const flickrPhotoIdOfUploadedPostInArray = uploadedPost?.flickrPhotoId?.map(
      (e) => e.toString()
    );
    const flickrImageId = flickrImage.id.toString();

    return flickrPhotoIdOfUploadedPostInArray?.includes(flickrImageId);
  });
};
