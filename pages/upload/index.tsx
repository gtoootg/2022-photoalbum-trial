import { Container, TextField } from "@mui/material";
import axios from "axios";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState, useEffect, useContext } from "react";
import VerticalStepper from "../../feature/upload/components/stepper/Stepper";
import { UploadingDataProps } from "../../feature/upload/upload.types";
import UploadBody from "../../feature/upload/UploadBody";
import { getFlickrImages } from "../flickrApi";
import { flickrImagesContext } from "../_app";

export default function Upload() {
  return <UploadBody />;
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "upload"])),
    },
  };
}
