import { Box, Button } from "@mui/material";
import { StepperButtonGroupProps } from "../UploadStepper.types";
import { useUploadActiveStep } from "../../../state/use-upload-data.reactive-vars";
import { useHandleClickUploadStepperConfirmButton } from "./use-stepper-button-actions.hooks";
import { MgButton } from "../../../../../components/button/MgButton";

export default function StepperButtonGroup(props: StepperButtonGroupProps) {
  const { index, steps, isButtonDisabledCondition } = props;
  const handleClickConfirm = useHandleClickUploadStepperConfirmButton(steps);
  const [activeStep, setActiveStep] = useUploadActiveStep();

  if (activeStep !== index) {
    return null;
  }

  return (
    <Box width={1} display={"flex"} justifyContent={"flex-end"} mt={3}>
      {index !== 0 && (
        <Box mr={2}>
          <MgButton
            variant="contained"
            onClick={() => setActiveStep(activeStep - 1)}
            color={"inherit"}
            text={"Back"}
          />
        </Box>
      )}
      <MgButton
        variant="contained"
        onClick={handleClickConfirm}
        disabled={isButtonDisabledCondition}
        text={index === steps.length - 1 ? "Upload" : "Next"}
      />
    </Box>
  );
}
