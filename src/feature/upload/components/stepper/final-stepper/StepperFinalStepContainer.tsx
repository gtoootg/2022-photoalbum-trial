import { Box, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { MgText } from "../../../../../components/text/MgText";

export default function StepperFinalStepContainer() {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <MgText variant={"subtitle2"} content={"OK?"} />
    </Box>
  );
}
