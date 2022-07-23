import axios from "axios";
import { useEffect, useState } from "react";

export default function StepperFirstStepContainer() {
  const [countries, setCountries] = useState();

  const restCountriesUrl = "https://restcountries.com/v3.1/all";

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
    <button
      onClick={() => {
        console.log(countries);
      }}
    >
      third container
    </button>
  );
}
