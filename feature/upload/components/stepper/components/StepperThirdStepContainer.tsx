import { Box, Container, Typography } from "@mui/material";

import { useTranslation } from "next-i18next";
import GoogleMapApi from "../../../../../components/google-map/GoogleMapApi";
import { SelectBox } from "../../../../../components/text-field/SelectBox";
import { StepperThirdStepContainerProps } from "../Stepper.types";

export default function StepperThirdStepContainer({
  activeStep,
  countries,
  uploadingData,
  setUploadingData,
}: StepperThirdStepContainerProps) {
  const { t } = useTranslation();

  const categories = ["City", "Nature", "Night View"];

  const filterUploadingDataCountryInfo = countries
    ?.slice()
    .filter((country) => {
      if (uploadingData.country) {
        return country.name.common === uploadingData.country;
      }
    });

  if (activeStep >= 3) {
    return (
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ display: "flex", flexDirection: "column", width: "15rem" }}>
          <Typography variant={"subtitle2"}>
            {t("stepper.thirdStep.uploadData.country", { ns: "upload" })}
          </Typography>
          <Typography variant={"body2"}>{uploadingData.country}</Typography>
          <Typography variant={"subtitle2"}>
            {t("stepper.thirdStep.uploadData.category", { ns: "upload" })}
          </Typography>
          <Typography variant={"body2"}>{uploadingData.category}</Typography>
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
      <Box sx={{ display: "flex", flexDirection: "column", width: "25rem" }}>
        {countries && (
          <SelectBox
            selectOptions={countries}
            parentKeyName={"name"}
            childKeyName={"common"}
            handleChange={(value) => {
              setUploadingData({ ...uploadingData, country: value });
            }}
            label="Country"
            value={uploadingData.country}
          />
        )}
        <br />
        <SelectBox
          selectOptions={categories}
          handleChange={(value) => {
            setUploadingData({ ...uploadingData, category: value });
          }}
          label="Category"
          value={uploadingData.category}
        />
      </Box>
      <Box sx={{ width: "30rem", height: "20rem" }}>
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
      </Box>
    </Container>
  );
}
