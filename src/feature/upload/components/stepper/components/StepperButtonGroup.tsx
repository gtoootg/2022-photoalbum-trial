import { Box, Button } from "@mui/material";
import { StepperButtonGroupProps } from "../UploadStepper.types";
import { useUploadActiveStep } from "../../../state/use-upload-data.reactive-vars";
import { useHandleClickUploadStepperConfirmButton } from "./use-stepper-button-actions.hooks";

export default function StepperButtonGroup(props: StepperButtonGroupProps) {
  const { index, steps, isButtonDisabledCondition } = props;
  const handleClickConfirm = useHandleClickUploadStepperConfirmButton(steps);
  const [activeStep, setActiveStep] = useUploadActiveStep();

  if (activeStep !== index) {
    return null;
  }

  return (
    <Box>
      <Button
        variant="contained"
        disabled={index === 0}
        onClick={() => setActiveStep(activeStep - 1)}
        sx={{ mt: 1, mr: 1 }}
      >
        Back
      </Button>
      <Button
        variant="contained"
        onClick={handleClickConfirm}
        sx={{ mt: 1, mr: 1 }}
        disabled={isButtonDisabledCondition}
      >
        {index === steps.length - 1 ? "Upload" : "Next"}
      </Button>
    </Box>
  );
}
