import React, { useState, useRef, useEffect, SetStateAction } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { Step, StepContent, StepLabel } from "@mui/material";
import StepperButtonGroup from "./components/StepperButtonGroup";
import StepperSecondStepContainer from "./components/StepperSecondStepContainer";
import StepperFirstStepContainer from "./components/StepperFirstStepContainer";
import StepperThirdStepContainer from "./components/StepperThirdStepContainer";
import { VerticalStepperProps } from "./Stepper.types";

export default function VerticalStepper({
  flickrImages,
  countries,
  uploadingDataImages,
  uploadingDataCountry,
  uploadingDataCategory,
  setUploadingDataImages,
  setUploadingDataTitle,
  setUploadingDataDescription,
  setUploadingDataCountry,
  setUploadingDataCategory,
}: VerticalStepperProps) {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const steps = [
    {
      label: t("stepper.firstStep.label", { ns: "upload" }),
      description: t("stepper.firstStep.description", { ns: "upload" }),
      content: (
        <StepperFirstStepContainer
          activeStep={activeStep}
          images={flickrImages}
          uploadingDataImages={uploadingDataImages}
          setUploadingDataImages={setUploadingDataImages}
          flickrImages={flickrImages}
        />
      ),
    },
    {
      label: t("stepper.secondStep.label", { ns: "upload" }),
      description: t("stepper.secondStep.description", { ns: "upload" }),
      content: (
        <StepperSecondStepContainer
          setUploadingDataTitle={setUploadingDataTitle}
          setUploadingDataDescription={setUploadingDataDescription}
        />
      ),
    },
    {
      label: t("stepper.thirdStep.label", { ns: "upload" }),
      description: t("stepper.thirdStep.description", { ns: "upload" }),
      content: (
        <StepperThirdStepContainer
          countries={countries}
          setUploadingDataCountry={setUploadingDataCountry}
          setUploadingDataCategory={setUploadingDataCategory}
          uploadingDataCountry={uploadingDataCountry}
          uploadingDataCategory={uploadingDataCategory}
        />
      ),
    },
  ];

  return (
    <Box sx={{ border: "solid" }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps &&
          steps.map((step, index) => (
            <Step key={index} active={index === 0 || index === activeStep}>
              <StepLabel>{step.label}</StepLabel>
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
                    handleBack={handleBack}
                    uploadingDataImages={uploadingDataImages}
                    activeStep={activeStep}
                  />
                </StepContent>
              </Box>
            </Step>
          ))}
      </Stepper>
      {steps && activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
