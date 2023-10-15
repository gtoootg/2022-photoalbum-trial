import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { Step, StepContent, StepLabel } from "@mui/material";
import StepperButtonGroup from "./components/StepperButtonGroup";
import UploadSecondStepContainer from "./second-stepper/UploadSecondStepContainer";
import UploadFirstStepContainer from "./first-stepper/UploadFirstStepContainer";
import axios from "axios";
import styles from "./UploadStepper.module.scss";
import {
  useUploadActiveStep,
  useUploadingCountry,
  useUploadingDescription,
  useUploadingImages,
  useUploadingLocation,
  useUploadingTitle,
} from "../../state/use-upload-data.reactive-vars";
import UploadThirdStepContainer from "./third-stepper/UploadThirdStepContainer";

export function UploadStepperGroup({}) {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useUploadActiveStep();

  const steps = useStepperConfig();

  return (
    <Box className={styles.uploadStepperBox}>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        className={styles.stepper}
      >
        {steps.map((step, index) => (
          <Step
            key={index}
            active={index <= activeStep || index === activeStep}
          >
            <StepLabel>
              <Typography variant={"h6"}>{step.label}</Typography>
            </StepLabel>
            <Box>
              <StepContent>
                {index === activeStep && (
                  <Typography style={{ marginBottom: "1rem" }}>
                    {step.description}
                  </Typography>
                )}
                {step.content}
                <StepperButtonGroup
                  index={index}
                  steps={steps}
                  handleNext={() => setActiveStep((prev) => prev + 1)}
                  handleUpload={() => {}}
                  handleBack={() => setActiveStep((prev) => prev - 1)}
                  activeStep={activeStep}
                  isButtonDisabledCondition={step.isButtonDisabledCondition}
                />
              </StepContent>
            </Box>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>
            {t("stepper.completed.explanation", { ns: "upload" })}
          </Typography>
          <Button onClick={() => setActiveStep(0)} sx={{ mt: 1, mr: 1 }}>
            {t("stepper.completed.link", { ns: "upload" })}
          </Button>
        </Paper>
      )}
    </Box>
  );
}

const useStepperConfig = () => {
  const { t } = useTranslation();
  const [uploadingImages] = useUploadingImages();
  const [uploadingTitle] = useUploadingTitle();
  const [uploadingDescription] = useUploadingDescription();
  const [uploadingCountry] = useUploadingCountry();
  const [uploadingLocation] = useUploadingLocation();

  return useMemo(
    () => [
      {
        label: t("stepper.firstStep.label", { ns: "upload" }),
        description: t("stepper.firstStep.description", { ns: "upload" }),
        content: <UploadFirstStepContainer />,
        isButtonDisabledCondition: uploadingImages.length === 0,
      },
      {
        label: t("stepper.secondStep.label", { ns: "upload" }),
        description: t("stepper.secondStep.description", { ns: "upload" }),
        content: <UploadSecondStepContainer />,
        isButtonDisabledCondition: !uploadingTitle || !uploadingDescription,
      },
      {
        label: t("stepper.thirdStep.label", { ns: "upload" }),
        description: t("stepper.thirdStep.description", { ns: "upload" }),
        content: <UploadThirdStepContainer />,
        isButtonDisabledCondition: !uploadingCountry || !uploadingLocation,
      },
      // {
      //   label: t("stepper.finalStep.label", { ns: "upload" }),
      //   description: t("stepper.finalStep.description", { ns: "upload" }),
      // },
    ],
    [
      uploadingCountry,
      uploadingDescription,
      uploadingImages,
      uploadingLocation,
      uploadingTitle,
      t,
    ]
  );
};

const handleUpload = (uploadingData) => {
  const transformData = {
    ...uploadingData,
    imageIds: uploadingData.flickrImageIds,
    categoryIds: uploadingData.categories,
  };

  const uploadPost = () =>
    axios
      .post("http://localhost:8080/api/albumpost", transformData)
      .then((res) => {
        console.log(res.status);
      })
      .catch((error) => {
        console.log(error);
      });

  uploadPost();
};
