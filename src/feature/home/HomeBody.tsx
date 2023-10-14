import { MediaCardGroup } from "../../components/media-card/MediaCardGroup";
import { useGetAlbumPosts } from "../../api/album-posts/use-get-album-posts.hooks";
import { useGetFlickrImages } from "../../api/flickr-images/use-get-flickr-images.hooks";

export const HomeBody = () => {
  const { data: uploadedPosts } = useGetAlbumPosts();

  const { data: flickrImages } = useGetFlickrImages();

  if (!uploadedPosts || !flickrImages) {
    return null;
  }

  return (
    <MediaCardGroup
      flickrImages={flickrImages}
      uploadedPosts={uploadedPosts}
      uniqueId={"id"}
    />
  );
};
