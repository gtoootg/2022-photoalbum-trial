import { TextField } from "@mui/material";
import axios from "axios";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import SelectBox from "../../text-field/SelectBox";
import { StepperThirdStepContainerProps } from "../Stepper.types";

export default function StepperThirdStepContainer({
  handleChange,
}: StepperThirdStepContainerProps) {
  const { t } = useTranslation();
  const [countries, setCountries] = useState();

  const restCountriesUrl = "https://restcountries.com/v3.1/all";

  const categories = ["City", "Nature", "Night View"];

  useEffect(() => {
    axios
      .get(restCountriesUrl)
      .then((res) => {
        setCountries(res.data);
      })
      .catch(() => {
        throw Error;
      });
  }, []);

  return (
    <>
      {countries && (
        <SelectBox
          selectOptions={countries}
          parentKeyName={"name"}
          childKeyName={"common"}
          handleChange={handleChange}
        />
      )}
      <SelectBox selectOptions={categories} handleChange={handleChange} />
    </>
  );
}
