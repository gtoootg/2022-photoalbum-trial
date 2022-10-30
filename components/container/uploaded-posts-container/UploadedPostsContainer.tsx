import { Container } from "@mui/material";
import { uploadedPostsContext } from "../../../pages/_app";
import MediaCard from "../../media-card/MediaCard";
import { getFlickrImageUrlById } from "../../../pages/flickrApi";

export default function UploadedPostsContainer({ uploadedPosts }) {
  return (
    <Container sx={{ maxWidth: 1200 }}>
      {/* {uploadedPosts.map((uploadedPost, i) => {
        return (
          // <MediaCard
          //   key={i}
          //   imageSrc={imageSrc}
          //   title={uploadedPost.title}
          //   description={uploadedPost.description}
          // />
        ); */}
      {/* })} */}
    </Container>
  );
}
