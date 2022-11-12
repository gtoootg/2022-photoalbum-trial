import {
  Autocomplete,
  Box,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { CheckboxGroup } from "../../../../../components/checkbox-group/CheckboxGroup";
import GoogleMapApi from "../../../../../components/google-map/GoogleMapApi";
import { StepperThirdStepContainerProps } from "../UploadStepper.types";
import styles from "./StepperThirdStepContainer.module.scss";

export default function StepperThirdStepContainer({
  activeStep,
  countries,
  uploadingData,
  setUploadingData,
}: StepperThirdStepContainerProps) {
  const { t } = useTranslation();
  const { categoriesForSelectField } = useCategoriesForSelectField();

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
          <Typography variant={"body2"}>{uploadingData.categories}</Typography>
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
        <Typography variant={"h6"} className={styles.formField_headline}>
          {t("stepper.thirdStep.uploadData.country.headline", {
            ns: "upload",
          })}
        </Typography>
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
        <Typography variant={"h6"}>
          {t("stepper.thirdStep.uploadData.category.headline", {
            ns: "upload",
          })}
        </Typography>
        <CheckboxGroup
          className={styles.formField}
          options={categoriesForSelectField}
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
  let currentSelectedCategories = uploadingData.categories.slice();
  if (!eventTargetChecked) {
    const removeSelectedCategory = currentSelectedCategories.filter(
      (category) => {
        return category !== eventTargetValue;
      }
    );
    setUploadingData({ ...uploadingData, categories: removeSelectedCategory });
    return;
  }

  currentSelectedCategories.push(eventTargetValue);

  setUploadingData({ ...uploadingData, categories: currentSelectedCategories });
};

const useCategoriesForSelectField = () => {
  const [categoriesForSelectField, setCategoriesForSelectField] = useState([]);

  useEffect(() => {
    axios.get("api/get/common/category").then((res) => {
      const getCategoriesForSelectField = res.data.map((category) => {
        return {
          value: category.id,
          label: category.label,
        };
      });

      setCategoriesForSelectField(getCategoriesForSelectField);
    });
  }, []);

  return { categoriesForSelectField };
};

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
