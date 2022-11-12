import React, { useState, useRef, useEffect, SetStateAction } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { Step, StepContent, StepLabel } from "@mui/material";
import StepperButtonGroup from "./components/StepperButtonGroup";
import StepperSecondStepContainer from "./second-stepper/StepperSecondStepContainer";
import StepperFirstStepContainer from "./first-stepper/StepperFirstStepContainer";
import StepperThirdStepContainer from "./third-stepper/StepperThirdStepContainer";
import { UploadStepperProps } from "./UploadStepper.types";
import axios from "axios";
import styles from "./UploadStepper.module.scss";

export default function UploadStepperGroup({
  flickrImages,
  countries,
  uploadingData,
  setUploadingData,
}: UploadStepperProps) {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState<number>(0);

  const { steps } = useStepperConfig({
    activeStep,
    uploadingData,
    setUploadingData,
    flickrImages,
    countries,
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <Box className={styles.uploadStepperBox}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps &&
          steps.map((step, index) => (
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
                    handleNext={handleNext}
                    handleUpload={() => handleUpload(uploadingData)}
                    handleBack={() => handleBack(setActiveStep)}
                    activeStep={activeStep}
                    isButtonDisabledCondition={step.isButtonDisabledCondition}
                  />
                </StepContent>
              </Box>
            </Step>
          ))}
      </Stepper>
      {steps && activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>
            {t("stepper.completed.explanation", { ns: "upload" })}
          </Typography>
          <Button
            onClick={() => handleReset(setActiveStep)}
            sx={{ mt: 1, mr: 1 }}
          >
            {t("stepper.completed.link", { ns: "upload" })}
          </Button>
        </Paper>
      )}
    </Box>
  );
}

const useStepperConfig = ({
  activeStep,
  uploadingData,
  setUploadingData,
  flickrImages,
  countries,
}) => {
  const { t } = useTranslation();
  const steps = [
    {
      label: t("stepper.firstStep.label", { ns: "upload" }),
      description: t("stepper.firstStep.description", { ns: "upload" }),
      content: (
        <StepperFirstStepContainer
          activeStep={activeStep}
          uploadingData={uploadingData}
          setUploadingData={setUploadingData}
          flickrImages={flickrImages}
        />
      ),
      isButtonDisabledCondition: !uploadingData.flickrImageIds.length,
    },
    {
      label: t("stepper.secondStep.label", { ns: "upload" }),
      description: t("stepper.secondStep.description", { ns: "upload" }),
      content: (
        <StepperSecondStepContainer
          activeStep={activeStep}
          uploadingData={uploadingData}
          setUploadingData={setUploadingData}
        />
      ),
      isButtonDisabledCondition:
        !uploadingData.title || !uploadingData.description,
    },
    {
      label: t("stepper.thirdStep.label", { ns: "upload" }),
      description: t("stepper.thirdStep.description", { ns: "upload" }),
      content: (
        <StepperThirdStepContainer
          activeStep={activeStep}
          countries={countries}
          uploadingData={uploadingData}
          setUploadingData={setUploadingData}
        />
      ),
      isButtonDisabledCondition:
        !uploadingData.country ||
        uploadingData.category.length === 0 ||
        !uploadingData.lat ||
        !uploadingData.lng,
    },
    {
      label: t("stepper.finalStep.label", { ns: "upload" }),
      description: t("stepper.finalStep.description", { ns: "upload" }),
    },
  ];

  return { steps };
};

const handleUpload = (uploadingData) => {
  const uploadPost = () =>
    axios
      .post("/api/upload", uploadingData)
      .then((res) => {
        console.log(res.status);
      })
      .catch((error) => {
        console.log(error);
      });

  uploadPost();
};

const handleBack = (setActiveStep) => {
  setActiveStep((prevActiveStep) => prevActiveStep - 1);
};

const handleReset = (setActiveStep) => {
  setActiveStep(0);
};
