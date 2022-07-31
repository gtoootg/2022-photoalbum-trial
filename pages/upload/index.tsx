import { Container, TextField } from "@mui/material";
import axios from "axios";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect } from "react";
import { useRef, useState } from "react";
import VerticalStepper from "../../components/stepper/Stepper";
import { getFlickrImages } from "../flickrApi";

const restCountriesUrl = "https://restcountries.com/v3.1/all";

export default function Upload() {
  const [flickrImages, setFlickrImages] = useState([]);
  const [countries, setCountries] = useState();
  const [uploadingDataImages, setUploadingDataImages] = useState<number[]>([]);
  const [uploadingDataTitle, setUploadingDataTitle] =
    useState<string>(undefined);
  const [uploadingDataDescription, setUploadingDataDescription] =
    useState<string>(undefined);
  const [uploadingDataCountry, setUploadingDataCountry] =
    useState<string>(undefined);
  const [uploadingDataCategory, setUploadingDataCategory] =
    useState<string>(undefined);
  const [uploadingDataLatLng, setUploadingDataLatLng] = useState(undefined);

  useEffect(() => {
    async function onGetFlickrImages() {
      setFlickrImages(await getFlickrImages());
    }

    const getCountries = axios
      .get(restCountriesUrl)
      .then((res) => {
        setCountries(res.data);
      })
      .catch(() => {
        throw Error;
      });

    onGetFlickrImages();
    getCountries;
  }, []);

  return (
    <Container>
      <VerticalStepper
        flickrImages={flickrImages}
        countries={countries}
        uploadingDataImages={uploadingDataImages}
        uploadingDataTitle={uploadingDataTitle}
        uploadingDataDescription={uploadingDataDescription}
        uploadingDataCountry={uploadingDataCountry}
        uploadingDataCategory={uploadingDataCategory}
        uploadingDataLatLng={uploadingDataLatLng}
        setUploadingDataImages={setUploadingDataImages}
        setUploadingDataTitle={setUploadingDataTitle}
        setUploadingDataDescription={setUploadingDataDescription}
        setUploadingDataCountry={setUploadingDataCountry}
        setUploadingDataCategory={setUploadingDataCategory}
        setUploadingDataLatLng={setUploadingDataLatLng}
      />
    </Container>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "upload"])),
    },
  };
}