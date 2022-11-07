import { Box, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";

export default function StepperFinalStepContainer() {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant={"subtitle2"}>OK?</Typography>
    </Box>
  );
}
