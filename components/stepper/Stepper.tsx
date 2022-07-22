import React, { useState, useRef, useEffect, SetStateAction } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { Step, StepContent, StepLabel, styled, TextField } from "@mui/material";
import StepperImageContainer from "./StepperImageContainer";
import ImageListBox from "../image-list-box/ImageListBox";
import { FlickrImagesProps } from "../../pages/flickrApi";
import StepperButtonGroup from "./components/StepperButtonGroup";
import StepperSecondStepContainer from "./components/StepperSecondStepContainer";
import StepperFirstStepContainer from "./components/StepperFirstStepContainer";

interface HorizontalStepperProps {
  flickrImages: FlickrImagesProps[];
  uploadingDataImages: number[];
  setUploadingDataImages: (value: number[]) => void;
  setUploadingDataTitle: (value: string) => void;
  setUploadingDataDescription: (value: string) => void;
}

export default function HorizontalStepper({
  flickrImages,
  uploadingDataImages,
  setUploadingDataImages,
  setUploadingDataTitle,
  setUploadingDataDescription,
}: HorizontalStepperProps) {
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
      label: t("upload.photo.label"),
      description: t("upload.photo.description"),
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
      label: t("upload.title.label"),
      description: t("upload.title.description"),
      content: (
        <StepperSecondStepContainer
          setUploadingDataTitle={setUploadingDataTitle}
          setUploadingDataDescription={setUploadingDataDescription}
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
