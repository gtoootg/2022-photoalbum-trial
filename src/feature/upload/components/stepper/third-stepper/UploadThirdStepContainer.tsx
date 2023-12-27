import { Autocomplete, Box, Grid, TextField } from "@mui/material";

import { useTranslation } from "next-i18next";
import { MgText } from "../../../../../components/text/MgText";

import styles from "./UploadThirdStepContainer.module.scss";
import {
  useUploadActiveStep,
  useUploadingCountry,
  useUploadingLocation,
} from "../../../state/use-upload-data.reactive-vars";
import { useGetCommonCountries } from "../../../../../api/common/countries/use-get-common-countries.hooks";
import { UploadThirdStepGoogleMap } from "./components/map/UploadThirdStepGoogleMap";
import { UploadThirdStepPreview } from "./components/preview/UploadThirdStepPreview";
import { UploadThirdStepCategory } from "./components/category/UploadThirdStepCategory";

export default function UploadThirdStepContainer() {
  const { t } = useTranslation();
  const { data: countries } = useGetCommonCountries();
  const [activeStep] = useUploadActiveStep();
  const [, setUploadingCountry] = useUploadingCountry();

  const countriesForAutoCompleteOptions = countries?.map((country) => ({
    label: country.name.common,
    value: country.ccn3,
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
          <MgText
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
          <UploadThirdStepCategory />
        </Grid>
        <Grid item xs={5}>
          <UploadThirdStepGoogleMap />
        </Grid>
      </Grid>
    </Box>
  );
}
