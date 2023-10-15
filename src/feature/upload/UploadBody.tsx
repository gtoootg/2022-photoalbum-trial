import { Container } from "@mui/material";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { HeadlineWithCaption } from "../../components/headline/HeadlineWithCaption";
import Stepper from "./components/stepper/UploadStepper";
import { UploadingDataProps } from "./Upload.types";
import styles from "./UploadBody.module.scss";
import { useTranslation } from "next-i18next";
import { useGetFlickrImages } from "../../api/flickr-images/use-get-flickr-images.hooks";
import { useGetCommonCountries } from "../../api/common/countries/use-get-common-countries.hooks";

export default function Upload() {
  const {data:flickrImages} = useGetFlickrImages()
  // const [countries, setCountries] = useState();
  const [uploadingData, setUploadingData] = useState<UploadingDataProps>(
    initialUploadingDataState
  );
  const {data:countries} = useGetCommonCountries()

  const { t } = useTranslation();

  // useGetCountries(setCountries);

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

  useEffect(() => {
    const handleGetCountries = async () => {
      await axios
        .get(
          process.env.NEXT_PUBLIC_COUNTRY_LIST)
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
