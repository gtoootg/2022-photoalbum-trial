import { useState } from "react";
import AlbumPostTitleAndDescription from "./components/title-and-description/AlbumPostTitleAndDescription";
import AlbumPostExifData from "./components/exif-data/AlbumPostExifData";
import { Box, Grid } from "@mui/material";
import { CategoryAndMap } from "./components/category-and-map/CategoryAndMap";
import {
  useExifDataOfAlbumPost,
  useGetAlbumPostData,
} from "./hooks/use-get-album-post.hooks";
import { AlbumPostImageBox } from "./components/image-box/AlbumPostImageBox";
import { AlbumPostGeneralInformation } from "./components/general-information/AlbumPostGeneralInformation";

const AlbumPostBody = () => {
  const [indexOfMainImage, setIndexOfMainImage] = useState(0);

  const { albumPost } = useGetAlbumPostData();

  const exifDataToUse = useExifDataOfAlbumPost(indexOfMainImage);

  if (!albumPost) {
    return null;
  }

  return (
    <>
      <AlbumPostImageBox
        indexOfMainImage={indexOfMainImage}
        handleClickSubImage={setIndexOfMainImage}
      />
      <Box maxWidth={"xl"} sx={{ border: "solid blue" }}>
        <Box>
          <AlbumPostGeneralInformation />
        </Box>
        <Grid container spacing={2}>
          <Grid item md={4} xs={12}>
            {/*<AlbumPostExifData exifDataOfMainImage={exifDataToUse} />*/}
            {/*<CategoryAndMap uploadedPost={albumPost} />*/}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AlbumPostBody;
