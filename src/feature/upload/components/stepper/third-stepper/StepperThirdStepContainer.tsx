import { Autocomplete, Box, Container, Grid, TextField } from "@mui/material";

import { useTranslation } from "next-i18next";
import { CheckboxGroup } from "../../../../../components/checkbox-group/CheckboxGroup";
import GoogleMapApi from "../../../../../components/google-map/GoogleMapApi";
import { PreviewImageListBox } from "../../../../../components/preview-image-list-box/PreviewImageListBox";
import { Text } from "../../../../../components/text/Text";

import { StepperThirdStepContainerProps } from "../UploadStepper.types";
import styles from "./StepperThirdStepContainer.module.scss";
import {
  filterFlickrImagesByUploadDataImageId,
  useGetFlickrImages
} from "../../../../../api/flickr-images/use-get-flickr-images.hooks";
import { useGetCommonCategories } from "../../../../../api/common/categories/use-get-common-categories.hooks";

export default function StepperThirdStepContainer({
  activeStep,
  countries,
  uploadingData,
  setUploadingData,
}: StepperThirdStepContainerProps) {
  const { t } = useTranslation();
  const { data: categories } = useGetCommonCategories();
  const {data:flickrImages} = useGetFlickrImages()

  const countriesForAutoCompleteOptions = countries?.map((country) => ({
    label: country.name.common,
    value: country.ccn3,
  }));

  const categryOptions = (categories||[]).map(({id,label})=>({
    value:id,
    label
  }))

  console.log(categryOptions)

  const filterSetectedFlickrImages = filterFlickrImagesByUploadDataImageId(
    uploadingData.flickrImageIds,
    flickrImages
  );

  const filterUploadingDataCountryInfo = countries
    ?.slice()
    .filter((country) => {
      if (uploadingData.country) {
        return country.ccn3 === uploadingData.country;
      }
    });

  if (activeStep >= 3) {
    return (
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ display: "flex", flexDirection: "column", width: "15rem" }}>
          <Text
            variant={"subtitle2"}
            content={t("stepper.thirdStep.uploadData.country", {
              ns: "upload",
            })}
          />
          <Text variant={"body2"} content={uploadingData.country} />
          <Text
            variant={"subtitle2"}
            content={t("stepper.thirdStep.uploadData.category", {
              ns: "upload",
            })}
          />
          {/* <Text variant={"body2"} content={uploadingData.categories} /> */}
        </Box>
        <Box sx={{ width: "30rem", height: "15rem" }}>
          <GoogleMapApi
            center={{
              lat: filterUploadingDataCountryInfo[0].latlng[0] as number,
              lng: filterUploadingDataCountryInfo[0].latlng[1] as number,
            }}
            zoom={5}
            uploadingDataLatLng={{
              lat: uploadingData.lat,
              lng: uploadingData.lng,
            }}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Grid container spacing={5}>
        <Grid item xs={7}>
          <Text
            variant={"h6"}
            className={styles.formField_headline}
            content={t("stepper.thirdStep.uploadData.country.headline", {
              ns: "upload",
            })}
          />
          <Autocomplete
            className={styles.formField}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t("stepper.thirdStep.uploadData.country.helpText", {
                  ns: "upload",
                })}
              />
            )}
            options={countriesForAutoCompleteOptions}
            onChange={(event, selectedCountry) => {
              handleChangeSelectedCountry(
                selectedCountry,
                uploadingData,
                setUploadingData
              );
            }}
          />
          <br />
          <Text
            variant={"h6"}
            content={t("stepper.thirdStep.uploadData.category.headline", {
              ns: "upload",
            })}
          />

          <CheckboxGroup
            className={styles.formField}
            options={categryOptions}
            subComponents={
              PreviewImageListBoxesForEachCategory(
                categryOptions,
                filterSetectedFlickrImages,
                uploadingData,
                setUploadingData
              )
            }
          />
        </Grid>
        <Grid item xs={5}>
          {uploadingData.country && filterUploadingDataCountryInfo ? (
            <GoogleMapApi
              center={{
                lat: filterUploadingDataCountryInfo[0].latlng[0] as number,
                lng: filterUploadingDataCountryInfo[0].latlng[1] as number,
              }}
              zoom={5}
              uploadingDataLatLng={{
                lat: uploadingData.lat,
                lng: uploadingData.lng,
              }}
              onClickAction={true}
              setUploadingDataLatLng={(e) => {
                setUploadingData({
                  ...uploadingData,
                  lat: e.lat,
                  lng: e.lng,
                });
              }}
            />
          ) : (
            <GoogleMapApi
              center={{ lat: 0, lng: 0 }}
              zoom={5}
              uploadingDataLatLng={{
                lat: uploadingData.lat,
                lng: uploadingData.lng,
              }}
              onClickAction={true}
              setUploadingDataLatLng={(e) => {
                setUploadingData({
                  ...uploadingData,
                  lat: e.lat,
                  lng: e.lng,
                });
              }}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

const PreviewImageListBoxesForEachCategory = (
  categories,
  filterSetectedFlickrImages,
  uploadingData,
  setUploadingData
) =>
  categories.map((category, i) => {
    return (
      <PreviewImageListBox
        key={i}
        imagesSrc={filterSetectedFlickrImages.map(
          (flickrImage) => flickrImage["url_n"]
        )}
        helperText="select photos"
        handleClickImages={(selectedImages) => {
          const getFlickrImagesIdOfSelectedImages = selectedImages.map(
            (selectedImage) => {
              return uploadingData.flickrImageIds[selectedImage];
            }
          );
          console.log(uploadingData);
          setUploadingData({
            ...uploadingData,
            categories: {
              ...uploadingData.categories,
              [category.value]: getFlickrImagesIdOfSelectedImages,
            },
          });
        }}
      />
    );
  });

const handleChangeSelectedCountry = (
  selectedCountry,
  uploadingData,
  setUploadingData
) => {
  if (!selectedCountry) {
    setUploadingData({
      ...uploadingData,
      country: undefined,
    });
    return;
  }

  setUploadingData({
    ...uploadingData,
    country: selectedCountry["value"],
  });
};
