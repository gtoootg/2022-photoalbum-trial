import { useRouter } from "next/router";
import { useContext } from "react";
import { flickrImagesContext, uploadedPostsContext } from "../../pages/_app";
import { filterImageSourcesOfPostForMediaCard } from "../home/components/media-card/MediaCardGroup";
import ImageSlider from "./components/image-slider/ImageSlider";
import styles from "./AlbumPostBody.module.scss";
import { useGetFlickrImages, useGetUploadedPosts } from "../home/HomeBody";
import axios from "axios";
import TitleAndMetaData from "./components/title-and-meta-data/TitleAndMetaData";

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
        <ImageSlider
          imagesSrc={imagesSrc}
          handleChangeIndexOfMainImage={(indexOfMainImage) => {
            axios
              .get(
                `http://localhost:3000/api/get/exif/${uploadedPost.flickrPhotoId[indexOfMainImage]}`
              )
              .then((res) => {
                console.log(res.data);
              });
          }}
        />
        <TitleAndMetaData
          title={uploadedPost.title}
          description={uploadedPost.description}
        />
      </div>
    </>
  );
};

export default AlbumPostBody;
