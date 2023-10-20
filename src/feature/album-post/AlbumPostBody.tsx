import { useState } from "react";
import ImageSlider from "../../components/image-slider/ImageSlider";
import AlbumPostTitleAndDescription from "./components/title-and-description/AlbumPostTitleAndDescription";
import AlbumPostExifData from "./components/exif-data/AlbumPostExifData";
import { Grid } from "@mui/material";
import { CategoryAndMap } from "./components/category-and-map/CategoryAndMap";
import { AlbumPostDialogs } from "./dialog/AlbumPostDialogs";
import { AlbumPostContextProvider } from "./context-provider/AlbumPostContextProvider";
import {
  useExifDataOfAlbumPost,
  useGetAlbumPostData,
} from "./hooks/use-get-album-post.hooks";

const AlbumPostBody = () => {
  const [indexOfMainImage, setIndexOfMainImage] = useState(0);

  const { albumPost, imageSrcs } = useGetAlbumPostData(indexOfMainImage);

  const exifDataToUse = useExifDataOfAlbumPost(indexOfMainImage);

  console.log(exifDataToUse);

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
