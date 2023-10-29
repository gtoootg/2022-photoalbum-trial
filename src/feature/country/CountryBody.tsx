import { useRouter } from "next/router";
import { MediaCardGroup } from "../../components/media-card/MediaCardGroup";
import { useFlickrImages } from "../../api/flickr-images/use-get-flickr-images.hooks";
import { useGetAlbumPosts } from "../../api/album-posts/use-get-album-posts.hooks";
import { Box } from "@mui/material";

export const CountryBody = () => {
  const router = useRouter();

  const { data: albumPosts } = useGetAlbumPosts();
  const { data: flickrImages } = useFlickrImages();

  const { countryId } = router.query;

  const albumPostsOFCurrentCountry = albumPosts?.filter(
    (uploadedPost) => uploadedPost.country === countryId
  );

  if (!albumPostsOFCurrentCountry || !flickrImages) {
    return null;
  }

  return (
    <Box maxWidth={"xl"}>
      <MediaCardGroup
        flickrImages={flickrImages}
        uploadedPosts={albumPostsOFCurrentCountry}
      />
    </Box>
  );
};
