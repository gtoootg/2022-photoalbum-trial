import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import { useGetAlbumPostData } from "./hooks/use-get-album-post.hooks";
import { AlbumPostImageBox } from "./components/image-box/AlbumPostImageBox";
import { AlbumPostGeneralInformation } from "./components/general-information/AlbumPostGeneralInformation";
import AlbumPostExifData from "./components/exif-data/AlbumPostExifData";
import { AlbumPostCategory } from "./components/category/AlbumPostCategory";
import GoogleMapApi from "../../components/google-map/GoogleMapApi";

const AlbumPostBody = () => {
  const [indexOfMainImage, setIndexOfMainImage] = useState(0);

  const { albumPost } = useGetAlbumPostData();
  if (!albumPost) {
    return null;
  }

  return (
    <>
      <AlbumPostImageBox
        indexOfMainImage={indexOfMainImage}
        handleClickSubImage={setIndexOfMainImage}
      />
      <Grid
        container
        maxWidth={"xl"}
        display={"flex"}
        mt={3}
        sx={{ border: "solid red" }}
      >
        <Grid item xs={5}>
          <AlbumPostGeneralInformation />
        </Grid>
        <Grid item container xs={7}>
          <Grid item container xs={6}>
            <AlbumPostExifData indexOfMainImage={indexOfMainImage} />
          </Grid>
          <Grid item container xs={4}>
            <AlbumPostCategory />
          </Grid>
          <Grid item xs={12}>
            <Box
              mt={3}
              height={400}
              sx={{ width: "100%", border: "solid green" }}
            >
              <GoogleMapApi
                center={{ lat: albumPost.lat, lng: albumPost.lng }}
                zoom={10}
                uploadingDataLatLng={{ lat: albumPost.lat, lng: albumPost.lng }}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AlbumPostBody;
