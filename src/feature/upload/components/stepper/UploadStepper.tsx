import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { Step, StepContent, StepLabel } from "@mui/material";
import StepperButtonGroup from "./components/StepperButtonGroup";
import styles from "./UploadStepper.module.scss";
import { useUploadActiveStep } from "../../state/use-upload-data.reactive-vars";
import { useUploadStepperConfig } from "./hooks/use-upload-stepper-config.hooks";

export function UploadStepperGroup({}) {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useUploadActiveStep();

  const steps = useUploadStepperConfig();

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
          <Button onClick={() => {}} sx={{ mt: 1, mr: 1 }}>
            {t("stepper.completed.link", { ns: "upload" })}
          </Button>
        </Paper>
      )}
    </Box>
  );
}
