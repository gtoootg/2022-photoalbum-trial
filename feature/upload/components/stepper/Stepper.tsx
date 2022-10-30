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
import StepperFinalStepContainer from "./components/StepperFinalStepContainer";
import axios from "axios";

export default function VerticalStepper({
  flickrImages,
  countries,
  uploadingDataImages,
  uploadingDataTitle,
  uploadingDataDescription,
  uploadingDataCountry,
  uploadingDataCategory,
  uploadingDataLatLng,
  setUploadingDataImages,
  setUploadingDataTitle,
  setUploadingDataDescription,
  setUploadingDataCountry,
  setUploadingDataCategory,
  setUploadingDataLatLng,
}: VerticalStepperProps) {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState<number>(0);

  const fetchFlickrImageIdOfSelectedImages = uploadingDataImages.map(
    (uploadingDataImage) => flickrImages[uploadingDataImage].id
  );

  const uploadingDataForPostTable = {
    title: uploadingDataTitle,
    description: uploadingDataDescription,
    country: uploadingDataCountry,
    category: uploadingDataCategory,
    lat: uploadingDataLatLng ? uploadingDataLatLng.lat : null,
    lng: uploadingDataLatLng ? uploadingDataLatLng.lng : null,
  };

  const uploadingDataForFlickrPhotoIdTable = (postId: number) => ({
    postId: postId,
    flickrPhotoIds: fetchFlickrImageIdOfSelectedImages,
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleUpload = async () => {
    const uploadNewPost = axios
      .post("/api/upload", uploadingDataForPostTable)
      .catch((e) => console.log(e));

    const getLastInsertId = await axios
      .get("/api/latest-post-id")
      .then((res) => {
        const responseDataArray = res.data;
        const lastInsertId = responseDataArray[0]["LAST_INSERT_ID()"];

        return lastInsertId;
      });

    const uploadFlickrPhotoIdOfUploadedPost = axios.post(
      "/api/flickr-photo-id",
      uploadingDataForFlickrPhotoIdTable(getLastInsertId)
    );

    await uploadNewPost;
    uploadFlickrPhotoIdOfUploadedPost;
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
          uploadingDataImages={uploadingDataImages}
          setUploadingDataImages={setUploadingDataImages}
          flickrImages={flickrImages}
        />
      ),
      isButtonDisabledCondition: uploadingDataImages.length === 0,
    },
    {
      label: t("stepper.secondStep.label", { ns: "upload" }),
      description: t("stepper.secondStep.description", { ns: "upload" }),
      content: (
        <StepperSecondStepContainer
          activeStep={activeStep}
          uploadingDataTitle={uploadingDataTitle}
          uploadingDataDescription={uploadingDataDescription}
          setUploadingDataTitle={setUploadingDataTitle}
          setUploadingDataDescription={setUploadingDataDescription}
        />
      ),
      isButtonDisabledCondition:
        !uploadingDataTitle || !uploadingDataDescription,
    },
    {
      label: t("stepper.thirdStep.label", { ns: "upload" }),
      description: t("stepper.thirdStep.description", { ns: "upload" }),
      content: (
        <StepperThirdStepContainer
          activeStep={activeStep}
          countries={countries}
          setUploadingDataCountry={setUploadingDataCountry}
          setUploadingDataCategory={setUploadingDataCategory}
          uploadingDataCountry={uploadingDataCountry}
          uploadingDataCategory={uploadingDataCategory}
          uploadingDataLatLng={uploadingDataLatLng}
          setUploadingDataLatLng={setUploadingDataLatLng}
        />
      ),
      isButtonDisabledCondition:
        !uploadingDataCountry || !uploadingDataCategory || !uploadingDataLatLng,
    },
    {
      label: t("stepper.finalStep.label", { ns: "upload" }),
      description: t("stepper.finalStep.description", { ns: "upload" }),
    },
  ];

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
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
                    handleUpload={handleUpload}
                    handleBack={handleBack}
                    uploadingDataImages={uploadingDataImages}
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
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            {t("stepper.completed.link", { ns: "upload" })}
          </Button>
        </Paper>
      )}
    </Box>
  );
}
