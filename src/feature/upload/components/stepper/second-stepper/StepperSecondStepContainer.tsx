import styled from "@emotion/styled";
import { Box, TextField } from "@mui/material";
import { useTranslation } from "next-i18next";
import { Text } from "../../../../../components/text/Text";
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
        <Text
          variant={"subtitle2"}
          className={styles.preview_title}
          content={t("stepper.secondStep.uploadData.title", { ns: "upload" })}
        />
        <Text variant={"body2"} content={uploadingData.title} />
        <br />
        <Text
          variant={"subtitle2"}
          content={t("stepper.secondStep.uploadData.description", {
            ns: "upload",
          })}
        />
        <Text variant={"body2"} content={uploadingData.description} />
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
