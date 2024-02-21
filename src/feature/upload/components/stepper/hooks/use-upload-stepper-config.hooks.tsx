import React from "react";
import { useTranslation } from "next-i18next";
import {
  useUploadingCountry,
  useUploadingDescription,
  useUploadingImages,
  useUploadingLocation,
  useUploadingTitle,
} from "../../../state/use-upload-data.reactive-vars";
import { useMemo } from "react";
import UploadFirstStepContainer from "../first-stepper/UploadFirstStepContainer";
import UploadSecondStepContainer from "../second-stepper/UploadSecondStepContainer";
import UploadThirdStepContainer from "../third-stepper/UploadThirdStepContainer";

export const useUploadStepperConfig = () => {
  const { t } = useTranslation();
  const [uploadingImages] = useUploadingImages();
  const [uploadingTitle] = useUploadingTitle();
  const [uploadingDescription] = useUploadingDescription();
  const [uploadingCountry] = useUploadingCountry();
  const [uploadingLocation] = useUploadingLocation();

  return useMemo(
    () => [
      {
        label: t("stepper.firstStep.label", { ns: "upload" }),
        description: t("stepper.firstStep.description", { ns: "upload" }),
        content: <UploadFirstStepContainer />,
        isButtonDisabledCondition: uploadingImages.length === 0,
      },
      {
        label: t("stepper.secondStep.label", { ns: "upload" }),
        description: t("stepper.secondStep.description", { ns: "upload" }),
        content: <UploadSecondStepContainer />,
        isButtonDisabledCondition: !uploadingTitle || !uploadingDescription,
      },
      {
        label: t("stepper.thirdStep.label", { ns: "upload" }),
        description: t("stepper.thirdStep.description", { ns: "upload" }),
        content: <UploadThirdStepContainer />,
        isButtonDisabledCondition: !uploadingCountry || !uploadingLocation,
      },
      {
        label: t("stepper.finalStep.label", { ns: "upload" }),
        description: t("stepper.finalStep.description", { ns: "upload" }),
      },
    ],
    [
      uploadingCountry,
      uploadingDescription,
      uploadingImages,
      uploadingLocation,
      uploadingTitle,
      t,
    ]
  );
};
