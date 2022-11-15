import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { flickrImagesContext, uploadedPostsContext } from "../../pages/_app";
import { filterImageSourcesOfPostForMediaCard } from "../home/components/media-card/MediaCardGroup";
import AlbumPostImageSlider from "./components/image-slider/AlbumPostImageSlider";
import styles from "./AlbumPostBody.module.scss";
import { useGetFlickrImages, useGetUploadedPosts } from "../home/HomeBody";
import axios from "axios";
import AlbumPostTitleAndDescription from "./components/title-and-meta-data/AlbumPostTitleAndDescription";
import { useEffect } from "react";
import AlbumPostExifData from "./components/exif-data/AlbumPostExifData";

const AlbumPostBody = () => {
  const router = useRouter();
  const [flickrImages, setFlickrImages] = useContext(flickrImagesContext);
  const [uploadedPosts, setUploadedPosts] = useContext(uploadedPostsContext);

  const [exifDataOfMainImage, setexifDataOfMainImage] = useState(undefined);
  const [indexOfMainImage, setIndexOfMainImage] = useState(0);
  const { postId } = router.query;
  const uploadedPost = (uploadedPosts || [])[Number(postId)];

  useGetFlickrImages(setFlickrImages, flickrImages);
  useGetUploadedPosts(setUploadedPosts, uploadedPosts);

  const imagesSrc = filterImageSourcesOfPostForMediaCard(
    flickrImages,
    uploadedPost
  ).map((flickrImage) => flickrImage["url_h"]);

  useEffect(() => {
    if (!uploadedPosts || !flickrImages) {
      return;
    }
    getExifDataOfFlickrImage(uploadedPost, indexOfMainImage).then((result) => {
      setexifDataOfMainImage(transformExifDataForAlbumPostContent(result));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedPosts]);

  if (!uploadedPosts || !flickrImages) {
    return null;
  }

  return (
    <>
      <div className={styles.imageSlider}>
        <AlbumPostImageSlider
          indexOfMainImage={indexOfMainImage}
          handleClickSubImage={(index) => {
            setIndexOfMainImage(index);
            getExifDataOfFlickrImage(uploadedPost, index).then((result) => {
              setexifDataOfMainImage(
                transformExifDataForAlbumPostContent(result)
              );
            });
          }}
          imagesSrc={imagesSrc}
        />
        <div className={styles.titleAndDescriptionAndExifData}>
          <AlbumPostTitleAndDescription
            title={uploadedPost.title}
            description={uploadedPost.description}
          />
          <AlbumPostExifData exifDataOfMainImage={exifDataOfMainImage} />
        </div>
      </div>
    </>
  );
};

export default AlbumPostBody;

const getExifDataOfFlickrImage = async (uploadedPost, indexOfMainImage) => {
  let result;
  const res = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `http://localhost:3000/api/get/exif/${uploadedPost.flickrPhotoId[indexOfMainImage]}`
        )
        .then((res) => {
          result = res.data;
          resolve(res);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  await res();
  return result;
};

const transformExifDataForAlbumPostContent = (exifData) => {
  const filterExifData = (tagName) => {
    return exifData.photo.exif.filter((data) => data.tag === tagName)[0].raw[
      "_content"
    ];
  };

  return {
    camera: exifData.photo.camera,
    iso: filterExifData("ISO"),
    fNumber: filterExifData("FNumber"),
    exposure: filterExifData("ExposureTime"),
    focalLength: filterExifData("FocalLength"),
  };
};
