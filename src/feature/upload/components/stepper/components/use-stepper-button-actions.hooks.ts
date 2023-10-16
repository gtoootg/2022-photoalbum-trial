import { StepProps } from "../UploadStepper.types";
import { useUploadActiveStep } from "../../../state/use-upload-data.reactive-vars";
import {
  useComposeUploadingAlbumPostPayload,
  useUploadAlbumPost,
} from "../../../../../api/album-posts/use-upload-album-post";
import { useCallback } from "react";
import { useRouter } from "next/router";

export const useHandleClickUploadStepperConfirmButton = (
  steps: StepProps[]
) => {
  const [activeStep, setActiveStep] = useUploadActiveStep();
  const payload = useComposeUploadingAlbumPostPayload();
  const { mutate: uploadAlbumPost } = useUploadAlbumPost();
  const router = useRouter();
  const confirmUploadStep = steps.length - 1;

  return useCallback(() => {
    if (activeStep === confirmUploadStep && payload) {
      uploadAlbumPost(payload, {
        onSuccess: () => {
          router.push("/");
        },
      });
      return;
    }
    setActiveStep(activeStep + 1);
  }, [activeStep, payload, setActiveStep, uploadAlbumPost]);
};
