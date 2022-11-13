import { useRouter } from "next/router";
import { useContext } from "react";
import { flickrImagesContext, uploadedPostsContext } from "../../pages/_app";
import { filterImageSourcesOfPostForMediaCard } from "../home/components/media-card/MediaCardGroup";
import ImageSlider from "./components/image-slider/ImageSlider";
import TitleAndMetaData from "./components/title-and-meta-data/TitleAndMetadata";
import styles from "./AlbumPostBody.module.scss";
import { useGetFlickrImages, useGetUploadedPosts } from "../home/HomeBody";

const AlbumPostBody = () => {
  const router = useRouter();
  const [flickrImages, setFlickrImages] = useContext(flickrImagesContext);
  const [uploadedPosts, setUploadedPosts] = useContext(uploadedPostsContext);
  const { postId } = router.query;
  const uploadedPost = (uploadedPosts || [])[Number(postId)];

  useGetFlickrImages(setFlickrImages, flickrImages);
  useGetUploadedPosts(setUploadedPosts, uploadedPosts);

  const imagesSrc = filterImageSourcesOfPostForMediaCard(
    flickrImages,
    uploadedPost
  ).map((flickrImage) => flickrImage["url_h"]);

  if (!uploadedPosts || !flickrImages) {
    return null;
  }

  return (
    <>
      <div className={styles.imageSliderAndTitleAndMetaData}>
        <button
          onClick={() => {
            console.log(flickrImages[0]);
          }}
        >
          click
        </button>
        <ImageSlider imagesSrc={imagesSrc} />
        <TitleAndMetaData
          title={uploadedPost.title}
          description={uploadedPost.description}
        />
      </div>
    </>
  );
};

export default AlbumPostBody;
