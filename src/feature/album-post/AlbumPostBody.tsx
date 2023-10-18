import { useState } from "react";
import ImageSlider from "../../components/image-slider/ImageSlider";
import AlbumPostTitleAndDescription from "./components/title-and-description/AlbumPostTitleAndDescription";
import AlbumPostExifData from "./components/exif-data/AlbumPostExifData";
import { Grid } from "@mui/material";
import { CategoryAndMap } from "./components/category-and-map/CategoryAndMap";
import { AlbumPostDialogs } from "./dialog/AlbumPostDialogs";
import { AlbumPostContextProvider } from "./context-provider/AlbumPostContextProvider";
import { useGetAlbumPostData } from "./hooks/use-get-album-post.hooks";
import { useGetAlbumPosts } from "../../api/album-posts/use-get-album-posts.hooks";

const AlbumPostBody = () => {
  const [indexOfMainImage, setIndexOfMainImage] = useState(0);

  const { albumPost, mainImageId, imageSrcs, exifDataToUse } =
    useGetAlbumPostData(indexOfMainImage);

  if (!albumPost) {
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
            imagesSrc={imageSrcs || []}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <AlbumPostTitleAndDescription
            title={albumPost.title}
            description={albumPost.description}
          />
          <AlbumPostExifData exifDataOfMainImage={exifDataToUse} />
          <CategoryAndMap uploadedPost={albumPost} />
        </Grid>
      </Grid>
      <AlbumPostDialogs uploadedPost={exifDataToUse} />
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
