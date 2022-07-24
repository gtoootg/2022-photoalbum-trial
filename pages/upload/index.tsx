import { Container, TextField } from "@mui/material";
import axios from "axios";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect } from "react";
import { useRef, useState } from "react";
import VerticalStepper from "../../components/stepper/Stepper";
import { getFlickrImages } from "../flickrApi";

export default function Upload() {
  const [flickrImages, setFlickrImages] = useState([]);

  const [uploadingDataImages, setUploadingDataImages] = useState<number[]>([]);
  const [uploadingDataTitle, setUploadingDataTitle] = useState<string>();
  const [uploadingDataDescription, setUploadingDataDescription] =
    useState<string>();
  const [uploadingDataCountry, setUploadingDataCountry] = useState<string>();
  useEffect(() => {
    async function onGetFlickrImages() {
      setFlickrImages(await getFlickrImages());
    }
    onGetFlickrImages();
  }, []);

  return (
    <Container>
      <VerticalStepper
        flickrImages={flickrImages}
        uploadingDataImages={uploadingDataImages}
        setUploadingDataImages={setUploadingDataImages}
        setUploadingDataTitle={setUploadingDataTitle}
        setUploadingDataDescription={setUploadingDataDescription}
        setUploadingDataCountry={setUploadingDataCountry}
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
