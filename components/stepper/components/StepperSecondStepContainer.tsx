import styled from "@emotion/styled";
import { Box, TextField, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { StepperSecondStepContainerProps } from "../Stepper.types";

const StepperSecondStepTextFieldStyled = styled(TextField)(() => ({
  marginBottom: "1rem",
}));

export default function StepperSecondStepContainer({
  uploadingDataTitle,
  uploadingDataDescription,
  setUploadingDataTitle,
  setUploadingDataDescription,
  activeStep,
}: StepperSecondStepContainerProps) {
  const { t } = useTranslation();

  if (activeStep >= 2) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant={"subtitle2"}>
          {t("stepper.secondStep.uploadData.title", { ns: "upload" })}
        </Typography>
        <Typography variant={"body2"}>{uploadingDataTitle}</Typography>
        <br />
        <Typography variant={"subtitle2"}>
          {t("stepper.secondStep.uploadData.description", { ns: "upload" })}
        </Typography>
        <Typography variant={"body2"}>{uploadingDataDescription}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <StepperSecondStepTextFieldStyled
        required
        id="outlined-required"
        label={t("stepper.secondStep.uploadData.title", { ns: "upload" })}
        onChange={(e) => setUploadingDataTitle(e.target.value)}
      />
      <StepperSecondStepTextFieldStyled
        required
        multiline
        rows={6}
        id="outlined-required"
        label={t("stepper.secondStep.uploadData.description", { ns: "upload" })}
        onChange={(e) => setUploadingDataDescription(e.target.value)}
      />
    </Box>
  );
}
