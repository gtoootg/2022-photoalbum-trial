import { Container, TextField } from "@mui/material";
import axios from "axios";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState, useEffect, useContext } from "react";
import VerticalStepper from "../../feature/upload/components/stepper/Stepper";
import { getFlickrImages } from "../flickrApi";
import { flickrImagesContext } from "../_app";

export default function Upload() {
  const [flickrImages, setFlickrImages] = useContext(flickrImagesContext);
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

  useGetFlickrImages(setFlickrImages);
  useGetCountries(setCountries);

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

const useGetCountries = (setCountries) => {
  const restCountriesUrl = "https://restcountries.com/v3.1/all";
  useEffect(() => {
    const handleGetCountries = async () => {
      const res = await axios
        .get(restCountriesUrl)
        .then((res) => {
          setCountries(res.data);
        })
        .catch(() => {
          throw Error;
        });
    };
    handleGetCountries();
  }, [setCountries]);
};

const useGetFlickrImages = (setFlickrImages) => {
  useEffect(() => {
    const handleGetFlickrImages = async () => {
      const res = await getFlickrImages();
      setFlickrImages(res);
    };
    handleGetFlickrImages();
  }, [setFlickrImages]);
};
