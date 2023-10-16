import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { filterImageSourcesOfPostForMediaCard } from "../../components/media-card/MediaCardGroup";
import ImageSlider from "../../components/image-slider/ImageSlider";
import axios from "axios";
import AlbumPostTitleAndDescription from "./components/title-and-description/AlbumPostTitleAndDescription";
import { useEffect } from "react";
import AlbumPostExifData from "./components/exif-data/AlbumPostExifData";
import { Grid } from "@mui/material";
import { CategoryAndMap } from "./components/category-and-map/CategoryAndMap";
import { AlbumPostDialogs } from "./dialog/AlbumPostDialogs";
import { AlbumPostContextProvider } from "./context-provider/AlbumPostContextProvider";
import { useGetAlbumPosts } from "../../api/album-posts/use-get-album-posts.hooks";
import { useFlickrImages } from "../../api/flickr-images/use-get-flickr-images.hooks";
import { useGetExifData } from "../../api/flickr-images/use-get-exif-data.hooks";

const AlbumPostBody = () => {
  const router = useRouter();
  const { data: flickrImages } = useFlickrImages();
  const { data: uploadedPosts } = useGetAlbumPosts();
  const [indexOfMainImage, setIndexOfMainImage] = useState(0);
  const { postId } = router.query;
  const uploadedPost = uploadedPosts?.find(
    (uploadedPost) => uploadedPost.id === Number(postId)
  );
  const mainImageId = useMemo(
    () => uploadedPost?.imageIds[indexOfMainImage],
    [uploadedPosts, indexOfMainImage]
  );

  const { data: exifDataOfMainImage } = useGetExifData(mainImageId);

  const imagesSrc = filterImageSourcesOfPostForMediaCard(
    flickrImages,
    uploadedPost
  ).map((flickrImage) => flickrImage["url_h"]);

  const exifDataToUse =
    transformExifDataForAlbumPostContent(exifDataOfMainImage);

  if (!uploadedPost || !flickrImages || !exifDataToUse) {
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
            }}
            imagesSrc={imagesSrc}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <AlbumPostTitleAndDescription
            title={uploadedPost.title}
            description={uploadedPost.description}
          />
          <AlbumPostExifData exifDataOfMainImage={exifDataToUse} />
          <CategoryAndMap uploadedPost={uploadedPost} />
        </Grid>
      </Grid>
      <AlbumPostDialogs uploadedPost={uploadedPost} />
    </AlbumPostContextProvider>
  );
};

export default AlbumPostBody;

// const getExifDataOfFlickrImage = async (uploadedPost, indexOfMainImage) => {
//   let result;
//   const res = () => {
//     return new Promise((resolve) => {
//       axios
//         .get(
//           `http://localhost:3000/api/get/exif/${uploadedPost.flickrPhotoId[indexOfMainImage]}`
//         )
//         .then((res) => {
//           result = res.data;
//           resolve(res);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     });
//   };
//
//   await res();
//   return result;
// };

const transformExifDataForAlbumPostContent = (exifData) => {
  if (!exifData) {
    return undefined;
  }

  const filterExifData = (tagName) => {
    return exifData.photo.exif.filter((data) => data.tag === tagName)[0]?.raw[
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
