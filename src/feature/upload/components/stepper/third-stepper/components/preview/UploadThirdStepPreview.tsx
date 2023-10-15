import { Box } from "@mui/material";
import { Text } from "../../../../../../../components/text/Text";
import { UploadThirdStepGoogleMap } from "../map/UploadThirdStepGoogleMap";
import { useTranslation } from "next-i18next";
import { useUploadingCountry } from "../../../../../state/use-upload-data.reactive-vars";

export const UploadThirdStepPreview = () => {
  const { t } = useTranslation();

  const [uploadingCountry] = useUploadingCountry();

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Box sx={{ display: "flex", flexDirection: "column", width: "15rem" }}>
        <Text
          variant={"subtitle2"}
          content={t("stepper.thirdStep.uploadData.country", {
            ns: "upload",
          })}
        />
        <Text variant={"body2"} content={uploadingCountry} />
        <Text
          variant={"subtitle2"}
          content={t("stepper.thirdStep.uploadData.category", {
            ns: "upload",
          })}
        />
      </Box>
      <UploadThirdStepGoogleMap />
    </Box>
  );
};
