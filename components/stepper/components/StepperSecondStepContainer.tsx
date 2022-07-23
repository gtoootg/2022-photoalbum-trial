import styled from "@emotion/styled";
import { Box, TextField } from "@mui/material";
import { useTranslation } from "next-i18next";
import { StepperSecondStepContainerProps } from "../Stepper.types";

const StepperSecondStepTextFieldStyled = styled(TextField)(() => ({
  marginBottom: "1rem",
}));

export default function StepperSecondStepContainer({
  setUploadingDataTitle,
  setUploadingDataDescription,
}: StepperSecondStepContainerProps) {
  const { t } = useTranslation();
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <StepperSecondStepTextFieldStyled
        required
        id="outlined-required"
        label={t("stepper.secondStep.uploadData.title", { ns: "upload" })}
        defaultValue={t("stepper.secondStep.uploadData.title", {
          ns: "upload",
        })}
        onChange={(e) => setUploadingDataTitle(e.target.value)}
      />
      <StepperSecondStepTextFieldStyled
        required
        multiline
        rows={6}
        id="outlined-required"
        label={t("stepper.secondStep.uploadData.description", { ns: "upload" })}
        defaultValue={t("stepper.secondStep.uploadData.description", {
          ns: "upload",
        })}
        onChange={(e) => setUploadingDataDescription(e.target.value)}
      />
    </Box>
  );
}
