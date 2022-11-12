import {
  Autocomplete,
  Box,
  Container,
  TextField,
  Typography,
} from "@mui/material";

import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { CheckboxGroup } from "../../../../../components/checkbox-group/CheckboxGroup";
import GoogleMapApi from "../../../../../components/google-map/GoogleMapApi";
import { SelectBox } from "../../../../../components/text-field/SelectBox";
import { StepperThirdStepContainerProps } from "../UploadStepper.types";

export default function StepperThirdStepContainer({
  activeStep,
  countries,
  uploadingData,
  setUploadingData,
}: StepperThirdStepContainerProps) {
  const { t } = useTranslation();

  const categories = ["City", "Nature", "Night View"];

  const countriesForAutoCompleteOptions = countries?.map((country) => ({
    label: country.name.common,
    value: country.ccn3,
  }));

  const filterUploadingDataCountryInfo = countries
    ?.slice()
    .filter((country) => {
      if (uploadingData.country) {
        return country.ccn3 === uploadingData.country;
      }
    });

  useEffect(() => {
    console.log(uploadingData);
  }, [uploadingData]);

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
        <Autocomplete
          renderInput={(params) => <TextField {...params} label="Movie" />}
          options={countriesForAutoCompleteOptions}
          onChange={(event, selectedCountry) => {
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
          }}
        />
        <br />
        <CheckboxGroup
          options={[
            { label: "City", value: "0" },
            { label: "Night view", value: "1" },
            { label: "Nature", value: "2" },
          ]}
          handleClickCheckbox={(eventTargetValue, eventTargetChecked) => {
            handleClickCheckboxOfCategory(
              eventTargetValue,
              eventTargetChecked,
              uploadingData,
              setUploadingData
            );
          }}
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

const handleClickCheckboxOfCategory = (
  eventTargetValue,
  eventTargetChecked,
  uploadingData,
  setUploadingData
) => {
  let currentSelectedCategories = uploadingData.category.slice();
  if (!eventTargetChecked) {
    const removeSelectedCategory = currentSelectedCategories.filter(
      (category) => {
        return category !== eventTargetValue;
      }
    );
    setUploadingData({ ...uploadingData, category: removeSelectedCategory });
    return;
  }

  currentSelectedCategories.push(eventTargetValue);

  setUploadingData({ ...uploadingData, category: currentSelectedCategories });
};
