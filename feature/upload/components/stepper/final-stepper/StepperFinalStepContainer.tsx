import { Box, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { Text } from "../../../../../components/text/Text";

export default function StepperFinalStepContainer() {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Text variant={"subtitle2"} content={"OK?"} />
    </Box>
  );
}
