import ImageListBox from "../../image-list-box/ImageListBox";
import { PreviewImageListBox } from "../../../../../components/preview-image-list-box/PreviewImageListBox";
import { useUploadActiveStep } from "../../../state/use-upload-data.reactive-vars";

export default function StepperFirstStepContainer() {
  const [activeStep] = useUploadActiveStep();

  if (activeStep !== 0) {
    return <PreviewImageListBox />;
  }

  return <ImageListBox />;
}
