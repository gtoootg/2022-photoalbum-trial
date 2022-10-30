import { Box, Container, styled, TextField, Typography } from "@mui/material";
import axios from "axios";
import { KeyObject } from "crypto";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import GoogleMapApi from "../../../../../components/google-map/GoogleMapApi";
import { SelectBox } from "../../../../../components/text-field/SelectBox";
import { StepperThirdStepContainerProps } from "../Stepper.types";

export default function StepperThirdStepContainer({
  activeStep,
  countries,
  setUploadingDataCountry,
  setUploadingDataCategory,
  setUploadingDataLatLng,
  uploadingDataCountry,
  uploadingDataCategory,
  uploadingDataLatLng,
}: StepperThirdStepContainerProps) {
  const { t } = useTranslation();

  const categories = ["City", "Nature", "Night View"];

  const filterUploadingDataCountryInfo = countries
    ?.slice()
    .filter((country) => {
      if (uploadingDataCountry) {
        return country.name.common === uploadingDataCountry;
      }
    });

  if (activeStep >= 3) {
    return (
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ display: "flex", flexDirection: "column", width: "15rem" }}>
          <Typography variant={"subtitle2"}>
            {t("stepper.thirdStep.uploadData.country", { ns: "upload" })}
          </Typography>
          <Typography variant={"body2"}>{uploadingDataCountry}</Typography>
          <Typography variant={"subtitle2"}>
            {t("stepper.thirdStep.uploadData.category", { ns: "upload" })}
          </Typography>
          <Typography variant={"body2"}>{uploadingDataCategory}</Typography>
        </Box>
        <Box sx={{ width: "30rem", height: "15rem" }}>
          <GoogleMapApi
            center={{
              lat: filterUploadingDataCountryInfo[0].latlng[0] as number,
              lng: filterUploadingDataCountryInfo[0].latlng[1] as number,
            }}
            zoom={5}
            uploadingDataLatLng={uploadingDataLatLng}
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
            handleChange={setUploadingDataCountry}
            label="Country"
            value={uploadingDataCountry}
          />
        )}
        <br />
        <SelectBox
          selectOptions={categories}
          handleChange={setUploadingDataCategory}
          label="Category"
          value={uploadingDataCategory}
        />
      </Box>
      <Box sx={{ width: "30rem", height: "20rem" }}>
        {uploadingDataCountry && filterUploadingDataCountryInfo ? (
          <GoogleMapApi
            center={{
              lat: filterUploadingDataCountryInfo[0].latlng[0] as number,
              lng: filterUploadingDataCountryInfo[0].latlng[1] as number,
            }}
            zoom={5}
            uploadingDataLatLng={uploadingDataLatLng}
            onClickAction={true}
            setUploadingDataLatLng={setUploadingDataLatLng}
          />
        ) : (
          <GoogleMapApi
            center={{ lat: 0, lng: 0 }}
            zoom={5}
            uploadingDataLatLng={uploadingDataLatLng}
            onClickAction={true}
            setUploadingDataLatLng={setUploadingDataLatLng}
          />
        )}
      </Box>
    </Container>
  );
}
