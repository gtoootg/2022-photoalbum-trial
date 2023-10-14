import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { flickrImagesContext } from "../../pages/_app";
import { filterImageSourcesOfPostForMediaCard } from "../../components/media-card/MediaCardGroup";
import ImageSlider from "../../components/image-slider/ImageSlider";
import { useGetFlickrImages } from "../home/HomeBody";
import axios from "axios";
import AlbumPostTitleAndDescription from "./components/title-and-description/AlbumPostTitleAndDescription";
import { useEffect } from "react";
import AlbumPostExifData from "./components/exif-data/AlbumPostExifData";
import { Grid } from "@mui/material";
import { CategoryAndMap } from "./components/category-and-map/CategoryAndMap";
import { AlbumPostDialogs } from "./dialog/AlbumPostDialogs";
import { AlbumPostContextProvider } from "./context-provider/AlbumPostContextProvider";
import { useGetCommonCategories } from "../../api/common/use-get-common-categories.hooks";
import { useGetAlbumPosts } from "../../api/album-posts/use-get-album-posts.hooks";

const AlbumPostBody = () => {
  const router = useRouter();
  const [flickrImages, setFlickrImages] = useContext(flickrImagesContext);

  const { data: uploadedPosts } = useGetAlbumPosts();

  const [exifDataOfMainImage, setexifDataOfMainImage] = useState(undefined);
  const [indexOfMainImage, setIndexOfMainImage] = useState(0);
  const { postId } = router.query;
  const uploadedPost =
    uploadedPosts?.length &&
    uploadedPosts.find((uploadedPost) => uploadedPost.id === Number(postId));

  useGetFlickrImages(setFlickrImages, flickrImages);

  const { data: categories } = useGetCommonCategories();

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
  }, [flickrImages, uploadedPosts]);

  if (!uploadedPost || !flickrImages) {
    return null;
  }

  return (
    <AlbumPostContextProvider>
      <Grid container spacing={2}>
        <Grid item md={8} xs={12}>
          <ImageSlider
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
        </Grid>
        <Grid item md={4} xs={12}>
          <AlbumPostTitleAndDescription
            title={uploadedPost.title}
            description={uploadedPost.description}
          />
          <AlbumPostExifData exifDataOfMainImage={exifDataOfMainImage} />
          <CategoryAndMap
            uploadedPost={uploadedPost}
            allCategories={categories}
          />
        </Grid>
      </Grid>
      <AlbumPostDialogs uploadedPost={uploadedPost} />
    </AlbumPostContextProvider>
  );
};

export default AlbumPostBody;

const getExifDataOfFlickrImage = async (uploadedPost, indexOfMainImage) => {
  let result;
  const res = () => {
    return new Promise((resolve) => {
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
