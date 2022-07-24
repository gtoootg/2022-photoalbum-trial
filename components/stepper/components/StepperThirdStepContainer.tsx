import { Box, Container, styled, TextField } from "@mui/material";
import axios from "axios";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { SelectBox } from "../../text-field/SelectBox";
import { StepperThirdStepContainerProps } from "../Stepper.types";

export default function StepperThirdStepContainer({
  countries,
  setUploadingDataCountry,
  setUploadingDataCategory,
  uploadingDataCountry,
  uploadingDataCategory,
}: StepperThirdStepContainerProps) {
  const categories = ["City", "Nature", "Night View"];

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", width: "25rem" }}>
        {countries && (
          <SelectBox
            selectOptions={countries}
            parentKeyName={"name"}
            childKeyName={"common"}
            handleChange={setUploadingDataCountry}
            label="Country"
            value={uploadingDataCountry}
          />
        )}
        <br />
        <SelectBox
          selectOptions={categories}
          handleChange={setUploadingDataCategory}
          label="Category"
          value={uploadingDataCategory}
        />
      </Box>
      <Box>hello</Box>
    </Container>
  );
}
