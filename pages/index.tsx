import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState, useRef, useContext } from "react";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getFlickrImages } from "./flickrApi";
import { flickrImagesContext } from "./_app";

const Home: NextPage = () => {
  const [countries, setCountries] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [flickrImages, setFlickrImages] = useContext(flickrImagesContext);

  useEffect(() => {
    async function onGetFlickrImages() {
      setFlickrImages(await getFlickrImages());
    }

    onGetFlickrImages();
  });

  return <></>;
};

export default Home;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
