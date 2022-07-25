import { Box, Container, styled, TextField } from "@mui/material";
import axios from "axios";
import { KeyObject } from "crypto";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import GoogleMapApi from "../../google-map/GoogleMapApi";
import { SelectBox } from "../../text-field/SelectBox";
import { StepperThirdStepContainerProps } from "../Stepper.types";

export default function StepperThirdStepContainer({
  countries,
  setUploadingDataCountry,
  setUploadingDataCategory,
  setUploadingDataLatLng,
  uploadingDataCountry,
  uploadingDataCategory,
  uploadingDataLatLng,
}: StepperThirdStepContainerProps) {
  const categories = ["City", "Nature", "Night View"];

  const filterUploadingDataCountryInfo = countries
    ?.slice()
    .filter((country) => {
      if (uploadingDataCountry) {
        return country.name.common === uploadingDataCountry;
      }
    });

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
