import { Container } from "@mui/material";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { flickrImagesContext } from "../../pages/_app";
import { useGetFlickrImages } from "../home/HomeBody";
import VerticalStepper from "./components/stepper/Stepper";
import { UploadingDataProps } from "./upload.types";

export default function Upload() {
  const [flickrImages, setFlickrImages] = useContext(flickrImagesContext);
  const [countries, setCountries] = useState();
  const [uploadingData, setUploadingData] = useState<UploadingDataProps>(
    initialUploadingDataState
  );

  useGetCountries(setCountries);
  useGetFlickrImages(setFlickrImages);

  return (
    <Container>
      <VerticalStepper
        flickrImages={flickrImages}
        countries={countries}
        uploadingData={uploadingData}
        setUploadingData={setUploadingData}
      />
    </Container>
  );
}

const useGetCountries = (setCountries) => {
  const restCountriesUrl = "https://restcountries.com/v3.1/all";
  useEffect(() => {
    const handleGetCountries = async () => {
      const res = await axios
        .get(restCountriesUrl)
        .then((res) => {
          console.log(res.data[0]);
          setCountries(res.data);
        })
        .catch(() => {
          throw Error;
        });
    };
    handleGetCountries();
  }, [setCountries]);
};

const initialUploadingDataState: UploadingDataProps = {
  flickrImageIds: [],
  title: undefined,
  description: undefined,
  country: undefined,
  category: undefined,
  lat: undefined,
  lng: undefined,
};
