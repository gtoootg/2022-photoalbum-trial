import ImageListBox from "../../image-list-box/ImageListBox";
import { PreviewImageListBox } from "../../../../../components/preview-image-list-box/PreviewImageListBox";
import { useUploadActiveStep } from "../../../state/use-upload-data.reactive-vars";
import React from "react";

export default function UploadFirstStepContainer() {
  const [activeStep] = useUploadActiveStep();

  if (activeStep !== 0) {
    return <PreviewImageListBox />;
  }

  return <ImageListBox />;
}
