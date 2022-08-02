import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState, useRef, useContext } from "react";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getFlickrImages } from "./flickrApi";
import { uploadedPostsContext, flickrImagesContext } from "./_app";
import MediaCard from "../components/media-card/MediaCard";

const Home: NextPage = () => {
  const [countries, setCountries] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [flickrImages, setFlickrImages] = useContext(flickrImagesContext);
  const [uploadedPosts, setUploadedPosts] = useContext(uploadedPostsContext);

  async function onGetFlickrImages() {
    setFlickrImages(await getFlickrImages());
  }

  function fetchUploadedPosts() {
    axios.get("/api/get-uploaded-posts").then((res) => {
      // setUploadedPosts(res.data);
      console.log(res.data);
    });
  }

  useEffect(() => {
    onGetFlickrImages();
    fetchUploadedPosts();
  }, []);

  return (
    <>
      <button
        onClick={() => {
          console.log(uploadedPosts);
        }}
      >
        button
      </button>
    </>
  );
};

export default Home;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
