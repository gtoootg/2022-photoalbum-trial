import { Box, Button } from "@mui/material";
import { StepperButtonGroupProps } from "../Stepper.types";

export default function StepperButtonGroup(props: StepperButtonGroupProps) {
  const {
    index,
    steps,
    handleNext,
    handleBack,
    activeStep,
    isButtonDisabledCondition,
  } = props;

  if (activeStep !== index) {
    return null;
  }
  return (
    <Box>
      <Button
        variant="contained"
        onClick={handleNext}
        sx={{ mt: 1, mr: 1 }}
        disabled={isButtonDisabledCondition}
      >
        {index === steps.length - 1 ? "Upload" : "Next"}
      </Button>
      <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
        Back
      </Button>
    </Box>
  );
}
