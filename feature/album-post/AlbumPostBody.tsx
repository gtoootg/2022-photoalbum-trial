import { useRouter } from "next/router";
import { useContext } from "react";
import { flickrImagesContext, uploadedPostsContext } from "../../pages/_app";
import { filterImageSourcesOfPostForMediaCard } from "../home/components/media-card/MediaCardGroup";
import ImageSlider from "./components/ImageSlider";

const AlbumPostBody = () => {
  const router = useRouter();
  const [flickrImages, setFlickrImages] = useContext(flickrImagesContext);
  const [uploadedPosts, setUploadedPosts] = useContext(uploadedPostsContext);
  const { postId } = router.query;
  const uploadedPost = uploadedPosts[Number(postId as string)];

  const imagesSrc = filterImageSourcesOfPostForMediaCard(
    flickrImages,
    uploadedPost
  ).map((flickrImage) => flickrImage["url_h"]);

  return (
    <>
      <ImageSlider imagesSrc={imagesSrc} />
    </>
  );
};

export default AlbumPostBody;
