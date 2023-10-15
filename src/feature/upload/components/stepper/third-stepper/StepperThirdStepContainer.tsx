import { Autocomplete, Box, Grid, TextField } from "@mui/material";

import { useTranslation } from "next-i18next";
import { CheckboxGroup } from "../../../../../components/checkbox-group/CheckboxGroup";
import GoogleMapApi from "../../../../../components/google-map/GoogleMapApi";
import { PreviewImageListBox } from "../../../../../components/preview-image-list-box/PreviewImageListBox";
import { Text } from "../../../../../components/text/Text";

import styles from "./StepperThirdStepContainer.module.scss";
import { useGetCommonCategories } from "../../../../../api/common/categories/use-get-common-categories.hooks";
import {
  useUploadActiveStep,
  useUploadingCountry,
  useUploadingLocation,
} from "../../../state/use-upload-data.reactive-vars";
import { useGetCommonCountries } from "../../../../../api/common/countries/use-get-common-countries.hooks";

export default function StepperThirdStepContainer() {
  const { t } = useTranslation();
  const { data: categories } = useGetCommonCategories();
  const { data: countries } = useGetCommonCountries();
  const [activeStep] = useUploadActiveStep();
  const [uploadingCountry, setUploadingCountry] = useUploadingCountry();
  const [uploadingLocation, setUploadingLocation] = useUploadingLocation();
  const { lat, lng } = uploadingLocation || {};

  const countriesForAutoCompleteOptions = countries?.map((country) => ({
    label: country.name.common,
    value: country.ccn3,
  }));

  const categryOptions = (categories || []).map(({ id, label }) => ({
    value: id,
    label,
  }));

  const getCountryInfo = () => {
    if (!countries || !uploadingCountry) {
      return undefined;
    }
    countries?.find((country) => country.ccn3 === uploadingCountry);
  };

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
          <Text variant={"body2"} content={uploadingCountry} />
          <Text
            variant={"subtitle2"}
            content={t("stepper.thirdStep.uploadData.category", {
              ns: "upload",
            })}
          />
        </Box>
        {uploadingLocation && getCountryInfo() && (
          <Box sx={{ width: "30rem", height: "15rem" }}>
            <GoogleMapApi
              center={{
                lat: getCountryInfo().latlng[0],
                lng: getCountryInfo().latlng[1],
              }}
              zoom={5}
              uploadingDataLatLng={{
                lat,
                lng,
              }}
            />
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      justifyContent={"space-between"}
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
              if (typeof selectedCountry !== "string") {
                return;
              }
              setUploadingCountry(selectedCountry);
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
            subComponents={PreviewImageListBoxesForEachCategory()}
          />
        </Grid>
        <Grid item xs={5}>
          {uploadingCountry && getCountryInfo && uploadingLocation ? (
            <GoogleMapApi
              center={{
                lat: getCountryInfo[0].latlng[0] as number,
                lng: getCountryInfo[0].latlng[1] as number,
              }}
              zoom={5}
              uploadingDataLatLng={{
                lat,
                lng,
              }}
              onClickAction={true}
              setUploadingDataLatLng={(e) => {
                setUploadingLocation({
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
                lat: lat,
                lng: lng,
              }}
              onClickAction={true}
              setUploadingDataLatLng={(e) => {
                setUploadingLocation({
                  lat: e.lat,
                  lng: e.lng,
                });
              }}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

const PreviewImageListBoxesForEachCategory = () => {
  const { data: categories } = useGetCommonCategories();

  return (categories || []).map((category, i) => {
    return <PreviewImageListBox key={i} helperText="select photos" />;
  });
};
