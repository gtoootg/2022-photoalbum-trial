import { Container, TextField } from "@mui/material";
import axios from "axios";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect } from "react";
import { useRef, useState } from "react";
import VerticalStepper from "../../components/stepper/Stepper";
import { getFlickrImages } from "../flickrApi";

interface FlickrIDInputFieldProps {
  setFlickrID: (e: string) => void;
}

const FlickrIDInputField = ({ setFlickrID }: FlickrIDInputFieldProps) => {
  return (
    <TextField
      id="outlined-search"
      label="ID of your photo in Flickr"
      type="search"
      style={{ margin: "2rem" }}
      onChange={(e) => {
        e.preventDefault();
        setFlickrID(e.target.value);
      }}
    />
  );
};

export default function Upload() {
  const [flickrImages, setFlickrImages] = useState([]);

  const [uploadingDataImages, setUploadingDataImages] = useState<number[]>([]);
  const [uploadingDataTitle, setUploadingDataTitle] = useState<string>();
  const [uploadingDataDescription, setUploadingDataDescription] =
    useState<string>();

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
