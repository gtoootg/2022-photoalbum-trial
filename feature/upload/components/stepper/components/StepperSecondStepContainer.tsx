import styled from "@emotion/styled";
import { Box, TextField, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { StepperSecondStepContainerProps } from "../UploadStepper.types";

import styles from "./StepperSecondStepContainer.module.scss";

const StepperSecondStepTextFieldStyled = styled(TextField)(() => ({
  marginBottom: "1rem",
}));

export default function StepperSecondStepContainer({
  uploadingData,
  setUploadingData,
  activeStep,
}: StepperSecondStepContainerProps) {
  const { t } = useTranslation();

  if (activeStep >= 2) {
    return (
      <Box className={styles.box}>
        <Typography variant={"subtitle2"} className={styles.preview_title}>
          {t("stepper.secondStep.uploadData.title", { ns: "upload" })}
        </Typography>
        <Typography variant={"body2"}>{uploadingData.title}</Typography>
        <br />
        <Typography variant={"subtitle2"}>
          {t("stepper.secondStep.uploadData.description", { ns: "upload" })}
        </Typography>
        <Typography variant={"body2"}>{uploadingData.description}</Typography>
      </Box>
    );
  }

  return (
    <Box className={styles.box}>
      <StepperSecondStepTextFieldStyled
        required
        id="outlined-required"
        label={t("stepper.secondStep.uploadData.title", { ns: "upload" })}
        onChange={(e) =>
          setUploadingData({ ...uploadingData, title: e.target.value })
        }
        value={uploadingData.title}
      />
      <StepperSecondStepTextFieldStyled
        required
        multiline
        rows={6}
        id="outlined-required"
        label={t("stepper.secondStep.uploadData.description", { ns: "upload" })}
        onChange={(e) =>
          setUploadingData({ ...uploadingData, description: e.target.value })
        }
        value={uploadingData.description}
      />
    </Box>
  );
}
