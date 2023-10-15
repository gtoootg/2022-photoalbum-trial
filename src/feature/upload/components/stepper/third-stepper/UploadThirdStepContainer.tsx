import { Autocomplete, Box, Grid, TextField } from "@mui/material";

import { useTranslation } from "next-i18next";
import { CheckboxGroup } from "../../../../../components/checkbox-group/CheckboxGroup";
import { PreviewImageListBox } from "../../../../../components/preview-image-list-box/PreviewImageListBox";
import { Text } from "../../../../../components/text/Text";

import styles from "./UploadThirdStepContainer.module.scss";
import { useGetCommonCategories } from "../../../../../api/common/categories/use-get-common-categories.hooks";
import {
  useUploadActiveStep,
  useUploadingCountry,
  useUploadingLocation,
} from "../../../state/use-upload-data.reactive-vars";
import { useGetCommonCountries } from "../../../../../api/common/countries/use-get-common-countries.hooks";
import { UploadThirdStepGoogleMap } from "./components/map/UploadThirdStepGoogleMap";
import { UploadThirdStepPreview } from "./components/preview/UploadThirdStepPreview";

export default function UploadThirdStepContainer() {
  const { t } = useTranslation();
  const { data: categories } = useGetCommonCategories();
  const { data: countries } = useGetCommonCountries();
  const [activeStep] = useUploadActiveStep();
  const [, setUploadingCountry] = useUploadingCountry();
  const [, setUploadingLocation] = useUploadingLocation();

  const countriesForAutoCompleteOptions = countries?.map((country) => ({
    label: country.name.common,
    value: country.ccn3,
  }));

  const categryOptions = (categories || []).map(({ id, label }) => ({
    value: id,
    label,
  }));

  if (activeStep >= 3) {
    return <UploadThirdStepPreview />;
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
              if (typeof selectedCountry === "string") {
                return;
              }
              if (selectedCountry === null) {
                setUploadingCountry("");
                return;
              }
              setUploadingCountry(selectedCountry.value);
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
          <UploadThirdStepGoogleMap
            onClickAction={true}
            setUploadingDataLatLng={(e) => {
              setUploadingLocation({ lat: e.lat, lng: e.lng });
            }}
          />
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
