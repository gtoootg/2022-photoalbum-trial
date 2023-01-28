import { Container } from "@mui/material";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { HeadlineWithCaption } from "../../components/headline/HeadlineWithCaption";
import { flickrImagesContext } from "../../pages/_app";
import { useGetFlickrImages } from "../home/HomeBody";
import Stepper from "./components/stepper/UploadStepper";
import { UploadingDataProps } from "./Upload.types";
import styles from "./UploadBody.module.scss";
import { useTranslation } from "next-i18next";

export default function Upload() {
  const [flickrImages, setFlickrImages] = useContext(flickrImagesContext);
  const [countries, setCountries] = useState();
  const [uploadingData, setUploadingData] = useState<UploadingDataProps>(
    initialUploadingDataState
  );

  const { t } = useTranslation();

  useGetCountries(setCountries);
  useGetFlickrImages(setFlickrImages, flickrImages);

  return (
    <Container className={styles.uploadBody}>
      <HeadlineWithCaption
        headline={t("headlineWithCaption.headline", { ns: "upload" })}
        caption={t("headlineWithCaption.caption", { ns: "upload" })}
      />
      <Stepper
        flickrImages={flickrImages}
        countries={countries}
        uploadingData={uploadingData}
        setUploadingData={setUploadingData}
      />
    </Container>
  );
}

export const useGetCountries = (setCountries) => {
  const restCountriesUrl = "https://restcountries.com/v3.1/all";
  useEffect(() => {
    const handleGetCountries = async () => {
      await axios
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

const initialUploadingDataState: UploadingDataProps = {
  flickrImageIds: [],
  title: undefined,
  description: undefined,
  country: undefined,
  categories: undefined,
  lat: undefined,
  lng: undefined,
};
