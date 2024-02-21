import styled from "@emotion/styled";
import { Box, TextField } from "@mui/material";
import { useTranslation } from "next-i18next";
import { MgText } from "../../../../../components/text/MgText";
import React from "react";
import {
  useUploadActiveStep,
  useUploadingDescription,
  useUploadingTitle,
} from "../../../state/use-upload-data.reactive-vars";

export const StepperSecondStepTextFieldStyled = styled(TextField)(() => ({
  marginBottom: "1rem",
}));

export default function UploadSecondStepContainer() {
  const { t } = useTranslation();
  const [activeStep] = useUploadActiveStep();
  const [uploadingTitle, setUploadingTitle] = useUploadingTitle();
  const [uploadingDescription, setUploadingDescription] =
    useUploadingDescription();

  if (activeStep >= 2) {
    return (
      <Box
      // className={styles.box}
      >
        <MgText
          variant={"subtitle2"}
          // className={styles.preview_title}
          content={t("stepper.secondStep.uploadData.title", { ns: "upload" })}
        />
        <MgText variant={"body2"} content={uploadingTitle} />
        <br />
        <MgText
          variant={"subtitle2"}
          content={t("stepper.secondStep.uploadData.description", {
            ns: "upload",
          })}
        />
        <MgText variant={"body2"} content={uploadingDescription} />
      </Box>
    );
  }

  return (
    <Box
    // className={styles.box}
    >
      <StepperSecondStepTextFieldStyled
        required
        id="outlined-required"
        label={t("stepper.secondStep.uploadData.title", { ns: "upload" })}
        onChange={(e) => setUploadingTitle(e.target.value)}
        value={uploadingTitle}
      />
      <StepperSecondStepTextFieldStyled
        required
        multiline
        rows={6}
        id="outlined-required"
        label={t("stepper.secondStep.uploadData.description", { ns: "upload" })}
        onChange={(e) => setUploadingDescription(e.target.value)}
        value={uploadingDescription}
      />
    </Box>
  );
}
