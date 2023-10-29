import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { useGetAlbumPostData } from "./hooks/use-get-album-post.hooks";
import { AlbumPostImageBox } from "./components/image-box/AlbumPostImageBox";
import { AlbumPostGeneralInformation } from "./components/general-information/AlbumPostGeneralInformation";
import AlbumPostExifData from "./components/exif-data/AlbumPostExifData";
import { AlbumPostCategory } from "./components/category/AlbumPostCategory";
import GoogleMapApi from "../../components/google-map/GoogleMapApi";
import styles from "./AlbumPostBody.module.scss";

const AlbumPostBody = () => {
  const [indexOfMainImage, setIndexOfMainImage] = useState(0);

  const { albumPost } = useGetAlbumPostData();

  useEffect(() => {
    setIndexOfMainImage(0);
  }, [albumPost]);
  if (!albumPost) {
    return null;
  }

  return (
    <>
      <AlbumPostImageBox
        indexOfMainImage={indexOfMainImage}
        handleClickSubImage={setIndexOfMainImage}
      />
      <Grid container maxWidth={"xl"} display={"flex"} mt={3}>
        <Grid item xs={5}>
          <AlbumPostGeneralInformation />
        </Grid>
        <Grid item xs={7}>
          <Box className={styles.exifAndCategory}>
            <Grid container spacing={5}>
              <Grid item xs={6}>
                <AlbumPostExifData indexOfMainImage={indexOfMainImage} />
              </Grid>
              <Grid item xs={4}>
                <AlbumPostCategory />
              </Grid>
            </Grid>
          </Box>

          <Box mt={3} height={400} sx={{ width: "100%" }}>
            <GoogleMapApi
              center={{ lat: albumPost.lat, lng: albumPost.lng }}
              zoom={10}
              uploadingDataLatLng={{ lat: albumPost.lat, lng: albumPost.lng }}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default AlbumPostBody;
